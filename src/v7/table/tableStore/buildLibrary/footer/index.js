import { calculateFooter } from "./calculateFooter.js";
import { formatFooter } from "./formatFooter.js";
import { resolveInputRow } from "./resolveInputRow.js";

const buildFooter = ({ inData = [], inColumns = [], inFooterConfig = [] } = {}) => {
    const localData = inData;
    const localColumns = inColumns;
    const localFooterConfig = inFooterConfig;

    const computedFooter = calculateFooter({
        inData: localData,
        inFooterConfig: localFooterConfig
    });

    const footerData = formatFooter({
        inComputedFooter: computedFooter,
        inActiveColumns: localColumns
    });

    const inputRow = resolveInputRow({
        inColumns: localColumns,
        inFootConfig: localFooterConfig
    });

    return {
        computedFooter,
        footerData,
        inputRow
    };
};

export { buildFooter };
export default buildFooter;
