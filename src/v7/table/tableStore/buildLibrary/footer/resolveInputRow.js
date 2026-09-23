import { buildInputRow } from "./buildInputRow.js";

const resolveInputRow = ({ inColumns = [], inFootConfig = [] } = {}) => {
    const localColumns = inColumns;
    const localFootConfig = inFootConfig;

    const inputRowConfig = Array.isArray(localFootConfig)
        ? localFootConfig.find(row => row.type === "input")
        : null;

    if (!inputRowConfig) {
        return null;
    }

    return buildInputRow({
        inColumns: localColumns,
        inInputConfig: inputRowConfig
    });
};

export { resolveInputRow };
export default resolveInputRow;
