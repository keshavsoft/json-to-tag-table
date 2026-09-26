// Story 1: Prepare table data payload as JSON
const startFunc = ({
    inColumns,
    inData,
    inColGroup,
    inFooterData = [],
    inConfig = {}
} = {}) => {
    return {
        columns: inColumns,
        data: inData,
        colGroup: inColGroup,
        foot: inFooterData,
        title: inConfig?.title ?? inConfig?.caption?.text ?? "",
        footerText: inConfig?.footerText ?? ""
    };
};

export default startFunc;
