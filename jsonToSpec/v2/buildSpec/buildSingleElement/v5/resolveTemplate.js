const startFunc = ({ inTemplate, inData }) => {
    let fromHash = forHashResolve({ inTemplate, inData });
    let fromDollar = forDollarResolve({ inTemplate: fromHash, inData });

    return fromDollar;
};

const forDollarResolve = ({ inTemplate, inData }) => {
    const localTemplate = inTemplate;
    const localData = inData;

    if (typeof localTemplate !== "string") return localTemplate;

    return localTemplate.replace(/\$\{([^}]+)\}/g, (_, inPath) => {
        const localKeys = inPath.trim().split(".");
        let localValue = localData;

        for (const key of localKeys) {
            if (localValue === null || localValue === undefined) return "";
            localValue = localValue[key];
        }

        if (
            localValue === null ||
            typeof localValue === "string" ||
            typeof localValue === "number" ||
            typeof localValue === "boolean"
        ) {
            return String(localValue ?? "");
        }

        return localValue;
    });
};

const forHashResolve = ({ inTemplate, inData }) => {
    const localTemplate = inTemplate;
    const localData = inData;

    if (typeof localTemplate !== "string") return localTemplate;

    return localTemplate.replace(/\#\{([^}]+)\}/g, (_, inPath) => {
        const localKeys = inPath.trim().split(".");
        let localValue = localData;

        for (const key of localKeys) {
            if (localValue === null || localValue === undefined) return "";
            localValue = localValue[key];
        }

        if (
            localValue === null ||
            typeof localValue === "string" ||
            typeof localValue === "number" ||
            typeof localValue === "boolean"
        ) {
            return String(localValue ?? "");
        }

        return localValue;
    });
};

export default startFunc;