import { Table } from "../../src/index.js";
import render from "../../src/v14/table/methods/renderers/index.js";
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
    const firstRow = data?.[0] || {};

    // 1. Separate scalar columns for the header form (exclude nested array lists)
    const headerColumns = columns.filter(col => !col.key.endsWith(".LIST"));

    // Helper to render / update the vertical form on top
    const updateForm = (rowData) => {
        const formContainer = document.getElementById("form-container");
        if (formContainer) formContainer.innerHTML = "";

        render({
            type: "form",
            targetHtmlId: "form-container",
            inColumns: headerColumns,
            inData: rowData,
            variant: "stacked"
        });
    };

    // 2. Render Vertical Form on Top (populated initially with first row)
    updateForm(firstRow);

    // 3. Render Table Below
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

    // 4. Interactive Row Selection: clicking any table row populates the form on top
    const tableContainer = document.getElementById("table-container");
    if (tableContainer) {
        tableContainer.addEventListener("click", (event) => {
            // Ignore button clicks that expand child tables
            if (event.target.closest("button")) return;

            const tr = event.target.closest("tbody tr");
            if (!tr) return;

            const rowIndex = tr.sectionRowIndex;
            if (data[rowIndex]) {
                updateForm(data[rowIndex]);
            }
        });
    }
};

startFunc().then();
