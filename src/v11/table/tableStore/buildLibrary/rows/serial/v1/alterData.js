const alterData = ({ inData = [] } = {}) => {
    const localData = inData;

    const dataArray = Array.isArray(localData) ? localData : [];

    return dataArray.map((row, index) => ({
        serial: index + 1,
        ...(row || {})
    }));
};

export { alterData };
export default alterData;
