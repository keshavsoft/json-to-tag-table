export const filterTagsCatalog = ({
    inTagsData,
    inSearchQuery,
    inActiveFilter,
    inTableTags,
    inFormTags,
    inTypoTags
}) => {
    const localTagsData = inTagsData ?? {};
    const localSearchQuery = (inSearchQuery ?? "").trim().toLowerCase();
    const localActiveFilter = inActiveFilter ?? "all";
    const localTableTags = inTableTags ?? [];
    const localFormTags = inFormTags ?? [];
    const localTypoTags = inTypoTags ?? [];

    const tagKeys = Object.keys(localTagsData);

    return tagKeys.filter(tag => {
        const definition = localTagsData[tag] || {};

        // 1. Search Query Match
        if (localSearchQuery) {
            const matchesName = tag.toLowerCase().includes(localSearchQuery);
            const allowedAttrs = definition.allowedAttributes || [];
            const matchesAttribute = allowedAttrs.some(attr => attr.toLowerCase().includes(localSearchQuery));

            if (!matchesName && !matchesAttribute) {
                return false;
            }
        }

        // 2. Category / Capability Filter
        if (localActiveFilter === "children" && !definition.allowsChildren) return false;
        if (localActiveFilter === "leaf" && definition.allowsChildren) return false;
        if (localActiveFilter === "text" && !definition.allowsTextContent) return false;
        if (localActiveFilter === "table" && !localTableTags.includes(tag)) return false;
        if (localActiveFilter === "form" && !localFormTags.includes(tag)) return false;
        if (localActiveFilter === "typography" && !localTypoTags.includes(tag)) return false;

        return true;
    });
};

export default filterTagsCatalog;
