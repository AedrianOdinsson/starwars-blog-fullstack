async function fetchImagesForNames(names) {
    const results = {};
    const chunkSize = 20;
    const chunks = [];

    for (let i = 0; i < names.length; i += chunkSize) {
        chunks.push(names.slice(i, i + chunkSize));
    }

    const chunkPromises = chunks.map(async (chunk) => {
        const titles = chunk.join("|");
        const url = `https://starwars.fandom.com/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=300&titles=${encodeURIComponent(titles)}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            const pages = data.query?.pages || {};

            const nameMap = {};
            (data.query?.normalized || []).forEach((n) => {
                nameMap[n.to] = n.from;
            });
            (data.query?.redirects || []).forEach((r) => {
                const originalFrom = nameMap[r.from] || r.from;
                nameMap[r.to] = originalFrom;
            });

            Object.values(pages).forEach((page) => {
                const originalName = nameMap[page.title] || page.title;
                if (page.thumbnail?.source) {
                    results[originalName] = page.thumbnail.source;
                }
            });
        } catch (err) {
            console.error("Error en lote de Wookieepedia:", err);
        }
    });

    await Promise.all(chunkPromises);
    return results;
}

export default fetchImagesForNames;