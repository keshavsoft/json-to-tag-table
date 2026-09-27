const insertSerial = ({ inColumns = [], inData = [], inConfig = {},
    inLabel, inColGroup } = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localConfig = inConfig;
    const localLabel = inLabel;
    const localColGroup = inColGroup;

    const isSerialEnabled = Boolean(
        localConfig?.serial ||
        localConfig?.table?.serial ||
        localConfig?.head?.serial
    );

    if (!isSerialEnabled) {
        return {
            columns: localColumns,
            data: localData,
            isSerialEnabled: false,
            colGroup: localColGroup
        };
    };

    const resolvedLabel = localLabel || (
        typeof localConfig?.serial === "object"
            ? (localConfig.serial.label || "#")
            : "#"
    );

    const serialWidth = typeof localConfig?.serial === "object" && localConfig.serial.width
        ? localConfig.serial.width
        : "50px";

    const serialStyle = typeof localConfig?.serial === "object" && localConfig.serial.style
        ? localConfig.serial.style
        : `width: ${serialWidth};`;

    const serialCol = {
        key: "serial",
        label: resolvedLabel,
        width: serialWidth,
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

    // const colGroupForSerial = {
    //     "key": "#",
    //     "width": "5%"
    // };

    return {
        columns: updatedColumns,
        data: updatedData,
        isSerialEnabled: true,
        colGroup: updatedColGroup
    };
};

export { insertSerial };
export default insertSerial;
