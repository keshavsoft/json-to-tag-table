const deriveColumnsFromData = ({ inData = [] } = {}) => {
    const localData = inData;

    if (!Array.isArray(localData) || localData.length === 0) {
        return [];
    }

    const firstRow = localData[0];
    if (!firstRow || typeof firstRow !== "object") {
        return [];
    }

    return Object.keys(firstRow).map(key => ({
        key,
        label: key
    }));
};

export { deriveColumnsFromData };
export default deriveColumnsFromData;
