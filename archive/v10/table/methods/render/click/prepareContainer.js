const prepareContainer = ({
    inTargetContainer,
    inTargetHtmlId,
    inColumnKey,
    inRowIndex
} = {}) => {
    const localTargetContainer = inTargetContainer;
    const localTargetHtmlId = inTargetHtmlId;
    const localColumnKey = inColumnKey;
    const localRowIndex = inRowIndex;

    if (!localTargetContainer) return null;

    const containerId = `${localTargetHtmlId || 'table'}-${localColumnKey || 'child'}`;

    let childContainer = document.getElementById(containerId);
    if (!childContainer) {
        childContainer = document.createElement('div');
        childContainer.id = containerId;
        childContainer.className = 'child-table-container mt-3';
        localTargetContainer.insertAdjacentElement('afterend', childContainer);
    }

    // Toggle off if clicking the same active row
    if (childContainer.dataset.activeRow === String(localRowIndex) && childContainer.style.display !== "none") {
        childContainer.style.display = "none";
        return null;
    }

    childContainer.style.display = "";
    childContainer.dataset.activeRow = String(localRowIndex);
    childContainer.innerHTML = "";

    return childContainer;
};

export { prepareContainer };
export default prepareContainer;
