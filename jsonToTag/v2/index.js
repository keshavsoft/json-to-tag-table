import registerGlobal from "./registerGlobal.js";
import buildSpec from "./buildSpec/index.js";
import reviewSpec from "./review/index.js";
import meta from "./meta.js";

export const buildSpecElement = (inSpec, inShowLog = false) => {
    try {
        const localSpec = inSpec;

        if (inShowLog) console.log("original spec : ", inSpec);

        const element = buildSpec({
            inSpec: localSpec
        });

        return element;
    } catch (error) {
        console.error("error : ", error);
        throw error;
    }
};

export const specToDom = buildSpecElement;
export { meta, buildSpec, reviewSpec };

registerGlobal({
    inFuncDefinition: buildSpecElement,
    inReviewSpec: reviewSpec
});

export default buildSpecElement;