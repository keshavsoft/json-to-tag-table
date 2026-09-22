import dispatchSpec from "./index.js";

export const buildSpecArray = ({ inArray = [], inFragments } = {}) => {
    const localArray = inArray;
    const localFragments = inFragments;

    if (!Array.isArray(localArray)) return [];

    return localArray.map(item => dispatchSpec({
        inSpecJson: item,
        inFragments: localFragments
    })).flat().filter(Boolean);
};

export default buildSpecArray;
