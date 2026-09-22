import columns from "./columns.json" with { type: "json" };
import configJson from "./config.json" with { type: "json" };

import { Table } from "../../src/v5/index.js";

// const { Table } = await import("https://keshavsoft.github.io/json-to-tag-table/dist/v4/min.js");

import { createDataProvider } from "https://keshavsoft.github.io/json-to-dom-provider/dist/v1/min.js";

// 3. Data Provider configured with endpoints for autocomplete reading and order insertion
const dataProvider = createDataProvider({
    inReadUrl: "./data.json",
    inCreateUrl: "./data.json"
});

const startFunc = async () => {
    const data = await dataProvider.read();

    console.log("------data--- : ", data);
    // 6. Instantiate and render Form
    const table = new Table({
        theme: "default",
        data,
        columns,
        config: configJson,
        targetContainerId: "filter-container"
    });

    table.methods.render({
        targetHtmlId: "table-container",
        inSkeletonType: "cardWithHeader"
    });

    // console.log("------table--- : ", k1, data, table.methods);
};

startFunc().then();
