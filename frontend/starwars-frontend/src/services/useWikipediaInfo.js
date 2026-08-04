import { useState, useEffect } from "react";

function stripHtml(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
}

function cleanWikiField(raw) {
    let text = raw;

    let previous;
    do {
        previous = text;
        text = text.replace(/\{\{[^{}]*\}\}/g, "");
    } while (text !== previous);

    text = text
        .replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/''+/g, "")
        .replace(/^\*+/gm, "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");

    return text.trim() || null;
}

function extractField(wikitext, fieldNames) {
    for (const field of fieldNames) {
        const regex = new RegExp(
            `\\|\\s*${field}\\s*=([\\s\\S]*?)(?=\\n\\s*\\|\\w+\\s*=|\\n\\}\\})`,
            "i"
        );
        const match = wikitext.match(regex);
        if (match) {
            const cleaned = cleanWikiField(match[1]);
            if (cleaned) return cleaned;
        }
    }
    return null;
}

export function useWikipediaInfo(name) {
    const [info, setInfo] = useState({
        imageUrl: null,
        extract: null,
        infobox: {},
    });

    useEffect(() => {
        if (!name) return;
        let isMounted = true;

        const searchUrl = `https://starwars.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(
            name
        )}&format=json&origin=*`;

        fetch(searchUrl)
            .then((res) => res.json())
            .then((searchData) => {
                const firstResult = searchData?.query?.search?.[0];
                if (!firstResult) return null;

                const snippet = stripHtml(firstResult.snippet || "");
                const title = firstResult.title;

                const imagePromise = fetch(
                    `https://starwars.fandom.com/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=500&titles=${encodeURIComponent(title)}`
                ).then((res) => res.json());

                const wikitextPromise = fetch(
                    `https://starwars.fandom.com/api.php?action=parse&format=json&origin=*&prop=wikitext&section=0&page=${encodeURIComponent(title)}`
                ).then((res) => res.json());

                return Promise.all([imagePromise, wikitextPromise]).then(
                    ([imageData, wikitextData]) => ({ imageData, wikitextData, snippet })
                );
            })
            .then((result) => {
                if (!isMounted || !result) return;
                const { imageData, wikitextData, snippet } = result;

                const pages = imageData.query?.pages || {};
                const page = Object.values(pages)[0];
                const wikitext = wikitextData?.parse?.wikitext?.["*"] || "";

                const infobox = {
                    species: extractField(wikitext, ["species"]),
                    homeworld: extractField(wikitext, ["homeworld"]),
                    affiliation: extractField(wikitext, ["affiliation", "affiliations"]),
                    masters: extractField(wikitext, ["masters", "master"]),
                    apprentices: extractField(wikitext, ["apprentices", "apprentice"]),
                    vehicles: extractField(wikitext, ["vehicles", "vehicle"]),
                    weapons: extractField(wikitext, ["weapons", "weapon"]),
                };

                console.log("DEBUG wikitext:", wikitext.substring(0, 500));
                console.log("DEBUG infobox extraído:", infobox);

                setInfo({
                    imageUrl: page?.thumbnail?.source || null,
                    extract: snippet || null,
                    infobox,
                });
            })
            .catch((err) => {
                console.error("Error en useWikipediaInfo:", err);
            });

        return () => {
            isMounted = false;
        };
    }, [name]);

    return info;
}