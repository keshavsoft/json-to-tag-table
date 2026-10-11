import renderFunc from "./renderers/table/index.js";

const createMethods = ({ inTable }) => {
    const localTable = inTable;
    const localColumns = localTable.store.library.activeColumns;
    const localData = localTable.store.library.stateData;

    const localConfig = localTable.store.config;

    const render = ({ inTargetHtmlId, targetHtmlId } = {}) => {
        const localTargetHtmlId = inTargetHtmlId || targetHtmlId || localTable.containerId;

        return renderFunc({
            inTargetHtmlId: localTargetHtmlId,
            inColumns: localColumns,
            inData: localData,
            inConfig: localConfig
        });
    };

    return { render };
};

export { createMethods };