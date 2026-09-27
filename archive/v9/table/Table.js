import { TableStore } from "./tableStore/index.js";
import { createMethods } from "./methods/index.js";
import { deriveColumnsFromData } from "../common/deriveColumnsFromData.js";
import { defaultConfig } from "../config/index.js";

class Table {
    constructor({
        data = [],
        columns,
        config,
        dataProvider = null,
        targetContainerId = ""
    } = {}) {

        const localData = data;
        const localDataProvider = dataProvider;
        const localTargetContainerId = targetContainerId;

        // 1. If columns are not supplied, derive them from the first row of data
        const localColumns = (Array.isArray(columns) && columns.length > 0)
            ? columns
            : deriveColumnsFromData({ inData: localData });

        // 2. If config is not supplied, use defaultConfig (with serial enabled)
        const localConfig = {
            ...defaultConfig,
            ...config
        };

        this.containerId = localTargetContainerId;
        this.dataProvider = localDataProvider;

        this.store = new TableStore({
            inData: localData,
            inColumns: localColumns,
            inConfig: localConfig
        });
        // console.log("this.store : ", this.store);
        this.methods = createMethods({ inTable: this });
    };
};

export { Table };
