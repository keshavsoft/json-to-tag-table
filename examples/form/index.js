import render from "../../src/v14/table/methods/renderers/index.js";

const startFunc = () => {
    const fieldsData = [
        {
            key: "ledgerName",
            label: "Ledger Name",
            type: "text",
            value: ""
        },
        {
            key: "invoiceNumber",
            label: "Invoice Number",
            type: "text",
            value: ""
        },
        {
            key: "invoiceDate",
            label: "Invoice Date",
            type: "date",
            value: ""
        }
    ];

    render({
        type: "form",
        targetHtmlId: "form-container",
        inFields: fieldsData,
        variant: "stacked"
    });
};

startFunc();
