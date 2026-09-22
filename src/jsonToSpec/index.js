import registerGlobal from "./registerGlobal.js";
import buildSpec from "./buildSpec/index.js";

const buildSpecElement = ({ inSkeleton, inFragments, inShowLog = false, skeleton, fragments, showLog } = {}) => {
    const localSkeleton = inSkeleton ?? skeleton;
    const localFragments = inFragments ?? fragments;
    const localShowLog = inShowLog ?? showLog ?? false;

    try {
        const element = buildSpec({
            inSpecJson: localSkeleton,
            inShowLog: localShowLog,
            inFragments: localFragments
        });

        return element;
    } catch (error) {
        console.log("error : ", error);
    };
};

registerGlobal(buildSpecElement);

export default buildSpecElement;

