import { calculateFooter } from "./calculateFooter.js";
import { formatFooter } from "./formatFooter.js";

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

    return {
        computedFooter,
        footerData
    };
};

export { buildFooter };
export default buildFooter;
