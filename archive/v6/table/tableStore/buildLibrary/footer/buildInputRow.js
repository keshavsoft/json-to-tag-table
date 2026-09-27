const buildInputRow = ({ inColumns = [], inInputConfig = {} } = {}) => {
    const localColumns = inColumns;
    const localInputConfig = inInputConfig;

    if (!Array.isArray(localColumns) || localColumns.length === 0) {
        return null;
    }

    const cells = localColumns.map(col => {
        const isSerial = col.key === "serial";
        if (isSerial) {
            return {
                tagName: "td",
                attributes: {
                    class: "text-center text-muted fw-bold align-middle bg-light",
                    style: "width: 50px;"
                },
                textContent: "+"
            };
        }

        const customConfig = localInputConfig?.values?.[col.key] || {};
        const inputAttributes = {
            type: customConfig.type || "text",
            class: customConfig.class || "form-control form-control-sm",
            name: col.key,
            placeholder: customConfig.placeholder || col.label || col.key
        };

        if (customConfig.disabled) {
            inputAttributes.disabled = "disabled";
        }

        return {
            tagName: "td",
            attributes: {
                class: "align-middle"
            },
            children: [
                {
                    tagName: "input",
                    attributes: inputAttributes
                }
            ]
        };
    });

    return {
        tagName: "tr",
        attributes: {
            class: "table-input-row align-middle bg-white"
        },
        children: cells
    };
};

export { buildInputRow };
export default buildInputRow;
