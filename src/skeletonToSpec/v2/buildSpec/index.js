import {
    isNullOrUndefined,
    isDomNode,
    isSpecArray
} from "./guards.js";

import buildSpecArray from "./buildSpecArray.js";

const dispatchSpec = ({
    inSpecJson,
    inFragments
} = {}) => {
    const localSpecJson = inSpecJson;
    const localFragments = inFragments;

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

    // Clone node so original input is never mutated
    const clonedNode = structuredClone(localSpecJson);

    // If node has slots, resolve each slot from inFragments
    if ("slots" in clonedNode) {
        const localSlots = clonedNode.slots;

        const resolvedChildren = Array.isArray(localSlots) ? localSlots.map(slotKey => {
            if (localFragments && slotKey in localFragments) {
                return dispatchSpec({
                    inSpecJson: localFragments[slotKey],
                    inFragments: localFragments
                });
            }
            return null;
        }).flat().filter(Boolean) : [];

        delete clonedNode.slots;

        clonedNode.children = [
            ...(clonedNode.children || []),
            ...resolvedChildren
        ];

        return clonedNode;
    };

    // If node has children, recursively build them into a new array
    if ("children" in clonedNode && Array.isArray(clonedNode.children)) {
        clonedNode.children = buildSpecArray({
            inArray: clonedNode.children,
            inFragments: localFragments
        });
    };

    return clonedNode;
};

export default dispatchSpec;