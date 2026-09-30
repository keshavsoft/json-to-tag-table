import extractFormData from "./extractFormData.js";

/**
 * Step 2: Handle Save button action - serialize form DOM and dispatch callbacks
 */
const handleSave = ({ inEvent, inFormContainer, onSave, afterSave } = {}) => {
    const clickedButton = inEvent?.target?.closest("button");
    const formData = extractFormData({ inFormContainer });

    // Visual button feedback
    if (clickedButton) {
        const originalText = clickedButton.textContent;
        clickedButton.textContent = "Saved!";
        clickedButton.classList.replace("btn-primary", "btn-success");
        setTimeout(() => {
            clickedButton.textContent = originalText;
            clickedButton.classList.replace("btn-success", "btn-primary");
        }, 1000);
    }

    if (typeof onSave === "function") {
        onSave({ inData: formData, inEvent });
    }

    if (typeof afterSave === "function") {
        afterSave({ inData: formData, inEvent });
    }

    return formData;
};

export { handleSave };
export default handleSave;
