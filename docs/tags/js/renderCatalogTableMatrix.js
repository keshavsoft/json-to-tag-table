export const renderCatalogTableMatrix = ({
    inTableBodyElement,
    inFilteredTags,
    inTagsData,
    inGetCategoryFunction
}) => {
    const localTableBodyElement = inTableBodyElement;
    const localFilteredTags = inFilteredTags ?? [];
    const localTagsData = inTagsData ?? {};
    const localGetCategoryFunction = inGetCategoryFunction;

    if (!localTableBodyElement) return;

    localTableBodyElement.innerHTML = "";

    if (localFilteredTags.length === 0) {
        localTableBodyElement.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted p-4">
                    No tags match current filter criteria.
                </td>
            </tr>`;
        return;
    }

    localFilteredTags.forEach(tag => {
        const definition = localTagsData[tag] || {};
        const category = typeof localGetCategoryFunction === "function"
            ? localGetCategoryFunction({ inTag: tag })
            : { name: "Tag", badgeClass: "bg-secondary text-white" };

        const allowedAttrs = definition.allowedAttributes || [];
        const childTags = definition.childTags || [];

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <a href="./individualTags/${tag}.html" class="fw-bold text-primary font-monospace text-decoration-none" title="View <${tag}> Specification">
                    &lt;${tag}&gt; <i class="bi bi-arrow-up-right small"></i>
                </a>
            </td>
            <td><span class="badge ${category.badgeClass} small">${category.name}</span></td>
            <td>
                ${definition.allowsChildren 
                    ? '<span class="text-success fw-semibold"><i class="bi bi-check-circle-fill me-1"></i>Yes</span>' 
                    : '<span class="text-muted"><i class="bi bi-x-circle me-1"></i>Void</span>'}
            </td>
            <td>
                ${definition.allowsTextContent 
                    ? '<span class="text-info fw-semibold"><i class="bi bi-check-circle-fill me-1"></i>Yes</span>' 
                    : '<span class="text-muted"><i class="bi bi-x-circle me-1"></i>No</span>'}
            </td>
            <td>
                ${allowedAttrs.length > 0 
                    ? allowedAttrs.map(attr => `<span class="attr-pill">${attr}</span>`).join("")
                    : '<span class="text-muted small fst-italic">Standard</span>'}
            </td>
            <td>
                ${childTags.length > 0 
                    ? childTags.map(child => `<a href="./individualTags/${child}.html" class="badge bg-secondary-subtle text-secondary font-monospace text-decoration-none me-1">&lt;${child}&gt;</a>`).join("")
                    : definition.allowsChildren 
                        ? '<span class="text-muted small">Any</span>' 
                        : '<span class="text-muted small fst-italic">None</span>'}
            </td>
        `;

        localTableBodyElement.appendChild(tr);
    });
};

export default renderCatalogTableMatrix;
