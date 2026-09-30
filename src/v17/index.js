import registerGlobal from "./registerGlobal.js";
import { Table } from "./table/index.js";
import { defaultConfig } from "./config/index.js";
import render, { renderTable, renderNavTabs, renderForm } from "./table/methods/renderers/index.js";

registerGlobal(Table);

export { Table, defaultConfig, render, renderTable, renderNavTabs, renderForm };
export default Table;
