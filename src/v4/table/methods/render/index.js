import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";
import jsonToSpec from "../../../../../node_modules/json-to-spec/index.js";
import jsonToTag from "@keshavsoft/json-to-tag";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns, inData, inColGroup, inSkeletonType = "default" } = {}) => {
    const localTargetHtmlId = targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;
    const localColGroup = inColGroup;
    const localSkeletonType = inSkeletonType;

    try {
        let dataAsJson = {};
        dataAsJson.columns = localColumns;
        dataAsJson.data = localData;
        dataAsJson.colGroup = localColGroup;

        const targetSkeleton = skeletonJson[localSkeletonType] ?? skeletonJson.default ?? skeletonJson;

        const structureJson = skeletonToSpec({
            inSkeleton: targetSkeleton,
            inFragments: fragmentsJson
        });

        const specAsJsonToDom = jsonToSpec({ specJson: structureJson, dataJson: dataAsJson, showLog: true });

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = document.getElementById(localTargetHtmlId);

        html.append(fromRenderer);
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;


