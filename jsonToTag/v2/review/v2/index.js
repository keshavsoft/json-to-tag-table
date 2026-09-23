import defaultTags from "../../../../docs/tags/tags.json" with { type: "json" };
import extractTags from "./extractTags.js";
import checkTags from "./checkTags.js";

/**
 * reviewSpec (v1) - Reviews the supplied JSON specification.
 * Analyzes total tags, occurrence counts, and checks presence against tags.json.
 * 
 * @param {Object} inArgs
 * @param {Object|Array} inArgs.inSpec - The JSON specification to review
 * @param {Object} [inArgs.inTags] - Allowed tags catalog (defaults to tags.json)
 * @returns {Object} { areAllTagsPresent, totalTags, tagCounts, uniqueTags, recognizedTags, unrecognizedTags }
 */
export const reviewSpec = ({ inSpec, inTags = defaultTags } = {}) => {
    const localSpec = inSpec;
    const localTags = inTags;

    const tagsFound = extractTags({ inSpec: localSpec });
    const tagAnalysis = checkTags({
        inTagsFound: tagsFound,
        inAllowedTags: localTags
    });

    return {
        areAllTagsPresent: tagAnalysis.areAllTagsPresent,
        totalTags: tagAnalysis.totalTags,
        tagCounts: tagAnalysis.tagCounts,
        uniqueTags: tagAnalysis.uniqueTags,
        recognizedTags: tagAnalysis.recognizedTags,
        unrecognizedTags: tagAnalysis.unrecognizedTags
    };
};

export default reviewSpec;
