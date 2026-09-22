export const computeCatalogMetrics = ({ inTagsData, inTableTags, inFormTags, inTypoTags }) => {
    const localTagsData = inTagsData ?? {};
    const localTableTags = inTableTags ?? [];
    const localFormTags = inFormTags ?? [];
    const localTypoTags = inTypoTags ?? [];

    const tagKeys = Object.keys(localTagsData);
    const totalTags = tagKeys.length;

    let allowsChildrenCount = 0;
    let allowsTextContentCount = 0;
    let voidLeafCount = 0;
    let tableTagsCount = 0;
    let formTagsCount = 0;
    let typographyTagsCount = 0;

    tagKeys.forEach(tag => {
        const definition = localTagsData[tag] || {};

        if (definition.allowsChildren) {
            allowsChildrenCount += 1;
        } else {
            voidLeafCount += 1;
        }

        if (definition.allowsTextContent) {
            allowsTextContentCount += 1;
        }

        if (localTableTags.includes(tag)) {
            tableTagsCount += 1;
        }

        if (localFormTags.includes(tag)) {
            formTagsCount += 1;
        }

        if (localTypoTags.includes(tag)) {
            typographyTagsCount += 1;
        }
    });

    return {
        totalTags,
        allowsChildrenCount,
        allowsTextContentCount,
        voidLeafCount,
        tableTagsCount,
        formTagsCount,
        typographyTagsCount
    };
};

export default computeCatalogMetrics;
