/**
 * Step 1: Convert Form DOM inputs to clean JavaScript Object
 */
const extractFormData = ({ inFormContainer } = {}) => {
    if (!inFormContainer) return {};

    const inputs = inFormContainer.querySelectorAll("input[name], select[name], textarea[name]");
    const data = {};

    inputs.forEach(input => {
        const key = input.name || input.getAttribute("name");
        if (!key) return;

        if (input.type === "checkbox") {
            data[key] = input.checked;
        } else if (input.type === "radio") {
            if (input.checked) data[key] = input.value;
        } else {
            data[key] = input.value;
        }
    });

    return data;
};

export { extractFormData };
export default extractFormData;
