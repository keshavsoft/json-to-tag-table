import skeletonToSpec from "../../../../skeletonToSpec/v3/index.js";
import jsonToSpec from "../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../jsonToTag/v2/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};
import clickFunc from "./clickFunc/v3/index.js";

// Story 1: Prepare table data payload as JSON
const buildTableDataAsJson = ({
    inColumns,
    inData,
    inColGroup,
    inFooterData = [],
    inConfig = {}
} = {}) => {
    return {
        columns: inColumns,
        data: inData,
        colGroup: inColGroup,
        foot: inFooterData,
        title: inConfig?.title ?? inConfig?.caption?.text ?? "",
        footerText: inConfig?.footerText ?? ""
    };
};

// Story 2: Build table structure specification from skeleton and fragments
const buildTableStructureSpec = ({
    inSkeletonType = "default",
    inSkeletonJson = skeletonJson,
    inFragmentsJson = fragmentsJson,
    inShowLog = false
} = {}) => {
    const rawSkeleton = inSkeletonJson[inSkeletonType] ?? inSkeletonJson.default ?? inSkeletonJson;
    const targetSkeleton = structuredClone(rawSkeleton);

    if (inShowLog) console.log("targetSkeleton : ", targetSkeleton);

    const structureJson = skeletonToSpec({
        inSkeleton: targetSkeleton,
        inFragments: inFragmentsJson
    });

    if (inShowLog) console.log("structureJson : ", structureJson);

    return structureJson;
};

// Story 3: Generate table DOM element from structure specification and data
const buildTableDomElement = ({
    inStructureJson,
    inDataAsJson,
    inShowLog = false
} = {}) => {
    const specAsJsonToDom = jsonToSpec({
        specJson: inStructureJson,
        dataJson: inDataAsJson,
        showLog: inShowLog
    });

    if (inShowLog) console.log("specAsJsonToDom : ", specAsJsonToDom);

    return jsonToTag(specAsJsonToDom);
};

// Story 4: Resolve target HTML container element
const resolveTargetContainer = ({ inTargetHtmlId } = {}) => {
    if (typeof inTargetHtmlId === "string") {
        return document.getElementById(inTargetHtmlId);
    }
    return inTargetHtmlId ?? null;
};

// Story 5: Attach click event listener for child table rendering
const attachTableClickEventListener = ({
    inTargetContainer,
    inData,
    inColumns,
    inRenderFunc,
    inTargetHtmlId
} = {}) => {
    inTargetContainer.addEventListener('click', (event) => {
        clickFunc({
            inEvent: event,
            inData,
            inColumns,
            inRenderFunc,
            inTargetHtmlId
        });
    });
};

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

export {
    buildTableDataAsJson,
    buildTableStructureSpec,
    buildTableDomElement,
    resolveTargetContainer,
    attachTableClickEventListener,
    startFunc
};
export default startFunc;
