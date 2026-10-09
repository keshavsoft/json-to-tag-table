import { renderTable } from "json-renderers-build";
import jsonToTag from "@keshavsoft/json-to-tag";

const startFunc = ({
    inTargetHtmlId,
    targetHtmlId,
    inColumns,
    inData
}) => {
    const localTargetHtmlId = inTargetHtmlId || targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;

    const columnTitles = localColumns.map(col => col.label);
    const columnKeys = localColumns.map(col => col.key);

    const rows = localData.map(row => columnKeys.map(key => row[key]));

    const spec = renderTable({
        inColumns: columnTitles,
        inData: rows
    });

    const element = jsonToTag(spec);

    const container = document.getElementById(localTargetHtmlId);
    container.innerHTML = "";
    container.append(element);

    return element;
};

export default startFunc;
