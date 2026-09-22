import renderFunc from "./render/index.js";

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;
    const activeColumns = localTable.store.library.activeColumns;

    const data = localTable.store.library.stateData;

    const colGroup = localTable.store.library.colGroup;

    const render = ({ targetHtmlId, inSkeletonType } = {}) => {
        renderFunc({
            targetHtmlId, inColumns: activeColumns,
            inData: data,
            inColGroup: colGroup,
            inSkeletonType
        });
    };

    return { render };
};

export { createMethods };