import renderForm from "../../src/v14/table/methods/renderers/form/index.js";

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

    renderForm({
        targetHtmlId: "form-container",
        inFields: fieldsData,
        inVariant: "stacked"
    });
};

startFunc();
