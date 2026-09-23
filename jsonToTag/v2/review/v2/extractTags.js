export const extractTags = ({ inSpec }) => {
    const localSpec = inSpec;

    if (!localSpec) return [];

    if (Array.isArray(localSpec)) {
        return localSpec.flatMap(item => extractTags({ inSpec: item }));
    }

    if (typeof localSpec !== "object") return [];

    const tags = [];
    if (typeof localSpec.tagName === "string" && localSpec.tagName.trim().length > 0) {
        tags.push(localSpec.tagName.toLowerCase());
    }

    if (Array.isArray(localSpec.children) && localSpec.children.length > 0) {
        localSpec.children.forEach(child => {
            const childTags = extractTags({ inSpec: child });
            tags.push(...childTags);
        });
    }

    return tags;
};

export default extractTags;
