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
                                        class: ["toast-close-button", config && config.autoHideDisable ?"dummy": "toast-close-display-none"],
                                        event: {
                                            click: (event) => {
                                                if (config && config.autoHideDisable) {
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