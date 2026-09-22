const escapeHtml = (str) => {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
};

export const renderCatalogCards = ({
    inContainerElement,
    inFilteredTags,
    inTagsData,
    inSampleTemplates,
    inGetCategoryFunction
}) => {
    const localContainerElement = inContainerElement;
    const localFilteredTags = inFilteredTags ?? [];
    const localTagsData = inTagsData ?? {};
    const localSampleTemplates = inSampleTemplates ?? {};
    const localGetCategoryFunction = inGetCategoryFunction;

    if (!localContainerElement) return;

    localContainerElement.innerHTML = "";

    if (localFilteredTags.length === 0) {
        localContainerElement.innerHTML = `
            <div class="alert alert-light border text-center text-muted p-4">
                <i class="bi bi-search fs-3 d-block mb-2"></i>
                No tags found matching current filter criteria.
            </div>`;
        return;
    }

    localFilteredTags.forEach(tag => {
        const definition = localTagsData[tag] || {};
        const category = typeof localGetCategoryFunction === "function" 
            ? localGetCategoryFunction({ inTag: tag }) 
            : { name: "Tag", badgeClass: "bg-secondary text-white" };

        const allowedAttrs = definition.allowedAttributes || [];
        const childTags = definition.childTags || [];
        const sampleSpec = localSampleTemplates[tag] || { tagName: tag };

        const card = document.createElement("div");
        card.className = "tag-row-card";

        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-2 border-bottom">
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-primary text-white font-monospace fs-6 px-2 py-1">&lt;${tag}&gt;</span>
                    <span class="badge ${category.badgeClass} small">${category.name}</span>
                    <a href="./individualTags/${tag}.html" class="btn btn-outline-primary btn-sm py-0 px-2 small">
                        <i class="bi bi-file-earmark-code me-1"></i>Tag Spec
                    </a>
                </div>
                <div class="d-flex gap-2">
                    <span class="badge ${definition.allowsChildren ? "bg-primary-subtle text-primary border border-primary-subtle" : "bg-light text-muted border"}">
                        <i class="bi ${definition.allowsChildren ? "bi-check-circle-fill text-primary" : "bi-x-circle text-muted"} me-1"></i> allowsChildren: ${Boolean(definition.allowsChildren)}
                    </span>
                    <span class="badge ${definition.allowsTextContent ? "bg-info-subtle text-info-emphasis border border-info-subtle" : "bg-light text-muted border"}">
                        <i class="bi ${definition.allowsTextContent ? "bi-check-circle-fill text-info" : "bi-x-circle text-muted"} me-1"></i> allowsTextContent: ${Boolean(definition.allowsTextContent)}
                    </span>
                </div>
            </div>

            <div class="row g-2 mt-2 small">
                <div class="col-md-6">
                    <span class="text-muted fw-bold d-block mb-1 text-uppercase" style="font-size: 0.75rem;">Allowed Attributes:</span>
                    ${allowedAttrs.length > 0 
                        ? allowedAttrs.map(attr => `<span class="attr-pill">${attr}</span>`).join("")
                        : '<span class="text-muted fst-italic">Standard only (id, class, style, title)</span>'}
                </div>
                <div class="col-md-6">
                    <span class="text-muted fw-bold d-block mb-1 text-uppercase" style="font-size: 0.75rem;">Permitted Child Tags:</span>
                    ${childTags.length > 0 
                        ? childTags.map(child => `<a href="./individualTags/${child}.html" class="badge bg-secondary-subtle text-secondary font-monospace text-decoration-none me-1">&lt;${child}&gt;</a>`).join("")
                        : definition.allowsChildren 
                            ? '<span class="text-muted fst-italic">Any valid DOM specification</span>'
                            : '<span class="text-muted fst-italic">None (Void / Leaf element)</span>'}
                </div>
            </div>

            <div class="mt-2 pt-2 border-top">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="text-muted small fw-semibold">Sample Spec Syntax:</span>
                    <button class="btn btn-link btn-sm p-0 text-decoration-none text-secondary btn-copy-sample" data-tag="${tag}">
                        <i class="bi bi-clipboard me-1"></i> Copy Sample
                    </button>
                </div>
                <div class="sample-box">
                    <code>${escapeHtml(JSON.stringify(sampleSpec, null, 2))}</code>
                </div>
            </div>
        `;

        localContainerElement.appendChild(card);
    });

    // Wire copy buttons
    localContainerElement.querySelectorAll(".btn-copy-sample").forEach(btn => {
        btn.addEventListener("click", () => {
            const currentTag = btn.dataset.tag;
            const targetSpec = localSampleTemplates[currentTag] || { tagName: currentTag };
            navigator.clipboard.writeText(JSON.stringify(targetSpec, null, 2));
            btn.innerHTML = '<i class="bi bi-check2 text-success"></i> Copied!';
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy Sample';
            }, 1500);
        });
    });
};

export default renderCatalogCards;
