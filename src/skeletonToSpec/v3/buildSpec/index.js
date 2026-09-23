import {
    isNullOrUndefined,
    isDomNode,
    isSpecArray
} from "./guards.js";

import buildSpecArray from "./buildSpecArray.js";

const dispatchSpec = ({
    inSpecJson,
    inFragments, inShowLog = false
} = {}) => {
    const localSpecJson = inSpecJson;
    const localFragments = inFragments;
    if (inShowLog) console.log("dispatchSpec : ", localSpecJson, localFragments);
    if (isNullOrUndefined({ inSpec: localSpecJson })) {
        return null;
    };

    if (isDomNode({ inSpec: localSpecJson })) {
        return localSpecJson;
    };

    if (isSpecArray({ inSpecJson: localSpecJson })) {
        return buildSpecArray({
            inArray: localSpecJson,
            inFragments: localFragments
        });
    };

    if (typeof localSpecJson !== "object") {
        return localSpecJson;
    };

    // If node has slots, resolve each slot from inFragments without delete mutation
    if ("slots" in localSpecJson) {
        const {
            slots: localSlots,
            children: localChildren = [],
            ...nodeWithoutSlots
        } = localSpecJson;

        const resolvedChildren = Array.isArray(localSlots)
            ? localSlots.map(slotKey => {
                if (localFragments && slotKey in localFragments) {
                    return dispatchSpec({
                        inSpecJson: localFragments[slotKey],
                        inFragments: localFragments
                    });
                }
                return null;
            }).flat().filter(Boolean)
            : [];

        return {
            ...structuredClone(nodeWithoutSlots),
            children: [
                ...buildSpecArray({ inArray: localChildren, inFragments: localFragments }),
                ...resolvedChildren
            ]
        };
    };

    // If node has children, recursively build them into a new array
    if ("children" in localSpecJson && Array.isArray(localSpecJson.children)) {
        return {
            ...structuredClone(localSpecJson),
            children: buildSpecArray({
                inArray: localSpecJson.children,
                inFragments: localFragments
            })
        };
    };

    return structuredClone(localSpecJson);
};

export default dispatchSpec;
