import { Table } from "../../src/index.js";
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

    console.log("------data--- : ", data);
    console.log("------columns--- : ", columns);
    console.log("------config--- : ", config);

    // Instantiate and render Table with separate data, columns, and config
    const table = new Table({
        theme: "default",
        data,
        columns,
        config
    });

    console.log("------table--- : ", table);
    table.methods.render({
        targetHtmlId: "table-container",
        inSkeletonType: "tableSimple"
    });
};

startFunc().then();
