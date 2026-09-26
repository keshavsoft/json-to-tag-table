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
    let selectedRowIndex = 0;

    // 1. Separate scalar columns for the header form (exclude nested array lists)
    const headerColumns = columns.filter(col => !col.key.endsWith(".LIST"));

    // 2. Render / refresh the Table in-place (without full page refresh)
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

        // Highlight selected row in table
        if (tableContainer && selectedRowIndex !== null) {
            const trs = tableContainer.querySelectorAll("tbody tr");
            if (trs[selectedRowIndex]) {
                trs[selectedRowIndex].classList.add("table-primary");
            }
        }
    };

    // 3. Render / update the vertical form with action buttons
    const updateForm = (rowData) => {
        const formContainer = document.getElementById("form-container");
        if (formContainer) formContainer.innerHTML = "";

        render({
            type: "form",
            targetHtmlId: "form-container",
            inColumns: headerColumns,
            inData: rowData,
            variant: "stackedWithButtons"
        });

        attachFormEvents();
    };

    // 4. Attach events to form buttons: Save (in-place table refresh) & New (clear form)
    const attachFormEvents = () => {
        const btnSave = document.getElementById("btn-form-save");
        const btnNew = document.getElementById("btn-form-new");
        const formContainer = document.getElementById("form-container");

        if (btnSave && formContainer) {
            btnSave.addEventListener("click", () => {
                const dateInput = formContainer.querySelector('input[name="DATE"]');
                const voucherInput = formContainer.querySelector('input[name="VOUCHERNUMBER"]');
                const masterIdInput = formContainer.querySelector('input[name="MASTERID"]');

                const dateVal = dateInput?.value || "";
                const voucherVal = voucherInput?.value || "";
                const masterIdVal = masterIdInput?.value || "";

                if (selectedRowIndex !== null && data[selectedRowIndex]) {
                    // Update existing row
                    data[selectedRowIndex].DATE = dateVal;
                    data[selectedRowIndex].VOUCHERNUMBER = voucherVal ? (Number(voucherVal) || voucherVal) : data[selectedRowIndex].VOUCHERNUMBER;
                    data[selectedRowIndex].MASTERID = masterIdVal ? (Number(masterIdVal) || masterIdVal) : data[selectedRowIndex].MASTERID;
                } else {
                    // Append new row
                    const newRow = {
                        DATE: dateVal || new Date().toISOString().slice(0, 10).replace(/-/g, ""),
                        VOUCHERNUMBER: voucherVal ? (Number(voucherVal) || voucherVal) : (data.length + 1),
                        MASTERID: masterIdVal ? (Number(masterIdVal) || masterIdVal) : (174169 + data.length),
                        "ALLINVENTORYENTRIES.LIST": []
                    };
                    data.push(newRow);
                    selectedRowIndex = data.length - 1;
                }

                // Visual button feedback
                const originalText = btnSave.textContent;
                btnSave.textContent = "Saved!";
                btnSave.classList.replace("btn-primary", "btn-success");
                setTimeout(() => {
                    btnSave.textContent = originalText;
                    btnSave.classList.replace("btn-success", "btn-primary");
                }, 1000);

                // Re-render ONLY the table below (no full page reload!)
                renderTable();
            });
        }

        if (btnNew) {
            btnNew.addEventListener("click", () => {
                selectedRowIndex = null;
                updateForm({ DATE: "", VOUCHERNUMBER: "", MASTERID: "" });

                // Remove highlight from table
                const tableContainer = document.getElementById("table-container");
                if (tableContainer) {
                    tableContainer.querySelectorAll("tbody tr.table-primary").forEach(tr => {
                        tr.classList.remove("table-primary");
                    });
                }
            });
        }
    };

    // 5. Initial setup: render form on top and table below
    updateForm(data?.[0] || {});
    renderTable();

    // 6. Interactive Row Selection: clicking a table row populates the form on top
    const tableContainer = document.getElementById("table-container");
    if (tableContainer) {
        tableContainer.addEventListener("click", (event) => {
            // Ignore button clicks that expand child tables
            if (event.target.closest("button")) return;

            const tr = event.target.closest("tbody tr");
            if (!tr) return;

            const rowIndex = tr.sectionRowIndex;
            if (data[rowIndex]) {
                selectedRowIndex = rowIndex;
                updateForm(data[selectedRowIndex]);

                // Update row highlight
                tableContainer.querySelectorAll("tbody tr.table-primary").forEach(r => {
                    r.classList.remove("table-primary");
                });
                tr.classList.add("table-primary");
            }
        });
    }
};

startFunc().then();
