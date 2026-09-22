import buildSpecElement from "../../../../skeletonToSpec/v2/index.js";
import compile from "../../../../../node_modules/json-to-spec/index.js";
import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns, inData, inColGroup } = {}) => {
    const localTargetHtmlId = targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;
    const localColGroup = inColGroup;

    try {
        let dataAsJson = {};
        dataAsJson.columns = localColumns;
        dataAsJson.data = localData;
        dataAsJson.colGroup = localColGroup;

        const structureJson = buildSpecElement({
            inSkeleton: skeletonJson,
            inFragments: fragmentsJson
        });

        const specAsJsonToDom = compile({ specJson: structureJson, dataJson: dataAsJson, showLog: true });

        const fromRenderer = jsonToTag({ spec: specAsJsonToDom, targetHtmlId: localTargetHtmlId });

        const html = document.getElementById(localTargetHtmlId);

        html.append(fromRenderer);
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;


