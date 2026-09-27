import buildTableDataAsJson from "./buildTableDataAsJson.js";
import buildTableStructureSpec from "./buildTableStructureSpec.js";
import buildTableDomElement from "./buildTableDomElement.js";
import resolveTargetContainer from "./resolveTargetContainer.js";
import attachTableClickEventListener from "./attachTableClickEventListener.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

// --- Story of Table Render ---
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

    try {
        // Story 1: Prepare table data payload as JSON
        const tableDataAsJson = buildTableDataAsJson({
            inColumns,
            inData,
            inColGroup,
            inFooterData,
            inConfig
        });

        // Story 2: Build table structure specification from skeleton and fragments
        const tableStructureSpec = buildTableStructureSpec({
            inSkeletonType,
            inSkeletonJson: skeletonJson,
            inFragmentsJson: fragmentsJson,
            inShowLog
        });

        // Story 3: Generate table DOM element from structure and data
        const renderedTableElement = buildTableDomElement({
            inStructureJson: tableStructureSpec,
            inDataAsJson: tableDataAsJson,
            inShowLog
        });

        // Story 4: Resolve target HTML container
        const targetContainer = resolveTargetContainer({
            inTargetHtmlId: localTargetHtmlId
        });
        if (!targetContainer) return;

        // Story 5: Attach click event listener for child table rendering
        attachTableClickEventListener({
            inTargetContainer: targetContainer,
            inData,
            inColumns,
            inRenderFunc: startFunc,
            inTargetHtmlId: localTargetHtmlId
        });

        // Story 6: Append rendered table into target container
        targetContainer.append(renderedTableElement);

    } catch (error) {
        console.log("error : ", error);
    }
};

export default startFunc;
