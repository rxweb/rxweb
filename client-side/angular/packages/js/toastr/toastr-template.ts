import { ToastrDesignClass } from "./toastr-design-class";

export function getToastrTemplate(toastrDesign: ToastrDesignClass){
    return {
        div: {
            class: toastrDesign.root,
            childrens: [{
                div: {
                    class: toastrDesign.secondLevelDiv,
                    childrens: [{
                        div: {
                            class: toastrDesign.thirdLevelDiv,
                            childrens: [{
                                text: { text: ":message" }
                            }]
                        }
                    }]
                }
            }]
        }
    }
}