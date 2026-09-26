import extractClickedRowDetails from "./extractClickedRowDetails.js";
import getOrCreateChildTableContainer from "./getOrCreateChildTableContainer.js";
import isSameRowClickedToToggleOff from "./isSameRowClickedToToggleOff.js";
import resetAndShowChildTableContainer from "./resetAndShowChildTableContainer.js";

// --- Story of getContainer ---
const startFunc = ({ inEvent, inTargetHtmlId, inColumns, inData } = {}) => {
    // Story 1: Who was clicked? (Resolve parent row and child table data)
    const clickedRowDetails = extractClickedRowDetails({
        inEvent,
        inColumns,
        inData
    });
    if (!clickedRowDetails) return null;

    // Story 2: Where does the child table container go?
    const childTableContainer = getOrCreateChildTableContainer({
        inTargetHtmlId,
        inChildColumnKey: clickedRowDetails.childColumnKey
    });
    if (!childTableContainer) return null;

    // Story 3: Same row clicked again? Close it.
    if (isSameRowClickedToToggleOff({
        inChildTableContainer: childTableContainer,
        inParentRowIndex: clickedRowDetails.parentRowIndex
    })) {
        return null;
    }

    // Story 4: Clean and activate container for rendering
    return resetAndShowChildTableContainer({
        inChildTableContainer: childTableContainer,
        inClickedRowDetails: clickedRowDetails
    });
};

export { startFunc };
export default startFunc;
