import deriveColumnsFromData from "../../../../../../common/deriveColumnsFromData.js";

// Step 2: Create the child table inside the container
const startFunc = ({ inChildTableContainer, inContainer, inRenderFunc } = {}) => {
    const targetContainer = inChildTableContainer || inContainer;
    const childTableData = targetContainer?.childData;

    inRenderFunc({
        inTargetHtmlId: targetContainer,
        inColumns: deriveColumnsFromData({ inData: childTableData }),
        inData: childTableData,
        inSkeletonType: "tableOnly"
    });
};

export default startFunc;
