const resolveActiveColumns = ({ inColumnsCatalog = {}, inColumnKeys, inResolveColumns, inShowLog = true } = {}) => {
    const localResolveColumns = inResolveColumns;

    if (typeof localResolveColumns === "function") {
        return localResolveColumns({
            inColumnsCatalog,
            inColumnKeys
        });
    }

    return localSource?.columns || [];
};

export default resolveActiveColumns;
