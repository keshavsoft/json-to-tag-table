const formatFooter = ({ inComputedFooter = [], inActiveColumns = [] } = {}) => {
    const localComputedFooter = inComputedFooter;
    const localActiveColumns = inActiveColumns;

    if (!Array.isArray(localComputedFooter) || localComputedFooter.length === 0) {
        return [];
    }

    if (!Array.isArray(localActiveColumns) || localActiveColumns.length === 0) {
        return [];
    }

    const labelColumnIndex = (localActiveColumns[0]?.key === "serial" && localActiveColumns.length > 1) ? 1 : 0;
    const labelColumnKey = localActiveColumns[labelColumnIndex]?.key;

    return localComputedFooter.map(computedRow => {
        const rowValues = computedRow.values || {};
        const formattedRow = {};

        if (computedRow.type === "input") {
            localActiveColumns.forEach((col) => {
                if (col.key === "serial") {
                    formattedRow[col.key] = "+";
                } else if (col.key in rowValues) {
                    const customConfig = rowValues[col.key] || {};
                    const inputAttributes = {
                        type: customConfig.type || "text",
                        class: customConfig.class || "form-control form-control-sm",
                        name: col.key,
                        placeholder: customConfig.placeholder || col.label || col.key
                    };
                    if (customConfig.disabled) {
                        inputAttributes.disabled = "disabled";
                    }
                    formattedRow[col.key] = {
                        tagName: "input",
                        attributes: inputAttributes
                    };
                } else {
                    formattedRow[col.key] = "";
                }
            });
            return formattedRow;
        }

        localActiveColumns.forEach((col) => {
            if (col.key in rowValues) {
                formattedRow[col.key] = rowValues[col.key];
            } else if (col.key === labelColumnKey) {
                formattedRow[col.key] = computedRow.title || computedRow.id || "";
            } else {
                formattedRow[col.key] = "";
            }
        });

        return formattedRow;
    });
};

export { formatFooter };
export default formatFooter;
