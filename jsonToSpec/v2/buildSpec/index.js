import {
    isNullOrUndefined,
    isDomNode,
    isSpecArray
} from "./guards.js";

import buildSpecArray from "./buildSpecArray.js";
import buildSingleElement from "./buildSingleElement/v5/index.js";
import jsonToSpecFunc from "./jsonToSpecFunc.js";

const dispatchSpec = ({
    inSpecJson,
    inShowLog = false,
    inDataJson,
    inRowIndex
} = {}) => {
    // debugger
    // console.log("inDataJson 1 : ", inDataJson, inRowIndex);
    // if (inShowLog) console.log("dispatchSpec 1 : ", inSpecJson);
    if (isNullOrUndefined({ inSpec: inSpecJson })) {
        return null;
    };

    if (isDomNode({ inSpec: inSpecJson })) {
        return inSpecJson;
    };

    if (inShowLog) console.log("dispatchSpec 3 : ", inSpecJson, inDataJson);

    if (isSpecArray({ inSpecJson })) {
        return buildSpecArray({
            inArray: inSpecJson,
            inShowLog,
            inDataJson
        });
    };

    if ("jsonToSpec" in inSpecJson) {
        return jsonToSpecFunc({
            inSpecJson,
            inShowLog, inRowIndex,
            inDataJson, inRowIndex
        });
    };

    const toReturnObject = buildSingleElement({
        inSpecJson,
        inShowLog, inRowIndex,
        inData: inDataJson
    });
    // console.log("toReturnObject : ", inSpecJson, toReturnObject);

    return toReturnObject;
};

export default dispatchSpec;