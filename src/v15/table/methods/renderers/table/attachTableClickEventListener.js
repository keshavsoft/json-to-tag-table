import clickFunc from "./clickFunc/v3/index.js";

// Story 5: Attach click event listener for child table rendering
const startFunc = ({
    inTargetContainer,
    inData,
    inColumns,
    inRenderFunc,
    inTargetHtmlId
} = {}) => {
    inTargetContainer.addEventListener('click', (event) => {
        clickFunc({
            inEvent: event,
            inData,
            inColumns,
            inRenderFunc,
            inTargetHtmlId
        });
    });
};

export default startFunc;
