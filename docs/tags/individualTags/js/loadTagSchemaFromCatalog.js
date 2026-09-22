export const loadTagSchemaFromCatalog = async ({ inTagName, inCatalogUrl }) => {
    const localTagName = inTagName ?? "";
    const localCatalogUrl = inCatalogUrl ?? "../tags.json";

    try {
        const response = await fetch(`${localCatalogUrl}?timestamp=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} loading ${localCatalogUrl}`);
        }

        const fullCatalog = await response.json();
        const tagKeys = Object.keys(fullCatalog).filter(k => k !== "$schema");
        const tagDefinition = fullCatalog[localTagName];

        if (!tagDefinition) {
            throw new Error(`Tag "${localTagName}" was not found in ${localCatalogUrl}`);
        }

        // Render allowed attributes
        const allowedAttrsContainer = document.getElementById("catalogAllowedAttributes");
        if (allowedAttrsContainer) {
            const attrs = tagDefinition.allowedAttributes || [];
            if (attrs.length > 0) {
                allowedAttrsContainer.innerHTML = attrs
                    .map(attr => `<span class="attr-pill">${attr}</span>`)
                    .join(" ");
            } else {
                allowedAttrsContainer.innerHTML = '<span class="text-muted fst-italic">Standard attributes only (id, class, style, title)</span>';
            }
        }

        // Render permitted children
        const permittedChildrenContainer = document.getElementById("catalogPermittedChildren");
        if (permittedChildrenContainer) {
            const children = tagDefinition.childTags || [];
            if (children.length > 0) {
                permittedChildrenContainer.innerHTML = children
                    .map(child => `<a href="./${child}.html" class="badge bg-secondary-subtle text-secondary font-monospace text-decoration-none me-1">&lt;${child}&gt;</a>`)
                    .join(" ");
            } else if (tagDefinition.allowsChildren) {
                permittedChildrenContainer.innerHTML = '<span class="text-muted">Any valid DOM specification</span>';
            } else {
                permittedChildrenContainer.innerHTML = '<span class="badge bg-warning-subtle text-warning-emphasis">None (Void / Leaf Element)</span>';
            }
        }

        // Update capability badges
        const badgeChildren = document.getElementById("badgeAllowsChildren");
        if (badgeChildren) {
            badgeChildren.innerHTML = tagDefinition.allowsChildren
                ? '<i class="bi bi-check-circle-fill text-success me-1"></i> allowsChildren: <strong>true</strong> (Container)'
                : '<i class="bi bi-x-circle text-muted me-1"></i> allowsChildren: <strong>false</strong> (Void / Leaf)';
            badgeChildren.className = tagDefinition.allowsChildren
                ? "badge bg-success-subtle text-success border border-success-subtle px-2 py-1"
                : "badge bg-light text-muted border px-2 py-1";
        }

        const badgeText = document.getElementById("badgeAllowsText");
        if (badgeText) {
            badgeText.innerHTML = tagDefinition.allowsTextContent
                ? '<i class="bi bi-check-circle-fill text-info me-1"></i> allowsTextContent: <strong>true</strong>'
                : '<i class="bi bi-x-circle text-muted me-1"></i> allowsTextContent: <strong>false</strong>';
            badgeText.className = tagDefinition.allowsTextContent
                ? "badge bg-info-subtle text-info-emphasis border border-info-subtle px-2 py-1"
                : "badge bg-light text-muted border px-2 py-1";
        }

        // Render the exact slice from tags.json
        const rawSliceElement = document.getElementById("rawCatalogSlice");
        if (rawSliceElement) {
            const tagSlice = { [localTagName]: tagDefinition };
            rawSliceElement.textContent = JSON.stringify(tagSlice, null, 2);
        }

        // Populate internal switcher dropdown ("big menu kept inside")
        const selectTag = document.getElementById("selectTag");
        if (selectTag) {
            selectTag.innerHTML = "";
            tagKeys.forEach(t => {
                const opt = document.createElement("option");
                opt.value = t;
                opt.textContent = `<${t}>`;
                if (t === localTagName) opt.selected = true;
                selectTag.appendChild(opt);
            });

            selectTag.addEventListener("change", (e) => {
                window.location.href = `./${e.target.value}.html`;
            });
        }

        // Previous and Next buttons
        const btnPrevTag = document.getElementById("btnPrevTag");
        if (btnPrevTag) {
            btnPrevTag.addEventListener("click", () => {
                const currentIndex = tagKeys.indexOf(localTagName);
                const prevIndex = (currentIndex - 1 + tagKeys.length) % tagKeys.length;
                window.location.href = `./${tagKeys[prevIndex]}.html`;
            });
        }

        const btnNextTag = document.getElementById("btnNextTag");
        if (btnNextTag) {
            btnNextTag.addEventListener("click", () => {
                const currentIndex = tagKeys.indexOf(localTagName);
                const nextIndex = (currentIndex + 1) % tagKeys.length;
                window.location.href = `./${tagKeys[nextIndex]}.html`;
            });
        }

        // Copy sample button
        const btnCopySample = document.getElementById("btnCopySample");
        const sampleSpecCode = document.getElementById("sampleSpecCode");
        if (btnCopySample && sampleSpecCode) {
            btnCopySample.addEventListener("click", () => {
                navigator.clipboard.writeText(sampleSpecCode.textContent || "");
                btnCopySample.innerHTML = '<i class="bi bi-check2 text-success"></i> Copied!';
                setTimeout(() => {
                    btnCopySample.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy Sample JSON';
                }, 1500);
            });
        }

        return tagDefinition;
    } catch (error) {
        const errorContainer = document.getElementById("catalogErrorNotice");
        if (errorContainer) {
            errorContainer.style.display = "block";
            errorContainer.textContent = `Could not load schema from tags.json: ${error.message}`;
        }
        return null;
    }
};

export default loadTagSchemaFromCatalog;
