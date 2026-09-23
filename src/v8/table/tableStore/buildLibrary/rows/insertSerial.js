const insertSerial = ({ inColumns = [], inData = [], inConfig = {},
    inColGroup } = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localConfig = inConfig;
    const localColGroup = inColGroup;
    // console.log("aaaaaaaa : ", localConfig.serial);

    if (!localConfig?.serial) {
        return {
            columns: localColumns,
            data: localData,
            isSerialEnabled: false,
            colGroup: localColGroup
        };
    };

    const serialStyle = typeof localConfig?.serial === "object" && localConfig.serial.style
        ? localConfig.serial.style
        : `width: 50px;`;

    const serialCol = {
        key: "serial",
        label: "#",
        width: "50px",
        style: serialStyle
    };

    const hasSerialCol = (Array.isArray(localColumns) ? localColumns : []).some(col => col.key === "serial");
    const updatedColumns = hasSerialCol
        ? localColumns
        : [serialCol, ...(Array.isArray(localColumns) ? localColumns : [])];

    const updatedColGroup = hasSerialCol
        ? localColGroup
        : [serialCol, ...(Array.isArray(localColGroup) ? localColGroup : [])];

    const updatedData = (Array.isArray(localData) ? localData : []).map((row, index) => ({
        serial: index + 1,
        ...(row || {})
    }));

    return {
        columns: updatedColumns,
        data: updatedData,
        isSerialEnabled: true,
        colGroup: updatedColGroup
    };
};

export default insertSerial;
