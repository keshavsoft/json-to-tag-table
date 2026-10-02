import { Table } from "../../../src/index.js";
import columns from "./columns.json" with { type: "json" };
import config from "./config.json" with { type: "json" };

import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

import "https://cdn.jsdelivr.net/gh/keshavsoft/json-renderers@main/docs/dist/v8/min.js";

// Data Provider configured with endpoints for data reading
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();
    // Instantiate and render Table with separate data, columns, and config
    const table = new Table({
        theme: "default",
        data,
        columns,
        config
    });

    window.ks.jsonRenderers.renderToDom({
        type: "table",
        data: table.store.library.stateData,
        targetHtmlId: "table-container"
    });

    console.log("------table--- : ", table);
};

startFunc().then();
