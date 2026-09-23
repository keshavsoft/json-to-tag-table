import dispatchSpec from "./index.js";

export const buildSpecArray = ({ inArray = [], inFragments,
    inShowLog = false
} = {}) => {
    const localArray = inArray;
    const localFragments = inFragments;

    if (inShowLog) console.log("buildSpecArray 1 : ", localArray, localFragments);
    if (!Array.isArray(localArray)) return [];

    return localArray.map(item => dispatchSpec({
        inSpecJson: item,
        inFragments: localFragments
    })).flat().filter(Boolean);
};

export default buildSpecArray;
