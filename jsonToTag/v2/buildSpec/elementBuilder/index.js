import createElement from "./0.createElement.js";
import applyTextContent from "./1.applyTextContent.js";
import applyProperties from "./2.applyProperties.js";
import applyAttributes from "./3.applyAttributes.js";
import applyClassList from "./4.applyClassList.js";
import appendChildren from "./5.appendChildren.js";

/**
 * domElementBuilder - Pure Runtime Element Builder (v23)
 * High-speed native DOM element factory (stages 0 to 5)
 */
const domElementBuilder = ({ inSpec, inClassList, inShowLog = false }) => {
    const localSpec = inSpec;
    const localClassList = inClassList || localSpec?.classList;
    const localShowLog = inShowLog;

    if (!localSpec || !localSpec.tagName) return null;
    if (localShowLog) console.log("localSpec : ", localSpec, localClassList);

    // 0. Create Element
    const element = createElement({ inTagName: localSpec.tagName });
    if (!element) return null;

    // 1. Apply Text Content
    applyTextContent({
        inElement: element,
        inTextContent: localSpec.textContent,
        inTagName: localSpec.tagName
    });

    // 2. Apply Properties
    applyProperties({
        inElement: element,
        inProperties: localSpec.properties
    });

    // 3. Apply Attributes directly
    applyAttributes({
        inElement: element,
        inAttributes: localSpec.attributes
    });
    if (localShowLog) console.log("before class List : ", element.classList);

    // 4. Apply ClassList
    applyClassList({
        inElement: element,
        inClassList: localSpec?.class
    });
    if (localShowLog) console.log("after class List : ", element.classList);

    // 5. Append Children
    appendChildren({
        inElement: element,
        inChildren: localSpec.children,
        inTagName: localSpec.tagName
    });

    return element;
};

export default domElementBuilder;
