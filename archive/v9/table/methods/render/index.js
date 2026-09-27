import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";

// import jsonToSpec from "../../../../../node_modules/json-to-spec/index.js";
// import jsonToTag from "../../../../../node_modules/@keshavsoft/json-to-tag/index.js";

import jsonToSpec from "../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../jsonToTag/v2/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};
import deriveColumnsFromData from "../../../common/deriveColumnsFromData.js";

const removeSlot = ({ inNode, inSlotName } = {}) => {
    const localNode = inNode;
    const localSlotName = inSlotName;

    if (!localNode || typeof localNode !== "object") return;

    if (Array.isArray(localNode.slots)) {
        localNode.slots = localNode.slots.filter(slot => slot !== localSlotName);
    }

    if (Array.isArray(localNode.children)) {
        localNode.children.forEach(child => removeSlot({ inNode: child, inSlotName: localSlotName }));
    }
};

const startFunc = ({
    targetHtmlId,
    inTargetHtmlId,
    inColumns,
    inData,
    inColGroup,
    inFooterData = [],
    inConfig = {},
    inSkeletonType = "default",
    inShowLog = false
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localColumns = inColumns;
    const localData = inData;
    const localColGroup = inColGroup;
    const localFooterData = inFooterData;
    const localConfig = inConfig;
    const localSkeletonType = inSkeletonType;

    try {
        let dataAsJson = {};
        dataAsJson.columns = localColumns;
        dataAsJson.data = localData;
        dataAsJson.colGroup = localColGroup;
        dataAsJson.foot = localFooterData;
        dataAsJson.title = localConfig?.title ?? localConfig?.caption?.text ?? "";
        dataAsJson.footerText = localConfig?.footerText ?? "";

        const rawSkeleton = skeletonJson[localSkeletonType] ?? skeletonJson.default ?? skeletonJson;
        const targetSkeleton = structuredClone(rawSkeleton);

        if (inShowLog) console.log("targetSkeleton : ", targetSkeleton);

        const structureJson = skeletonToSpec({
            inSkeleton: targetSkeleton,
            inFragments: fragmentsJson
        });
        if (inShowLog) console.log("structureJson : ", structureJson);
        const specAsJsonToDom = jsonToSpec({ specJson: structureJson, dataJson: dataAsJson, showLog: false });
        if (inShowLog) console.log("specAsJsonToDom : ", specAsJsonToDom);

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;

        if (!html) return;

        html.addEventListener('click', function (event) {
            const localButton = event.target.closest('button');
            if (!localButton) return;

            const localCurrentTarget = event.currentTarget;
            const localClosestIdElement = localButton.closest('[id]');
            const localTable = localButton.closest('table');
            const localRow = localButton.closest('tr');
            const localTd = localButton.closest('td');

            console.log('Hooked element data:', localButton);
            console.log('Closest element with ID:', localClosestIdElement, 'ID:', localClosestIdElement?.id);
            console.log('Current target:', localCurrentTarget, 'ID:', localCurrentTarget?.id);
            console.log('Main table:', localTable);

            if (!localTable || !localRow) return;

            const localRowIndex = localRow.sectionRowIndex;
            const localRowData = localData?.[localRowIndex];
            if (!localRowData) return;

            const localCellIndex = localTd?.cellIndex;
            const localColumnKey = localColumns?.[localCellIndex]?.key;

            const localChildData = (localColumnKey && Array.isArray(localRowData?.[localColumnKey]))
                ? localRowData[localColumnKey]
                : Object.values(localRowData).find(val => Array.isArray(val));

            console.log('Resolved childData:', localChildData);

            if (!Array.isArray(localChildData) || localChildData.length === 0) return;

            // Find or create sibling container right next to the main table
            let siblingContainer = localTable.nextElementSibling;
            if (!siblingContainer || !siblingContainer.classList.contains('child-table-container')) {
                siblingContainer = document.createElement('div');
                siblingContainer.className = 'child-table-container mt-3';
                const closestId = localClosestIdElement?.id || localCurrentTarget?.id || 'main-table';
                siblingContainer.id = `${closestId}-child`;
                localTable.after(siblingContainer);
            }

            // Toggle off if clicking the same active row
            if (siblingContainer.dataset.activeRow === String(localRowIndex) && siblingContainer.style.display !== "none") {
                siblingContainer.style.display = "none";
                return;
            }

            siblingContainer.style.display = "";
            siblingContainer.dataset.activeRow = String(localRowIndex);
            siblingContainer.innerHTML = "";

            startFunc({
                inTargetHtmlId: siblingContainer,
                inColumns: deriveColumnsFromData({ inData: localChildData }),
                inData: localChildData,
                inSkeletonType: "tableOnly"
            });
        });

        html.append(fromRenderer);
    } catch (error) {
        console.log("error : ", error);
    };
};

export default startFunc;


