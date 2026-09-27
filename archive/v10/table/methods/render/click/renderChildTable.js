import deriveColumnsFromData from "../../../../common/deriveColumnsFromData.js";

const renderChildTable = ({
    inContainer,
    inChildData,
    inRenderFunc
} = {}) => {
    const localContainer = inContainer;
    const localChildData = inChildData;
    const localRenderFunc = inRenderFunc;

    if (!localContainer || !localChildData || typeof localRenderFunc !== "function") return;

    localRenderFunc({
        inTargetHtmlId: localContainer,
        inColumns: deriveColumnsFromData({ inData: localChildData }),
        inData: localChildData,
        inSkeletonType: "tableOnly"
    });
};

export { renderChildTable };
export default renderChildTable;
