import { TableStore } from "./tableStore/index.js";
import { createMethods } from "./methods/index.js";
import { deriveColumnsFromData } from "../common/deriveColumnsFromData.js";
import { defaultConfig } from "../config/index.js";

class Table {
    constructor({
        inData,
        data = [],
        inColumns,
        columns,
        inConfig,
        config,
        inDataProvider,
        dataProvider = null,
        inTargetContainerId,
        targetContainerId = ""
    } = {}) {
        const localData = inData || data;
        const localDataProvider = inDataProvider || dataProvider;
        const localTargetContainerId = inTargetContainerId || targetContainerId;
        const localColumns = inColumns || columns;
        const localConfig = inConfig || config;

        // 1. If columns are not supplied, derive them from the first row of data
        const resolvedColumns = (Array.isArray(localColumns) && localColumns.length > 0)
            ? localColumns
            : deriveColumnsFromData({ inData: localData });

        // 2. If config is not supplied, use defaultConfig (with serial enabled)
        const resolvedConfig = {
            ...defaultConfig,
            ...localConfig
        };

        this.containerId = localTargetContainerId;
        this.dataProvider = localDataProvider;

        this.store = new TableStore({
            inData: localData,
            inColumns: resolvedColumns,
            inConfig: resolvedConfig
        });

        this.methods = createMethods({ inTable: this });
    };
};

export { Table };
