import { tableFromData } from "json-transformer-funcs";
import jsonToTag from "@keshavsoft/json-to-tag";

import spec from "./spec.json" with { type: "json" };
import table from "./table.json" with { type: "json" };

const startFunc = ({
    inTargetHtmlId,
    targetHtmlId,
    inColumns = [],
    inData = []
}) => {
    const localTargetHtmlId = inTargetHtmlId || targetHtmlId;

    const tableSpec = tableFromData({
        inData: {
            columns: inColumns,
            rows: inData
        },
        inSpec: spec,
        inTable: table
    });

    const element = jsonToTag(tableSpec);

    if (localTargetHtmlId && typeof document !== "undefined") {
        const container = document.getElementById(localTargetHtmlId);
        if (container) {
            container.innerHTML = "";
            container.append(element);
        };
    };

    return element;
};

export default startFunc;
