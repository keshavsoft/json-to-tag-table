import dispatchSpec from "./index.js";

export const buildSpecArray = ({ inArray = [], inShowLog = false, inDataJson, inFragments }) => {
    const localArray = inArray;
    const localShowLog = inShowLog;
    const localFragments = inFragments ?? inDataJson;

    if (!Array.isArray(localArray)) return [];

    return localArray.map(item => dispatchSpec({
        inSpecJson: item,
        inShowLog: localShowLog,
        inFragments: localFragments
    })).flat().filter(Boolean);
};

export default buildSpecArray;
