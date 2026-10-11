import meta from "./meta.js";
import registerGlobal from "./registerGlobal.js";
import { Table } from "./table/index.js";
import { defaultConfig } from "./config/index.js";
import render, { renderTable } from "./table/methods/renderers/index.js";

registerGlobal(Table);

export { Table, defaultConfig, render, renderTable, meta };
export default Table;
