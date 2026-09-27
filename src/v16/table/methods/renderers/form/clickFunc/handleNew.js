/**
 * Step 3: Handle New / Clear button action - reset inputs and trigger callbacks
 */
const handleNew = ({ inEvent, inFormContainer, onNew, onClear } = {}) => {
    if (inFormContainer) {
        const inputs = inFormContainer.querySelectorAll("input[name], textarea[name]");
        inputs.forEach(input => {
            if (input.type === "checkbox" || input.type === "radio") {
                input.checked = false;
            } else {
                input.value = "";
            }
        });
    }

    if (typeof onNew === "function") {
        onNew({ inEvent });
    } else if (typeof onClear === "function") {
        onClear({ inEvent });
    }
};

export { handleNew };
export default handleNew;
