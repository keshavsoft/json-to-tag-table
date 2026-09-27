import skeletonToSpec from "../../../../../skeletonToSpec/v3/index.js";
import jsonToSpec from "../../../../../../jsonToSpec/v2/index.js";
import jsonToTag from "../../../../../../jsonToTag/v2/index.js";

import skeletonJson from './skeleton.json' with {type: 'json'};
import fragmentsJson from './fragments.json' with {type: 'json'};

const startFunc = ({
    targetHtmlId,
    inTargetHtmlId,
    inTabs = [],
    inData = [],
    inSkeletonType = "default",
    inShowLog = false
} = {}) => {
    const localTargetHtmlId = inTargetHtmlId ?? targetHtmlId;
    const localTabs = inTabs;
    const localData = inData;
    const localSkeletonType = inSkeletonType;
    const localShowLog = inShowLog;

    try {
        let tabsArray = [];

        if (Array.isArray(localTabs) && localTabs.length > 0) {
            tabsArray = localTabs.map((tab, idx) => ({
                id: tab.id ?? `tab-${idx + 1}`,
                label: tab.label ?? tab.title ?? `Tab ${idx + 1}`,
                activeClass: tab.activeClass ?? (idx === 0 ? "active" : ""),
                showActiveClass: tab.showActiveClass ?? (idx === 0 ? "show active" : ""),
                isSelected: tab.isSelected ?? (idx === 0 ? "true" : "false"),
                content: tab.content ?? ""
            }));
        } else if (Array.isArray(localData) && localData.length > 0) {
            tabsArray = localData.map((row, idx) => {
                const id = `tab-${row.VOUCHERNUMBER ?? row.id ?? idx + 1}`;
                const label = row.REFERENCE || row.VOUCHERTYPENAME || `Tab ${idx + 1}`;
                const isActive = idx === 0;
                return {
                    id,
                    label,
                    activeClass: isActive ? "active" : "",
                    showActiveClass: isActive ? "show active" : "",
                    isSelected: isActive ? "true" : "false",
                    content: ""
                };
            });
        }

        const dataAsJson = { tabs: tabsArray };

        const rawSkeleton = skeletonJson[localSkeletonType] ?? skeletonJson.default ?? skeletonJson;
        const targetSkeleton = structuredClone(rawSkeleton);

        if (localShowLog) console.log("navTabs targetSkeleton : ", targetSkeleton);

        const structureJson = skeletonToSpec({
            inSkeleton: targetSkeleton,
            inFragments: fragmentsJson
        });
        if (localShowLog) console.log("navTabs structureJson : ", structureJson);

        const specAsJsonToDom = jsonToSpec({ specJson: structureJson, dataJson: dataAsJson, showLog: false });
        if (localShowLog) console.log("navTabs specAsJsonToDom : ", specAsJsonToDom);

        const fromRenderer = jsonToTag(specAsJsonToDom);

        const html = (typeof localTargetHtmlId === "string")
            ? document.getElementById(localTargetHtmlId)
            : localTargetHtmlId;

        if (!html) return fromRenderer;

        html.append(fromRenderer);
        return fromRenderer;
    } catch (error) {
        console.log("error : ", error);
    };
};

export { startFunc };
export default startFunc;
