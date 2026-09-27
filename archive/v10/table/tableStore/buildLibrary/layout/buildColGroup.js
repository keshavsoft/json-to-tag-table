const buildColGroup = ({ inColGroup = [] } = {}) => {
    const localColGroup = inColGroup;
    if (!Array.isArray(localColGroup)) return [];

    const colGroup = localColGroup.map(element => {
        let newElement = { ...element };
        if ("width" in element) {
            newElement.style = `width: ${element.width}`;
        };
        return newElement;
    });

    return colGroup;
};

export { buildColGroup };
export default buildColGroup;
