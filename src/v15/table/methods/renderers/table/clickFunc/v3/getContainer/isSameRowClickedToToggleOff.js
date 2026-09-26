// Step 3: Did user click the same row again? Close it (toggle)
const startFunc = ({ inChildTableContainer, inParentRowIndex } = {}) => {
    const isMatchingActiveRow = inChildTableContainer.dataset.activeRow === String(inParentRowIndex);
    const isCurrentlyVisible = inChildTableContainer.style.display !== "none";

    if (isMatchingActiveRow && isCurrentlyVisible) {
        inChildTableContainer.style.display = "none";
        return true;
    }

    return false;
};

export default startFunc;
