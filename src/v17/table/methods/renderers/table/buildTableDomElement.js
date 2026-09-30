import jsonToSpec from "../../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../../jsonToTag/v2/index.js";

// Story 3: Generate table DOM element from structure specification and data
const startFunc = ({
    inStructureJson,
    inDataAsJson,
    inShowLog = false
} = {}) => {
    const specAsJsonToDom = jsonToSpec({
        specJson: inStructureJson,
        dataJson: inDataAsJson,
        showLog: inShowLog
    });

    if (inShowLog) console.log("specAsJsonToDom : ", specAsJsonToDom);

    return jsonToTag(specAsJsonToDom);
};

export default startFunc;