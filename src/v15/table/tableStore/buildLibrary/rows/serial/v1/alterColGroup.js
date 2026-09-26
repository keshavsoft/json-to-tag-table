const alterColGroup = ({ inColGroup = [], inSerialCol = {} } = {}) => {
    const localColGroup = inColGroup;
    const localSerialCol = inSerialCol;

    const colGroupArray = Array.isArray(localColGroup) ? localColGroup : [];
    const hasSerialCol = colGroupArray.some(col => col.key === "serial");

    if (hasSerialCol) {
        return colGroupArray;
    }

    return [localSerialCol, ...colGroupArray];
};

export { alterColGroup };
export default alterColGroup;
