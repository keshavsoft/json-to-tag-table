// Step 2: Where does the child table live? (Find or create the container div)
const startFunc = ({ inTargetHtmlId, inChildColumnKey } = {}) => {
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

export default startFunc;
