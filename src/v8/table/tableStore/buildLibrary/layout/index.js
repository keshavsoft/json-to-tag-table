import { buildColGroup } from "./buildColGroup.js";
import resolveActiveColumns from "./resolveActiveColumns.js";

const buildLayout = ({ inSource = {}, inResolveColumns } = {}) => {
    const localSource = inSource;
    const localResolveColumns = inResolveColumns;

    const activeColumns = resolveActiveColumns({
        inColumnsCatalog: localSource?.columns,
        inColumnKeys: localSource?.config?.head?.columns,
        inResolveColumns: localResolveColumns
    });

    const colGroup = buildColGroup({
        inColGroup: localSource?.config?.colgroup
    });

    return {
        activeColumns,
        colGroup
    };
};

export { buildLayout };
export default buildLayout;
