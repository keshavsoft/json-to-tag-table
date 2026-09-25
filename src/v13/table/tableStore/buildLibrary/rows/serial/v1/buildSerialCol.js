const buildSerialCol = ({ inConfig = {} } = {}) => {
    const localConfig = inConfig;

    const serialStyle = typeof localConfig?.serial === "object" && localConfig.serial.style
        ? localConfig.serial.style
        : `width: 50px;`;

    return {
        key: "serial",
        label: "#",
        width: "50px",
        style: serialStyle
    };
};

export { buildSerialCol };
export default buildSerialCol;
