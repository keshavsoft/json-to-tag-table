import handleSave from "./handleSave.js";
import handleNew from "./handleNew.js";

/**
 * Main form click router: identifies button action and routes to dedicated handlers
 */
const clickFunc = ({
    inEvent,
    inFormContainer,
    onSave,
    afterSave,
    onNew,
    onClear
} = {}) => {
    const clickedButton = inEvent?.target?.closest("button");
    if (!clickedButton) return;

    const buttonId = clickedButton.id || "";
    const buttonAction = clickedButton.dataset.action || "";
    const buttonText = clickedButton.textContent.trim().toLowerCase();

    if (buttonId === "btn-form-save" || buttonAction === "save" || buttonText === "save") {
        return handleSave({ inEvent, inFormContainer, onSave, afterSave });
    }

    if (buttonId === "btn-form-new" || buttonAction === "new" || buttonText === "new" || buttonText === "clear") {
        return handleNew({ inEvent, inFormContainer, onNew, onClear });
    }
};

export { clickFunc };
export default clickFunc;
