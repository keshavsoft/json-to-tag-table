import { Table } from "../../src/index.js";

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
        data
    });
    console.log("------table   --- : ", table);
    table.methods.render({
        targetHtmlId: "table-container",
        inSkeletonType: "tableSimple"
    });

    // showChildTable({ targetHtmlId: "childTableContainer", inData: data[0]["ALLINVENTORYENTRIES.LIST"] });
    // console.log("------table--- : ", k1, data, table.methods);
};

const showChildTable = ({ targetHtmlId, inData }) => {
    const data = inData;

    const table = new Table({
        theme: "default",
        data
    });

    table.methods.render({
        targetHtmlId,
        inSkeletonType: "tableOnly"
    });
};

startFunc().then();
