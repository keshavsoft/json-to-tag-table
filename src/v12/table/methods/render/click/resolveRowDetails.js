const resolveRowDetails = ({
    inEvent,
    inData,
    inColumns,
    inTargetHtmlId
} = {}) => {
    const localEvent = inEvent;
    const localData = inData;
    const localColumns = inColumns;
    const localTargetHtmlId = inTargetHtmlId;

    const button = localEvent?.target?.closest?.('button');
    if (!button) return null;

    const row = button.closest('tr');
    if (!row) return null;

    const rowIndex = row.sectionRowIndex;
    const rowData = localData?.[rowIndex];
    if (!rowData) return null;

    const td = button.closest('td');
    const columnKey = localColumns?.[td?.cellIndex]?.key;

    const childData = (columnKey && Array.isArray(rowData[columnKey]))
        ? rowData[columnKey]
        : Object.values(rowData).find(val => Array.isArray(val));

    if (!Array.isArray(childData) || childData.length === 0) return null;

    const targetContainer = (typeof localTargetHtmlId === "string" && localTargetHtmlId)
        ? (button.closest(`#${localTargetHtmlId}`) || document.getElementById(localTargetHtmlId))
        : button.closest('table');

    return {
        rowIndex,
        columnKey,
        childData,
        targetContainer
    };
};

export { resolveRowDetails };
export default resolveRowDetails;
