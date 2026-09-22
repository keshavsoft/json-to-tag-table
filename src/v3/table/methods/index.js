import containerAndHeader from "../fromSpec/containerAndHeader/index.js";
import containerHeaderAndData from "../fromSpec/containerHeaderAndData/index.js";

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;
    const activeColumns = localTable.store.library.activeColumns;

    const data = localTable.store.library.stateData;

    const colGroup = localTable.store.library.colGroup;

    const localContainerAndHeader = ({ targetHtmlId } = {}) => {
        containerAndHeader({
            targetHtmlId, inColumns: activeColumns,
            inData: data,
            inColGroup: colGroup
        });
    };

    const localContainerHeaderAndData = ({ targetHtmlId } = {}) => {
        containerHeaderAndData({
            targetHtmlId, inColumns: activeColumns,
            inData: data,
            inColGroup: colGroup
        });
    };

    return {
        renderContainerAndHeader: localContainerAndHeader,
        renderContainerHeaderAndData: localContainerHeaderAndData
    };
};

export { createMethods };