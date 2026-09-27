import { buildLayout } from "./layout/index.js";
import { buildRows } from "./rows/index.js";
import { buildFooter } from "./footer/index.js";

const buildLibrary = ({ inSource = {}, inResolveColumns } = {}) => {
    const localSource = inSource;
    const localResolveColumns = inResolveColumns;

    // Chapter 1: Prepare Table Layout (Columns & Widths)
    const layout = buildLayout({
        inResolveColumns: localResolveColumns,
        inColumnsCatalog: localSource?.columns,
        inColumnKeys: localSource?.config?.head?.columns,
        inColGroup: localSource?.config?.colgroup
    });

    // Chapter 2: Prepare Table Rows & Alterations (Data & Serial)
    const rows = buildRows({
        inData: localSource?.originalData,
        inLayout: layout,
        inConfig: localSource?.config
    });

    // Chapter 3: Prepare Table Footer (Aggregates & Input Row)
    const footer = buildFooter({
        inData: rows.stateData,
        inColumns: rows.columns,
        inFooterConfig: localSource?.config?.foot
    });

    return {
        activeColumns: rows.columns,
        stateData: rows.stateData,
        colGroup: rows.colGroup,
        isSerialEnabled: rows.isSerialEnabled,
        computedFooter: footer.computedFooter,
        footerData: footer.footerData
    };
};

export { buildLibrary };
export default buildLibrary;
