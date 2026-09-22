import renderFunc from "./render/index.js";

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;
    const activeColumns = localTable.store.library.activeColumns;

    const data = localTable.store.library.stateData;

    const colGroup = localTable.store.library.colGroup;

    const render = ({ targetHtmlId, inTargetHtmlId, inSkeletonType } = {}) => {
        const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId ?? localTable?.containerId;
        const localSkeletonType = inSkeletonType;

        renderFunc({
            targetHtmlId: localTargetHtmlId,
            inColumns: activeColumns,
            inData: data,
            inColGroup: colGroup,
            inSkeletonType: localSkeletonType
        });
    };

    return { render };
};

export { createMethods };