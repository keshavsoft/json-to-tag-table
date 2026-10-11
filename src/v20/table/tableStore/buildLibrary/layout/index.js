import { buildColGroup } from "./buildColGroup.js";
import resolveActiveColumns from "./resolveActiveColumns.js";

const buildLayout = ({ inColumnsCatalog, inColumnKeys,
    inColGroup, inResolveColumns } = {}) => {

    const localResolveColumns = inResolveColumns;

    const activeColumns = resolveActiveColumns({
        inColumnsCatalog: inColumnsCatalog,
        inColumnKeys: inColumnKeys,
        inResolveColumns: localResolveColumns
    });

    const colGroup = buildColGroup({
        inColGroup
    });

    return {
        activeColumns,
        colGroup
    };
};

export { buildLayout };
export default buildLayout;
