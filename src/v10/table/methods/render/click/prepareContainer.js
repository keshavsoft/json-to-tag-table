const prepareContainer = ({
    inTable,
    inRowIndex,
    inContainerId,
    inContainer
} = {}) => {
    const localTable = inTable;
    const localRowIndex = inRowIndex;
    const localContainerId = inContainerId;
    const localContainer = inContainer;

    if (!localTable) return null;

    // Find or create sibling container right next to the main table
    let siblingContainer;
    if (!siblingContainer || !siblingContainer.classList.contains('child-table-container')) {
        siblingContainer = document.createElement('div');
        siblingContainer.className = 'child-table-container mt-3';
        siblingContainer.id = localContainerId || 'main-table-child';
        localContainer.insertAdjacentElement('afterend', siblingContainer);

        // localTable.after(siblingContainer);
    }

    // Toggle off if clicking the same active row
    if (siblingContainer.dataset.activeRow === String(localRowIndex) && siblingContainer.style.display !== "none") {
        siblingContainer.style.display = "none";
        return null;
    }

    siblingContainer.style.display = "";
    siblingContainer.dataset.activeRow = String(localRowIndex);
    siblingContainer.innerHTML = "";

    return siblingContainer;
};

export { prepareContainer };
export default prepareContainer;
