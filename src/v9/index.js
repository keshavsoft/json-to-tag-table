import registerGlobal from "./registerGlobal.js";
import { Table } from "./table/index.js";
import { defaultConfig } from "./config/index.js";

registerGlobal(Table);

export { Table, defaultConfig };
export default Table;
