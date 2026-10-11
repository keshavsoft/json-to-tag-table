import assert from "node:assert/strict";

// Setup minimal DOM mock for Node testing
class MockElement {
    constructor(tagName) {
        this.tagName = String(tagName).toUpperCase();
        this.children = [];
        this.attributes = {};
        this.innerHTML = "";
        this.textContent = "";
        this.classList = {
            add: (cls) => {
                const cur = this.attributes["class"] || "";
                this.attributes["class"] = cur ? `${cur} ${cls}` : cls;
            }
        };
    }
    append(...children) {
        this.children.push(...children);
    }
    appendChild(child) {
        this.children.push(child);
        return child;
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    getAttribute(name) {
        return this.attributes[name];
    }
}

const mockElements = new Map();
globalThis.document = {
    createElement(tag) {
        return new MockElement(tag);
    },
    createTextNode(text) {
        return { textContent: String(text) };
    },
    getElementById(id) {
        if (!mockElements.has(id)) {
            mockElements.set(id, new MockElement("div"));
        }
        return mockElements.get(id);
    }
};

import { Table, meta } from "../../src/v19/index.js";

console.log("--- Running v19 Table Tests (json-transformer-funcs powered) ---");

const testData = [
    { Name: "Laptop", Price: 1200, Stock: 10 },
    { Name: "Mouse", Price: 25, Stock: 50 },
    { Name: "Keyboard", Price: 75, Stock: 30 }
];

const testColumns = [
    { key: "Name", label: "Product Name" },
    { key: "Price", label: "Unit Price" },
    { key: "Stock", label: "In Stock" }
];

const targetContainer = document.getElementById("test-table-container");

// Test 1: Instantiation with data and columns
const table = new Table({
    data: testData,
    columns: testColumns,
    targetContainerId: "test-table-container"
});

assert.ok(table.store, "Table should have store");
assert.equal(table.store.library.stateData.length, 3, "Table should have 3 rows in stateData");
assert.equal(table.store.library.activeColumns.length, 4, "Table should have 4 active columns (including # serial)");

console.log("✓ Test 1 Passed: TableStore initialized with correct stateData and activeColumns.");

// Test 2: Render table into DOM using json-transformer-funcs & json-to-tag
const renderedElement = table.methods.render({
    inTargetHtmlId: "test-table-container"
});

assert.ok(renderedElement, "Render should return an element");
assert.equal(renderedElement.tagName, "TABLE", "Rendered root should be TABLE");
assert.equal(targetContainer.children.length, 1, "Target container should contain the rendered table");
assert.equal(targetContainer.children[0], renderedElement, "Target container child matches rendered table");

console.log("✓ Test 2 Passed: table.methods.render() compiled with json-transformer-funcs and appended TABLE to targetHtmlId.");

// Test 3: Auto-deriving columns when not provided
const tableAutoCols = new Table({
    data: testData
});

assert.ok(tableAutoCols.store.library.activeColumns.length >= 3, "Auto-derived columns should be generated from data");
console.log("✓ Test 3 Passed: Columns auto-derived from data when omitted.");

// Test 4: Version verification
assert.equal(meta.version, "v19.0.0", "Meta version should be v19.0.0");
console.log("✓ Test 4 Passed: Version is v19.0.0.");

console.log("--- All v19 Table Tests Passed Successfully! ---");
