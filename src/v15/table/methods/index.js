import renderFunc from "./renderers/table/index.js";

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;
    const activeColumns = localTable.store.library.activeColumns;

    const data = localTable.store.library.stateData;

    const colGroup = localTable.store.library.colGroup;

    const footerData = localTable.store.library.footerData;

    const config = localTable.store.config;

    const render = ({ targetHtmlId, inTargetHtmlId, inSkeletonType } = {}) => {
        const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId ?? localTable?.containerId;
        const localSkeletonType = inSkeletonType;

        renderFunc({
            targetHtmlId: localTargetHtmlId,
            inColumns: activeColumns,
            inData: data,
            inColGroup: colGroup,
            inFooterData: footerData,
            inConfig: config,
            inSkeletonType: localSkeletonType
        });
    };

    return { render };
};

export { createMethods };