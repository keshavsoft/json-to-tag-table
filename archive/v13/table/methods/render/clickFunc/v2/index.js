import getContainer from "./getContainer.js";
import createTable from "./createTable.js";

// Main click handler: only 2 clear steps from the outside
const clickFunc = ({
    inEvent,
    inData,
    inColumns,
    inRenderFunc,
    inTargetHtmlId
} = {}) => {
    // 1. Get or prepare child table container
    const childTableContainer = getContainer({ inEvent, inTargetHtmlId, inColumns, inData });
    if (!childTableContainer) return;

    // 2. Create and render child table inside the container
    createTable({ inChildTableContainer: childTableContainer, inRenderFunc });
};

export { clickFunc };
export default clickFunc;
