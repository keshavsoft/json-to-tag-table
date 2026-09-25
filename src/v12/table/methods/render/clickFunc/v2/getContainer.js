// Step 1: Who clicked what? (Resolve parent row, column key, and child table data)
const extractClickedRowDetails = ({ inEvent, inColumns, inData } = {}) => {
    const clickedButton = inEvent?.target?.closest("button");
    if (!clickedButton) return null;

    const parentRow = clickedButton.closest("tr");
    const parentCell = clickedButton.closest("td");
    if (!parentRow || !parentCell) return null;

    const parentRowIndex = parentRow.sectionRowIndex;
    const childColumnKey = inColumns?.[parentCell.cellIndex]?.key;
    const childTableData = inData?.[parentRowIndex]?.[childColumnKey];

    if (!Array.isArray(childTableData) || childTableData.length === 0) return null;

    return {
        parentRowIndex,
        childColumnKey,
        childTableData
    };
};

// Step 2: Where does the child table live? (Find or create the container div)
const getOrCreateChildTableContainer = ({ inTargetHtmlId, inChildColumnKey } = {}) => {
    const targetTableElement = (typeof inTargetHtmlId === "string")
        ? document.getElementById(inTargetHtmlId)
        : inTargetHtmlId;
    if (!targetTableElement) return null;

    const childContainerHtmlId = `${targetTableElement.id || "table"}-${inChildColumnKey}`;
    let childTableContainer = document.getElementById(childContainerHtmlId);

    if (!childTableContainer) {
        childTableContainer = document.createElement("div");
        childTableContainer.id = childContainerHtmlId;
        childTableContainer.className = "child-table-container mt-3";
        targetTableElement.insertAdjacentElement("afterend", childTableContainer);
    }

    return childTableContainer;
};

// Step 3: Did user click the same row again? Close it (toggle)
const isSameRowClickedToToggleOff = ({ inChildTableContainer, inParentRowIndex } = {}) => {
    const isMatchingActiveRow = inChildTableContainer.dataset.activeRow === String(inParentRowIndex);
    const isCurrentlyVisible = inChildTableContainer.style.display !== "none";

    if (isMatchingActiveRow && isCurrentlyVisible) {
        inChildTableContainer.style.display = "none";
        return true;
    }

    return false;
};

// Step 4: Ready the container for the new child table
const resetAndShowChildTableContainer = ({ inChildTableContainer, inClickedRowDetails } = {}) => {
    inChildTableContainer.style.display = "";
    inChildTableContainer.dataset.activeRow = String(inClickedRowDetails.parentRowIndex);
    inChildTableContainer.dataset.fieldName = inClickedRowDetails.childColumnKey;
    inChildTableContainer.innerHTML = "";
    inChildTableContainer.childData = inClickedRowDetails.childTableData;

    return inChildTableContainer;
};

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
