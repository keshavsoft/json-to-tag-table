import renderTable from "./table/index.js";

const render = ({
    inTargetHtmlId,
    targetHtmlId,
    inColumns,
    inData
}) => {
    const localTargetHtmlId = inTargetHtmlId || targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;

    return renderTable({
        inTargetHtmlId: localTargetHtmlId,
        inColumns: localColumns,
        inData: localData
    });
};

export { render, renderTable };
export default render;
