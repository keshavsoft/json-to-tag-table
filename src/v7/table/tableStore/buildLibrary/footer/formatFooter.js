const formatFooter = ({ inComputedFooter = [], inActiveColumns = [] } = {}) => {
    const localComputedFooter = inComputedFooter;
    const localActiveColumns = inActiveColumns;

    if (!Array.isArray(localComputedFooter) || localComputedFooter.length === 0) {
        return [];
    }

    if (!Array.isArray(localActiveColumns) || localActiveColumns.length === 0) {
        return [];
    }

    const dataRows = localComputedFooter.filter(row => row.type !== "input");
    if (dataRows.length === 0) {
        return [];
    }

    const labelColumnIndex = (localActiveColumns[0]?.key === "serial" && localActiveColumns.length > 1) ? 1 : 0;
    const labelColumnKey = localActiveColumns[labelColumnIndex]?.key;

    return dataRows.map(computedRow => {
        const rowValues = computedRow.values || {};
        const formattedRow = {};

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
