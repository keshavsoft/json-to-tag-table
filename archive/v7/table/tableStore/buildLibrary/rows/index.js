import { cloneData } from "../../../../common/cloneData.js";
import { insertSerial } from "./insertSerial.js";

const buildRows = ({ inData = [], inLayout = {}, inConfig = {} } = {}) => {
    const localData = inData;
    const localLayout = inLayout;
    const localConfig = inConfig;

    const stateData = cloneData({
        inData: localData,
        inActiveColumns: localLayout.activeColumns
    });

    const serialResult = insertSerial({
        inColumns: localLayout.activeColumns,
        inData: stateData,
        inConfig: localConfig,
        inColGroup: localLayout.colGroup
    });

    return {
        columns: serialResult.columns,
        stateData: serialResult.data,
        isSerialEnabled: serialResult.isSerialEnabled,
        colGroup: serialResult.colGroup
    };
};

export { buildRows };
export default buildRows;
