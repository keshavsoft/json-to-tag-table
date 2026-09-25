import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";

// import jsonToSpec from "../../../../../node_modules/json-to-spec/index.js";
// import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import jsonToSpec from "../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../jsonToTag/v2/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};
import clickFunc from "./clickFunc/v2/index.js";

const startFunc = ({
    targetHtmlId,
    inTargetHtmlId,
    inColumns,
    inData,
    inColGroup,
    inFooterData = [],
    inConfig = {},
    inSkeletonType = "default",
    inShowLog = false
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;
    const localColGroup = inColGroup;
    const localFooterData = inFooterData;
    const localConfig = inConfig;
    const localSkeletonType = inSkeletonType;

    try {
        let dataAsJson = {};
        dataAsJson.columns = localColumns;
        dataAsJson.data = localData;
        dataAsJson.colGroup = localColGroup;
        dataAsJson.foot = localFooterData;
        dataAsJson.title = localConfig?.title ?? localConfig?.caption?.text ?? "";
        dataAsJson.footerText = localConfig?.footerText ?? "";

        const rawSkeleton = skeletonJson[localSkeletonType] ?? skeletonJson.default ?? skeletonJson;
        const targetSkeleton = structuredClone(rawSkeleton);

        if (inShowLog) console.log("targetSkeleton : ", targetSkeleton);

        const structureJson = skeletonToSpec({
            inSkeleton: targetSkeleton,
            inFragments: fragmentsJson
        });
        if (inShowLog) console.log("structureJson : ", structureJson);
        const specAsJsonToDom = jsonToSpec({ specJson: structureJson, dataJson: dataAsJson, showLog: false });
        if (inShowLog) console.log("specAsJsonToDom : ", specAsJsonToDom);

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;

        if (!html) return;

        html.addEventListener('click', (event) => {
            clickFunc({
                inEvent: event,
                inData: localData,
                inColumns: localColumns,
                inRenderFunc: startFunc,
                inTargetHtmlId: localTargetHtmlId
            });
        });

        html.append(fromRenderer);
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;


