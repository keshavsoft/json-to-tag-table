import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";

// import jsonToSpec from "../../../../../node_modules/json-to-spec/index.js";
// import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import jsonToSpec from "../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../jsonToTag/v1/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

const removeSlot = ({ inNode, inSlotName } = {}) => {
    const localNode = inNode;
    const localSlotName = inSlotName;

    if (!localNode || typeof localNode !== "object") return;

    if (Array.isArray(localNode.slots)) {
        localNode.slots = localNode.slots.filter(slot => slot !== localSlotName);
    }

    if (Array.isArray(localNode.children)) {
        localNode.children.forEach(child => removeSlot({ inNode: child, inSlotName: localSlotName }));
    }
};

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

        const specAsJsonToDom = jsonToSpec({ specJson: structureJson, dataJson: dataAsJson, showLog: false });
        console.log("specAsJsonToDom--- : ", specAsJsonToDom);

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = document.getElementById(localTargetHtmlId);

        html.addEventListener('click', function (event) {
            const localButton = event.target.closest('button');
            const localcurrentTarget = event.currentTarget;
            console.log('Hooked element data:', localButton);
        });

        html.append(fromRenderer);
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;


