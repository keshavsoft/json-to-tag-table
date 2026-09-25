// Step 4: Ready the container for the new child table
const startFunc = ({ inChildTableContainer, inClickedRowDetails } = {}) => {
    inChildTableContainer.style.display = "";
    inChildTableContainer.dataset.activeRow = String(inClickedRowDetails.parentRowIndex);
    inChildTableContainer.dataset.fieldName = inClickedRowDetails.childColumnKey;
    inChildTableContainer.innerHTML = "";
    inChildTableContainer.childData = inClickedRowDetails.childTableData;

    return inChildTableContainer;
};

export default startFunc;
