import buildSpec from "./buildSpec/index.js";

const buildSpecElement = ({ inSkeleton, inFragments } = {}) => {
    const localSkeleton = inSkeleton;
    const localFragments = inFragments;

    try {
        return buildSpec({
            inSpecJson: localSkeleton,
            inFragments: localFragments
        });
    } catch (error) {
        console.log("error : ", error);
    };
};

export default buildSpecElement;
