export const checkTags = ({ inTagsFound, inAllowedTags }) => {
    const localTagsFound = inTagsFound ?? [];
    const localAllowedTags = inAllowedTags ?? {};

    const allowedSet = new Set(
        Object.keys(localAllowedTags)
            .filter(key => key !== "$schema")
            .map(tag => tag.toLowerCase())
    );

    const tagCounts = {};
    const recognizedTags = [];
    const unrecognizedTags = [];

    localTagsFound.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;

        if (allowedSet.has(tag)) {
            if (!recognizedTags.includes(tag)) {
                recognizedTags.push(tag);
            }
        } else {
            if (!unrecognizedTags.includes(tag)) {
                unrecognizedTags.push(tag);
            }
        }
    });

    const totalTags = localTagsFound.length;
    const areAllTagsPresent = unrecognizedTags.length === 0;

    return {
        totalTags,
        tagCounts,
        uniqueTags: Object.keys(tagCounts),
        recognizedTags,
        unrecognizedTags,
        areAllTagsPresent
    };
};

export default checkTags;
