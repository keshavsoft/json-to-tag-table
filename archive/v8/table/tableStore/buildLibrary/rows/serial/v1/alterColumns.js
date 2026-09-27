const alterColumns = ({ inColumns = [], inSerialCol = {} } = {}) => {
    const localColumns = inColumns;
    const localSerialCol = inSerialCol;

    const columnsArray = Array.isArray(localColumns) ? localColumns : [];
    const hasSerialCol = columnsArray.some(col => col.key === "serial");

    if (hasSerialCol) {
        return columnsArray;
    }

    return [localSerialCol, ...columnsArray];
};

export { alterColumns };
export default alterColumns;
