const getDomElements = ({ inEvent, inTargetHtmlId } = {}) => {
    const localEvent = inEvent;
    const localTargetHtmlId = inTargetHtmlId;

    const localButton = localEvent?.target?.closest?.('button');
    if (!localButton) return null;

    const k1 = localButton.closest(`#${localTargetHtmlId}`);
    console.log("k1 : ", k1);

    const localTable = localButton.closest('table');
    const localRow = localButton.closest('tr');
    if (!localTable || !localRow) return null;

    const localTd = localButton.closest('td');
    const localClosestIdElement = localButton.closest('[id]');
    const localCurrentTarget = localEvent.currentTarget;

    console.log('Hooked element data:', localButton);
    console.log('Closest element with ID:', localClosestIdElement, 'ID:', localClosestIdElement?.id);
    console.log('Current target:', localCurrentTarget, 'ID:', localCurrentTarget?.id);
    console.log('Main table:', localTable);

    return {
        button: localButton,
        table: localTable,
        row: localRow,
        td: localTd,
        closestIdElement: localClosestIdElement,
        currentTarget: localCurrentTarget,
        container: k1
    };
};

const extractChildData = ({ inRowData, inColumns, inTd } = {}) => {
    const localRowData = inRowData;
    const localColumns = inColumns;
    const localTd = inTd;

    if (!localRowData) return null;

    const localCellIndex = localTd?.cellIndex;
    const localColumnKey = localColumns?.[localCellIndex]?.key;

    const localChildData = (localColumnKey && Array.isArray(localRowData?.[localColumnKey]))
        ? localRowData[localColumnKey]
        : Object.values(localRowData).find(val => Array.isArray(val));

    console.log('Resolved childData:', localChildData);

    if (!Array.isArray(localChildData) || localChildData.length === 0) return null;

    return localChildData;
};

const buildContainerId = ({ inClosestIdElement, inCurrentTarget } = {}) => {
    const localClosestIdElement = inClosestIdElement;
    const localCurrentTarget = inCurrentTarget;

    const closestId = localClosestIdElement?.id || localCurrentTarget?.id || 'main-table';
    return `${closestId}-child`;
};

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

    const domElements = getDomElements({ inEvent: localEvent, inTargetHtmlId: localTargetHtmlId });
    if (!domElements) return null;

    const localRowIndex = domElements.row.sectionRowIndex;
    const localRowData = localData?.[localRowIndex];
    if (!localRowData) return null;

    const localChildData = extractChildData({
        inRowData: localRowData,
        inColumns: localColumns,
        inTd: domElements.td
    });
    if (!localChildData) return null;

    const containerId = buildContainerId({
        inClosestIdElement: domElements.closestIdElement,
        inCurrentTarget: domElements.currentTarget
    });

    return {
        table: domElements.table,
        rowIndex: localRowIndex,
        childData: localChildData,
        containerId,
        container: domElements.container
    };
};

export { resolveRowDetails };
export default resolveRowDetails;
