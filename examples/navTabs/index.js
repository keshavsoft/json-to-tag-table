import renderNavTabs from "../../src/v11/table/methods/renderers/navTabs/index.js";

const startFunc = () => {
    const tabsData = [
        {
            id: "ca-1",
            label: "Sales/CA (CA/1)",
            content: "Inventory items: Shading Net Kgs, ROPE, Nylon Cheeses, 0.75/90/50, Gloves..."
        },
        {
            id: "cr-1",
            label: "Sales/Cr Mani (CR/1)",
            content: "Inventory items: 3.50 White F.Line (20.500 kgs, Rate: 470.00, Amount: 9635)..."
        },
        {
            id: "cr-2",
            label: "Sales/Cr Mani (CR/2)",
            content: "Inventory items: Water Proof Tape, PPMF TWINE, Shading Net Kgs, GD Connected..."
        },
        {
            id: "e-1",
            label: "Sales/E (E/1)",
            content: "Inventory items: Shading Net Kgs (9.000 kgs, Rate: 300.00, Amount: 2700)..."
        }
    ];

    renderNavTabs({
        targetHtmlId: "tabs-container",
        inTabs: tabsData,
        inSkeletonType: "default"
    });
};

startFunc();
