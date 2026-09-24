import { buildSource, resolveActiveColumns } from "../../common/SourceStore.js";
import { buildLibrary } from "./buildLibrary/index.js";
class TableStore {
    constructor({ inData = [], inColumns = [], inConfig = {} } = {}) {
        const localData = inData;
        const localColumns = inColumns;
        const localConfig = inConfig;

        // 1. Explicitly build source: pristine baseline inputs (originalData, columns, config)
        this.source = buildSource({
            inData: localData,
            inColumns: localColumns,
            inConfig: localConfig
        });

        // 2. Explicitly build library: active computed state (stateData, activeColumns, computedFooter, isSerialEnabled)
        this.library = buildLibrary({
            inSource: this.source,
            inResolveColumns: resolveActiveColumns
        });
    }

    get rawData() {
        return this.source.originalData;
    }

    get config() {
        return this.source.config;
    }

    get stateData() {
        return this.library.stateData;
    }

    get activeColumns() {
        return this.library.activeColumns;
    }

    get computedFooter() {
        return this.library.computedFooter;
    }

    get footerData() {
        return this.library.footerData;
    }
}

export { TableStore };
export default TableStore;
