import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";
import jsonToSpec from "../../../../../node_modules/json-to-spec/index.js";
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

        const structureJson = skeletonToSpec({
            inSkeleton: skeletonJson,
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


