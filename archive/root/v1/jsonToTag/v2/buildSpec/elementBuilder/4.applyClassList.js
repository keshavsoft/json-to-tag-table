export const applyClassList = ({ inElement, inClassList, inShowLog = false }) => {
    const localElement = inElement;
    const localClassList = inClassList;
    const localShowLog = inShowLog;

    if (!localElement || !localClassList) return localElement;

    let classesToAdd = [];
    if (typeof localClassList === "string") {
        classesToAdd = localClassList.split(/\s+/).filter(Boolean);
    } else if (Array.isArray(localClassList)) {
        classesToAdd = localClassList.filter(c => typeof c === "string" && c.trim().length > 0);
    }

    if (classesToAdd.length > 0) {
        localElement.classList.add(...classesToAdd);
    };

    if (localShowLog) console.log("------ : ", localElement);

    return localElement;
};

export default applyClassList;
