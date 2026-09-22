import { cloneData } from "../../../common/cloneData.js";
import { insertSerial } from "./serial/insertSerial.js";
import { calculateFooter } from "./footer/calculateFooter.js";
import { formatFooter } from "./footer/formatFooter.js";

const buildColGroup = ({ inColGroup = [] } = {}) => {
    const localColGroup = inColGroup;
    if (!Array.isArray(localColGroup)) return [];

    const colGroup = localColGroup.map(element => {
        let newElement = { ...element };
        if ("width" in element) {
            newElement.style = `width: ${element.width}`;
        };
        return newElement;
    });

    return colGroup;
};

const buildLibrary = ({ inSource = {}, inResolveColumns } = {}) => {
    const localSource = inSource;
    const localResolveColumns = inResolveColumns;

    const activeColumns = typeof localResolveColumns === "function"
        ? localResolveColumns({
            inColumnsCatalog: localSource?.columns,
            inColumnKeys: localSource?.config?.head?.columns
        })
        : (localSource?.columns || []);

    const colGroup = buildColGroup({ inColGroup: localSource?.config?.colgroup });

    const stateData = cloneData({
        inData: localSource?.originalData,
        inActiveColumns: activeColumns
    });

    const serialResult = insertSerial({
        inColumns: activeColumns,
        inData: stateData,
        inConfig: localSource?.config,
        inColGroup: colGroup
    });

    const computedFooter = calculateFooter({
        inData: serialResult.data,
        inFooterConfig: localSource?.config?.foot
    });

    const footerData = formatFooter({
        inComputedFooter: computedFooter,
        inActiveColumns: serialResult.columns
    });

    return {
        activeColumns: serialResult.columns,
        stateData: serialResult.data,
        computedFooter,
        footerData,
        isSerialEnabled: serialResult.isSerialEnabled,
        colGroup: serialResult.colGroup
    };
};

export { buildLibrary };
export default buildLibrary;
