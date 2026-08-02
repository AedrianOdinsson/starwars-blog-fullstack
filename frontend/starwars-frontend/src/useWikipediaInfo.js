import { useState, useEffect } from "react";

function stripHtml(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export function useWikipediaInfo(name) {
    const [info, setInfo] = useState({ imageUrl: null, extract: null });

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
                if (!firstResult) {
                    console.warn("Sin resultados de búsqueda para:", name);
                    return null;
                }

                const snippet = stripHtml(firstResult.snippet || "");
                console.log("DEBUG snippet crudo:", snippet);

                return fetch(
                    `https://starwars.fandom.com/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=400&titles=${encodeURIComponent(firstResult.title)}`
                )
                    .then((res) => res.json())
                    .then((data) => ({ data, snippet }));
            })
            .then((result) => {
                if (!isMounted || !result) return;
                const { data, snippet } = result;
                const pages = data.query?.pages || {};
                const page = Object.values(pages)[0];

                setInfo({
                    imageUrl: page?.thumbnail?.source || null,
                    extract: snippet || null,
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