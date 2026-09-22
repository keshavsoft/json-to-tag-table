export const fetchTagsCatalog = async ({ inUrl }) => {
    const localUrl = inUrl ?? "./tags.json";

    const response = await fetch(`${localUrl}?timestamp=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to load tags catalog from ${localUrl}: HTTP ${response.status}`);
    }

    const rawData = await response.json();
    const cleanTagsData = {};

    for (const [tagKey, tagDefinition] of Object.entries(rawData)) {
        if (tagKey !== "$schema") {
            cleanTagsData[tagKey] = tagDefinition;
        }
    }

    return {
        tagsData: cleanTagsData,
        rawJsonString: JSON.stringify(rawData, null, 2)
    };
};

export default fetchTagsCatalog;
