import { Table, render } from "../../src/index.js";
import columns from "./columns.json" with { type: "json" };
import config from "./config.json" with { type: "json" };

import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// Data Provider configured with endpoints for data reading
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();
    let selectedRowIndex = 0;

    // 1. Separate scalar columns for the header form (exclude nested array lists)
    const headerColumns = columns.filter(col => !col.key.endsWith(".LIST"));

    // 2. Refresh the Table in-place (without full page reload)
    const renderTable = () => {
        const tableContainer = document.getElementById("table-container");
        if (tableContainer) tableContainer.innerHTML = "";

        const table = new Table({
            theme: "default",
            data,
            columns,
            config
        });

        table.methods.render({
            targetHtmlId: "table-container",
            inSkeletonType: "tableSimple"
        });

        // Highlight active row in table
        if (tableContainer && selectedRowIndex !== null) {
            const trs = tableContainer.querySelectorAll("tbody tr");
            if (trs[selectedRowIndex]) {
                trs[selectedRowIndex].classList.add("table-primary");
            }
        }
    };

    // 3. Render / update the vertical form with onSave and onNew callbacks
    const updateForm = (rowData) => {
        const formContainer = document.getElementById("form-container");
        if (formContainer) formContainer.innerHTML = "";

        render({
            type: "form",
            targetHtmlId: "form-container",
            inColumns: headerColumns,
            inData: rowData,
            variant: "stackedWithButtons",
            // The Form extracts DOM -> inData automatically and passes it to onSave
            onSave: ({ inData }) => {
                if (selectedRowIndex !== null && data[selectedRowIndex]) {
                    // Update existing row
                    Object.assign(data[selectedRowIndex], inData);
                } else {
                    // Append new row
                    const newRow = {
                        ...inData,
                        "ALLINVENTORYENTRIES.LIST": []
                    };
                    data.push(newRow);
                    selectedRowIndex = data.length - 1;
                }

                // Refresh ONLY the table below
                renderTable();
            },
            onNew: () => {
                selectedRowIndex = null;
                updateForm({ DATE: "", VOUCHERNUMBER: "", MASTERID: "" });
            }
        });
    };

    // 4. Initial setup
    updateForm(data?.[0] || {});
    renderTable();

    // 5. Interactive Row Selection: clicking a table row populates the form on top
    const tableContainer = document.getElementById("table-container");
    if (tableContainer) {
        tableContainer.addEventListener("click", (event) => {
            if (event.target.closest("button")) return; // Preserve child table expanders

            const tr = event.target.closest("tbody tr");
            if (!tr) return;

            const rowIndex = tr.sectionRowIndex;
            if (data[rowIndex]) {
                selectedRowIndex = rowIndex;
                updateForm(data[selectedRowIndex]);
            }
        });
    }
};

startFunc().then();
