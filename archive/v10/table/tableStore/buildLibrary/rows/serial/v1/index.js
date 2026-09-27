import buildSerialCol from "./buildSerialCol.js";
import alterColumns from "./alterColumns.js";
import alterColGroup from "./alterColGroup.js";
import alterData from "./alterData.js";

const insertSerial = ({ inColumns = [], inData = [], inConfig = {}, inColGroup } = {}) => {
    const localColumns = inColumns;
    const localData = inData;
    const localConfig = inConfig;
    const localColGroup = inColGroup;

    if (!localConfig?.serial) {
        return {
            columns: localColumns,
            data: localData,
            colGroup: localColGroup,
            isSerialEnabled: false
        };
    }

    const serialCol = buildSerialCol({ inConfig: localConfig });
    const updatedColumns = alterColumns({ inColumns: localColumns, inSerialCol: serialCol });
    const updatedColGroup = alterColGroup({ inColGroup: localColGroup, inSerialCol: serialCol });
    const updatedData = alterData({ inData: localData });

    return {
        columns: updatedColumns,
        data: updatedData,
        colGroup: updatedColGroup,
        isSerialEnabled: true
    };
};

export { insertSerial };
export default insertSerial;
