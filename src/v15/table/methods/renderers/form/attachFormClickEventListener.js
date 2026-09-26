import clickFunc from "./clickFunc/index.js";

/**
 * Story: Attach click event listener for Form action buttons
 */
const startFunc = ({
    inTargetContainer,
    onSave,
    afterSave,
    onNew,
    onClear
} = {}) => {
    if (!inTargetContainer) return;

    inTargetContainer.addEventListener("click", (event) => {
        clickFunc({
            inEvent: event,
            inFormContainer: inTargetContainer,
            onSave,
            afterSave,
            onNew,
            onClear
        });
    });
};

export default startFunc;
