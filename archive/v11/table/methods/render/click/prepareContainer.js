const getContainerId = ({ inTargetHtmlId, inColumnKey } = {}) => {
    const localTargetHtmlId = inTargetHtmlId || 'table';
    const localColumnKey = inColumnKey || 'child';

    return `${localTargetHtmlId}-${localColumnKey}`;
};

const createContainer = ({ inContainerId, inTargetContainer } = {}) => {
    const localContainerId = inContainerId;
    const localTargetContainer = inTargetContainer;

    const childContainer = document.createElement('div');
    childContainer.id = localContainerId;
    childContainer.className = 'child-table-container mt-3';
    localTargetContainer.insertAdjacentElement('afterend', childContainer);

    return childContainer;
};

const getOrCreateContainer = ({ inContainerId, inTargetContainer } = {}) => {
    const localContainerId = inContainerId;
    const localTargetContainer = inTargetContainer;

    const existingContainer = document.getElementById(localContainerId);
    if (existingContainer) return existingContainer;

    return createContainer({
        inContainerId: localContainerId,
        inTargetContainer: localTargetContainer
    });
};

const isSameActiveRow = ({ inContainer, inRowIndex } = {}) => {
    const localContainer = inContainer;
    const localRowIndex = inRowIndex;

    return localContainer.dataset.activeRow === String(localRowIndex) && localContainer.style.display !== "none";
};

const resetContainer = ({ inContainer, inRowIndex, inColumnKey } = {}) => {
    const localContainer = inContainer;
    const localRowIndex = inRowIndex;
    const localColumnKey = inColumnKey;

    localContainer.style.display = "";
    localContainer.dataset.activeRow = String(localRowIndex);
    localContainer.dataset.fieldName = localColumnKey;
    localContainer.innerHTML = "";
};

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

    const containerId = getContainerId({
        inTargetHtmlId: localTargetHtmlId,
        inColumnKey: localColumnKey
    });

    const childContainer = getOrCreateContainer({
        inContainerId: containerId,
        inTargetContainer: localTargetContainer
    });

    if (isSameActiveRow({ inContainer: childContainer, inRowIndex: localRowIndex })) {
        childContainer.style.display = "none";
        return null;
    }

    resetContainer({
        inContainer: childContainer,
        inRowIndex: localRowIndex,
        inColumnKey: localColumnKey
    });

    return childContainer;
};

export { prepareContainer };
export default prepareContainer;
