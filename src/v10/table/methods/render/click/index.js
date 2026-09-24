import resolveRowDetails from "./resolveRowDetails.js";
import prepareContainer from "./prepareContainer.js";
import renderChildTable from "./renderChildTable.js";

const clickFunc = ({
    inEvent,
    inData,
    inColumns,
    inRenderFunc,
    inTargetHtmlId
} = {}) => {
    const localEvent = inEvent;
    const localData = inData;
    const localColumns = inColumns;
    const localRenderFunc = inRenderFunc;
    const localTargetHtmlId = inTargetHtmlId;

    // Chapter 1: Resolve Clicked Row Details
    const rowDetails = resolveRowDetails({
        inEvent: localEvent,
        inData: localData,
        inColumns: localColumns,
        inTargetHtmlId: localTargetHtmlId
    });

    if (!rowDetails) return;

    // Chapter 2: Prepare / Toggle Sibling Container
    const container = prepareContainer({
        inTable: rowDetails.table,
        inRowIndex: rowDetails.rowIndex,
        inContainerId: rowDetails.containerId,
        inContainer: rowDetails.container
    });

    if (!container) return;

    // Chapter 3: Render Child Table
    renderChildTable({
        inContainer: container,
        inChildData: rowDetails.childData,
        inRenderFunc: localRenderFunc
    });
};

export { clickFunc };
export default clickFunc;
