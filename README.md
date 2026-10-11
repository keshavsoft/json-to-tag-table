# json-to-tag-table

> Standalone, config-driven Table renderer powered by **`json-transformer-funcs`** and **`@keshavsoft/json-to-tag`**.

[![Version](https://img.shields.io/badge/version-v19.0.0-blue.svg)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](package.json)

---

## 📖 The Architecture Pipeline (v19)

In **v19**, table rendering is decoupled into three clean, focused layers:

```
┌────────────────────────────────────────────────────────┐
│                      TableStore                        │
│   • activeColumns (with auto serial # support)         │
│   • stateData (row records)                            │
│   • config (custom classes, layout)                    │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│     json-transformer-funcs: tableFromData()            │
│   1. inData:  { columns, rows }                        │
│   2. inSpec:  { buildHeader (th), buildBody (tr, td) } │
│   3. inTable: { table wrapper scaffold }               │
└──────────────────────────┬─────────────────────────────┘
                           │ returns spec tree
                           ▼
┌────────────────────────────────────────────────────────┐
│            @keshavsoft/json-to-tag                     │
│   • jsonToTag(tableSpec)                               │
│   • mounts live HTMLTableElement into DOM container    │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```javascript
import { Table } from "json-to-tag-table";

const data = [
  { Name: "Micro Drill Bit", Price: "$124.50", Stock: "In Stock" },
  { Name: "Carbide End Mill", Price: "$89.00", Stock: "In Stock" }
];

const columns = [
  { key: "Name", label: "Product Name" },
  { key: "Price", label: "Unit Price" },
  { key: "Stock", label: "Availability" }
];

// 1. Initialize Table with Store & Config
const table = new Table({
  data,
  columns,
  targetContainerId: "table-container"
});

// 2. Render to DOM
table.methods.render();
```

---

## 🧪 Testing & Building

```bash
# Run v19 automated test suite
npm test

# Build production bundle for v19
npm run build
```

---

## 📄 License
MIT © [KeshavSoft](https://github.com/keshavsoft)
