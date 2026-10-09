import meta from "./meta.js";

/**
 * registerGlobal - Registers the public API onto globalThis.ks in browser / SSR environments.
 */
export const registerGlobal = (inArgs) => {
    const localArgs = inArgs;
    const localFuncDefinition = typeof localArgs === "function" ? localArgs : localArgs?.inFuncDefinition;
    const localReviewSpec = localArgs?.inReviewSpec;

    if (typeof globalThis === "undefined" || !localFuncDefinition) return;

    globalThis.ks ??= {};
    globalThis.ks["json-to-tag"] = {
        meta,
        buildSpecElement: localFuncDefinition,
        reviewSpec: localReviewSpec
    };

    globalThis.ks.jsonToTag = {
        meta,
        buildSpecElement: localFuncDefinition,
        reviewSpec: localReviewSpec
    };

};

export default registerGlobal;
