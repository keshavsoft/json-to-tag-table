import { fetchTagsCatalog } from "./fetchTagsCatalog.js";
import { computeCatalogMetrics } from "./computeCatalogMetrics.js";
import { filterTagsCatalog } from "./filterTagsCatalog.js";
import { renderCatalogCards } from "./renderCatalogCards.js";
import { renderCatalogTableMatrix } from "./renderCatalogTableMatrix.js";
import { sampleSpecificationTemplates } from "./sampleSpecificationTemplates.js";

// Category tag arrays
const TABLE_TAGS = ["table", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "th", "td"];
const FORM_TAGS = ["form", "input", "checkbox", "label", "select", "option", "datalist", "button"];
const TYPO_TAGS = ["p", "h1", "h2", "span", "small"];
const LIST_TAGS = ["ul", "li"];
const INLINE_TAGS = ["a", "i"];

export const getTagCategory = ({ inTag }) => {
    const localTag = inTag ?? "";

    if (TABLE_TAGS.includes(localTag)) {
        return { name: "Table", badgeClass: "bg-primary-subtle text-primary border border-primary-subtle" };
    }
    if (FORM_TAGS.includes(localTag)) {
        return { name: "Form / Input", badgeClass: "bg-success-subtle text-success border border-success-subtle" };
    }
    if (TYPO_TAGS.includes(localTag)) {
        return { name: "Typography", badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle" };
    }
    if (LIST_TAGS.includes(localTag)) {
        return { name: "List", badgeClass: "bg-primary-subtle text-primary border border-primary-subtle" };
    }
    if (INLINE_TAGS.includes(localTag)) {
        return { name: "Inline / Link", badgeClass: "bg-info-subtle text-info-emphasis border border-info-subtle" };
    }
    if (localTag === "img") {
        return { name: "Media", badgeClass: "bg-warning-subtle text-warning-emphasis border border-warning-subtle" };
    }
    if (localTag === "header") {
        return { name: "Structure", badgeClass: "bg-secondary-subtle text-secondary border" };
    }
    return { name: "Container", badgeClass: "bg-secondary-subtle text-secondary border" };
};

// Application State
let catalogData = {};
let activeFilter = "all";
let searchQuery = "";
let activeView = "cards"; // "cards" | "table"

// DOM Elements
const statTotalTags = document.getElementById("statTotalTags");
const statAllowsChildren = document.getElementById("statAllowsChildren");
const statAllowsText = document.getElementById("statAllowsText");
const statVoidLeaf = document.getElementById("statVoidLeaf");

const chipAllCount = document.getElementById("chipAllCount");
const chipTableCount = document.getElementById("chipTableCount");
const chipFormCount = document.getElementById("chipFormCount");
const chipTypoCount = document.getElementById("chipTypoCount");

const inputSearch = document.getElementById("inputSearch");
const displayCount = document.getElementById("displayCount");
const cardsViewContainer = document.getElementById("cardsViewContainer");
const tableViewContainer = document.getElementById("tableViewContainer");
const tableRowsContainer = document.getElementById("tableRowsContainer");

const btnViewCards = document.getElementById("btnViewCards");
const btnViewTable = document.getElementById("btnViewTable");
const rawTagsCode = document.getElementById("rawTagsCode");

const btnCopyCdn = document.getElementById("btnCopyCdn");
const btnCopyJson = document.getElementById("btnCopyJson");
const filterChips = document.querySelectorAll(".filter-chip");

export const updateMetricsDisplay = ({ inMetrics }) => {
    const localMetrics = inMetrics ?? {};

    if (statTotalTags) statTotalTags.textContent = localMetrics.totalTags ?? 0;
    if (statAllowsChildren) statAllowsChildren.textContent = localMetrics.allowsChildrenCount ?? 0;
    if (statAllowsText) statAllowsText.textContent = localMetrics.allowsTextContentCount ?? 0;
    if (statVoidLeaf) statVoidLeaf.textContent = localMetrics.voidLeafCount ?? 0;

    if (chipAllCount) chipAllCount.textContent = localMetrics.totalTags ?? 0;
    if (chipTableCount) chipTableCount.textContent = localMetrics.tableTagsCount ?? 0;
    if (chipFormCount) chipFormCount.textContent = localMetrics.formTagsCount ?? 0;
    if (chipTypoCount) chipTypoCount.textContent = localMetrics.typographyTagsCount ?? 0;
};

export const renderActiveCatalogView = () => {
    const filteredTags = filterTagsCatalog({
        inTagsData: catalogData,
        inSearchQuery: searchQuery,
        inActiveFilter: activeFilter,
        inTableTags: TABLE_TAGS,
        inFormTags: FORM_TAGS,
        inTypoTags: TYPO_TAGS
    });

    if (displayCount) displayCount.textContent = filteredTags.length;

    if (activeView === "cards") {
        if (cardsViewContainer) cardsViewContainer.style.display = "block";
        if (tableViewContainer) tableViewContainer.style.display = "none";

        renderCatalogCards({
            inContainerElement: cardsViewContainer,
            inFilteredTags: filteredTags,
            inTagsData: catalogData,
            inSampleTemplates: sampleSpecificationTemplates,
            inGetCategoryFunction: getTagCategory
        });
    } else {
        if (cardsViewContainer) cardsViewContainer.style.display = "none";
        if (tableViewContainer) tableViewContainer.style.display = "block";

        renderCatalogTableMatrix({
            inTableBodyElement: tableRowsContainer,
            inFilteredTags: filteredTags,
            inTagsData: catalogData,
            inGetCategoryFunction: getTagCategory
        });
    }
};

export const initTagsCatalogPage = async () => {
    try {
        const { tagsData, rawJsonString } = await fetchTagsCatalog({ inUrl: "./tags.json" });
        catalogData = tagsData;

        if (rawTagsCode) rawTagsCode.textContent = rawJsonString;

        const metrics = computeCatalogMetrics({
            inTagsData: catalogData,
            inTableTags: TABLE_TAGS,
            inFormTags: FORM_TAGS,
            inTypoTags: TYPO_TAGS
        });

        updateMetricsDisplay({ inMetrics: metrics });
        renderActiveCatalogView();
    } catch (err) {
        if (cardsViewContainer) {
            cardsViewContainer.innerHTML = `<div class="alert alert-danger">Error loading tags.json: ${err.message}</div>`;
        }
    }
};

// Event Listeners
if (inputSearch) {
    inputSearch.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderActiveCatalogView();
    });
}

filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
        filterChips.forEach(c => {
            c.classList.remove("active", "btn-primary");
            c.classList.add("btn-outline-secondary");
        });
        chip.classList.add("active", "btn-primary");
        chip.classList.remove("btn-outline-secondary");

        activeFilter = chip.dataset.filter;
        renderActiveCatalogView();
    });
});

if (btnViewCards && btnViewTable) {
    btnViewCards.addEventListener("click", () => {
        activeView = "cards";
        btnViewCards.classList.add("active", "btn-primary");
        btnViewCards.classList.remove("btn-outline-secondary");
        btnViewTable.classList.remove("active", "btn-primary");
        btnViewTable.classList.add("btn-outline-secondary");
        renderActiveCatalogView();
    });

    btnViewTable.addEventListener("click", () => {
        activeView = "table";
        btnViewTable.classList.add("active", "btn-primary");
        btnViewTable.classList.remove("btn-outline-secondary");
        btnViewCards.classList.remove("active", "btn-primary");
        btnViewCards.classList.add("btn-outline-secondary");
        renderActiveCatalogView();
    });
}

if (btnCopyCdn) {
    btnCopyCdn.addEventListener("click", () => {
        const cdnUrl = "https://keshavsoft.github.io/json-to-tag/tags/tags.json";
        navigator.clipboard.writeText(cdnUrl);
        btnCopyCdn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
        setTimeout(() => {
            btnCopyCdn.innerHTML = '<i class="bi bi-link-45deg me-1"></i> Copy CDN URL';
        }, 1500);
    });
}

if (btnCopyJson) {
    btnCopyJson.addEventListener("click", () => {
        navigator.clipboard.writeText(JSON.stringify(catalogData, null, 2));
        btnCopyJson.innerHTML = '<i class="bi bi-check2"></i> Copied!';
        setTimeout(() => {
            btnCopyJson.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copy JSON';
        }, 1500);
    });
}

initTagsCatalogPage();
