import { Table } from "../../../docs/dist/v19/min.js";
import data from "./data.json" with { type: "json" };

const startFunc = () => {
    // 1. Instantiate Table with pure data (columns auto-derived, default config applied)
    const table = new Table({
        data
    });

    // 2. Render directly into target container
    table.methods.render({
        inTargetHtmlId: "table-container"
    });

    console.log("v19 Table rendered with json-to-tag:", table);
};

startFunc();
