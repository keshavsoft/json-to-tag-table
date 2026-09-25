import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

// Story 2: Build table structure specification from skeleton and fragments
const startFunc = ({
    inSkeletonType = "default",
    inSkeletonJson = skeletonJson,
    inFragmentsJson = fragmentsJson,
    inShowLog = false
} = {}) => {
    const rawSkeleton = inSkeletonJson[inSkeletonType] ?? inSkeletonJson.default ?? inSkeletonJson;
    const targetSkeleton = structuredClone(rawSkeleton);

    if (inShowLog) console.log("targetSkeleton : ", targetSkeleton);

    const structureJson = skeletonToSpec({
        inSkeleton: targetSkeleton,
        inFragments: inFragmentsJson
    });

    if (inShowLog) console.log("structureJson : ", structureJson);

    return structureJson;
};

export default startFunc;
