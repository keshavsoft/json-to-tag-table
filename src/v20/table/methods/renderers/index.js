import renderTable from "./table/index.js";

const render = ({
    inTargetHtmlId,
    targetHtmlId,
    inColumns,
    inData,
    inConfig,
    config
}) => {
    const localTargetHtmlId = inTargetHtmlId || targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;
    const localConfig = inConfig || config;

    return renderTable({
        inTargetHtmlId: localTargetHtmlId,
        inColumns: localColumns,
        inData: localData,
        inConfig: localConfig
    });
};

export { render, renderTable };
export default render;
