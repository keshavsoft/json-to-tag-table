const resolveActiveColumns = ({ inSource = {}, inResolveColumns } = {}) => {
    const localSource = inSource;
    const localResolveColumns = inResolveColumns;

    if (typeof localResolveColumns === "function") {
        return localResolveColumns({
            inColumnsCatalog: localSource?.columns,
            inColumnKeys: localSource?.config?.head?.columns
        });
    }

    return localSource?.columns || [];
};

export { resolveActiveColumns };
export default resolveActiveColumns;
