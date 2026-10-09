// Story 4: Resolve target HTML container element
const startFunc = ({ inTargetHtmlId } = {}) => {
    if (typeof inTargetHtmlId === "string") {
        return document.getElementById(inTargetHtmlId);
    }
    return inTargetHtmlId ?? null;
};

export default startFunc;
