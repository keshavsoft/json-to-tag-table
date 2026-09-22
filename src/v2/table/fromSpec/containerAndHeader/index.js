import compile from "../../../../../node_modules/json-to-spec/index.js";
import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import structureJson from '../structure.json' with {type: 'json'};

const startFunc = ({ targetHtmlId, inColumns, inData, inColGroup } = {}) => {
    try {
        let dataAsJson = {};
        dataAsJson.columns = inColumns;
        dataAsJson.data = inData;
        dataAsJson.colGroup = inColGroup;

        const neededSpec = structureJson.children[0].children[0];
        console.log("neededSpec: ", neededSpec);

        const specAsJsonToDom = compile({ specJson: neededSpec, dataJson: dataAsJson, showLog: true });

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = document.getElementById(targetHtmlId)

        html.append(fromRenderer)
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;

