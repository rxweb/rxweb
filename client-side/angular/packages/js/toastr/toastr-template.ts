import { ToastrDesignClass, ToastrConfig, ToastrHideConfig } from "./toastr-design-class";
export function getToastrTemplate(toastrDesign: ToastrDesignClass, config: ToastrConfig, hideConfig: ToastrHideConfig){
    return {
        div: {
            class: toastrDesign.root,
            childrens: [{
                div: {
                    class: toastrDesign.secondLevelDiv,
                    childrens: [{
                        div: {
                            class: toastrDesign.thirdLevelDiv,
                            childrens: [
                                {
                                    button: {
                                        childrens: [{ text: { text: "x" }}],
                                        class: ["toast-close-button", config && (config.autoHideDisable || config.enableCloseButton) ? "dummy": "toast-close-display-none"],
                                        event: {
                                            click: (event) => {
                                                if (config && (config.autoHideDisable || config.enableCloseButton) && hideConfig.domManipulation) {
                                                    hideConfig.hideFunc(hideConfig.domManipulation, hideConfig.toastrConfig);
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                text: { text: ":message" }
                            }]
                        }
                    }]
                }
            }]
        }
    }
}