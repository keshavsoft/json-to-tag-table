import meta from "./meta.js";

export const registerGlobal = (inFuncDefinition) => {
    if (typeof globalThis === "undefined" || !inFuncDefinition) return;

    globalThis.ks ??= {};

    globalThis.ks.jsonToTagTable = {
        meta,
        Table: inFuncDefinition
    };
};

export default registerGlobal;
