import deriveColumnsFromData from "../../../../../common/deriveColumnsFromData.js";

// Step 1: Find or prepare the container
const getContainer = ({ inEvent, inTargetHtmlId, inColumns, inData } = {}) => {
    const button = inEvent.target.closest("button");
    if (!button) return null;

    const row = button.closest("tr");
    const td = button.closest("td");
    if (!row || !td) return null;

    const rowIndex = row.sectionRowIndex;
    const columnKey = inColumns[td.cellIndex]?.key;
    const childData = inData[rowIndex]?.[columnKey];
    if (!Array.isArray(childData) || childData.length === 0) return null;

    const targetElement = (typeof inTargetHtmlId === "string")
        ? document.getElementById(inTargetHtmlId)
        : inTargetHtmlId;
    if (!targetElement) return null;

    const containerId = `${targetElement.id || "table"}-${columnKey}`;
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className = "child-table-container mt-3";
        targetElement.insertAdjacentElement("afterend", container);
    }

    // Toggle off if clicking the same active row
    if (container.dataset.activeRow === String(rowIndex) && container.style.display !== "none") {
        container.style.display = "none";
        return null;
    }

    container.style.display = "";
    container.dataset.activeRow = String(rowIndex);
    container.dataset.fieldName = columnKey;
    container.innerHTML = "";
    container.childData = childData;

    return container;
};

// Step 2: Create the child table inside the container
const createTable = ({ inContainer, inRenderFunc } = {}) => {
    const childData = inContainer.childData;

    inRenderFunc({
        inTargetHtmlId: inContainer,
        inColumns: deriveColumnsFromData({ inData: childData }),
        inData: childData,
        inSkeletonType: "tableOnly"
    });
};

// Main click handler: only 2 clear steps from the outside
const clickFunc = ({
    inEvent,
    inData,
    inColumns,
    inRenderFunc,
    inTargetHtmlId
} = {}) => {
    const container = getContainer({ inEvent, inTargetHtmlId, inColumns, inData });
    if (!container) return;

    createTable({ inContainer: container, inRenderFunc });
};

export { clickFunc };
export default clickFunc;
