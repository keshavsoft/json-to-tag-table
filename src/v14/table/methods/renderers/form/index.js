import jsonToSpec from "../../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../../jsonToTag/v2/index.js";

import structureJson from './structure.json' with {type: 'json'};

const startFunc = ({
    targetHtmlId,
    inTargetHtmlId,
    inFields = [],
    inData = {},
    inColumns = [],
    inVariant = "stacked",
    inSkeletonType,
    inShowLog = false
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localVariant = inSkeletonType ?? inVariant;
    const localShowLog = inShowLog;

    try {
        let fieldsArray = [];

        if (Array.isArray(inFields) && inFields.length > 0) {
            fieldsArray = inFields;
        } else if (Array.isArray(inColumns) && inColumns.length > 0) {
            fieldsArray = inColumns.map((col) => ({
                key: col.field ?? col.name ?? col.key,
                label: col.title ?? col.label ?? col.field ?? col.name,
                type: col.type ?? "text",
                value: inData?.[col.field ?? col.name ?? col.key] ?? col.value ?? "",
                readonly: col.readonly ? "true" : "",
                disabled: col.disabled ? "true" : ""
            }));
        } else if (typeof inData === "object" && inData !== null && !Array.isArray(inData)) {
            fieldsArray = Object.entries(inData).map(([key, value]) => ({
                key,
                label: key,
                type: "text",
                value: value ?? "",
                readonly: "",
                disabled: ""
            }));
        }

        const dataAsJson = { fields: fieldsArray };

        const rawStructure = structureJson[localVariant] ?? structureJson.stacked ?? structureJson;
        const targetStructure = structuredClone(rawStructure);

        if (localShowLog) console.log("form targetStructure : ", targetStructure);

        const specAsJsonToDom = jsonToSpec({ specJson: targetStructure, dataJson: dataAsJson, showLog: false });
        if (localShowLog) console.log("form specAsJsonToDom : ", specAsJsonToDom);

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;

        if (!html) return fromRenderer;

        html.append(fromRenderer);
        return fromRenderer;
    } catch (error) {
        console.log("error : ", error);
    }
};

export { startFunc };
export default startFunc;
