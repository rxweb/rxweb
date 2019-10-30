import { PaginatorTemplateConfig } from "../interface/config/paginator-template-config";
import { TemplateConfig } from "..";

export function paginator(paginatorTemplateConfig: PaginatorTemplateConfig) {
    return {
        div: {
            class: paginatorTemplateConfig.designClass.rootClass,
            childrens: [dropdownTemplate(paginatorTemplateConfig), textTemplate(), paginatorTemplate(paginatorTemplateConfig)]
        }
    };
}

function paginatorTemplate(paginatorTemplateConfig: PaginatorTemplateConfig) {
    return {
        div: {
            class: paginatorTemplateConfig.designClass.paginatorClass.rootClass,
            childrens: [
                {
                    ul: {
                        id: "pagination",
                        class: paginatorTemplateConfig.designClass.paginatorClass.unorderedListItemClass,
                        sourceItems: paginatorTemplateConfig.paginatorSource,
                        childrens: [{
                            li: {
                                id: "list-item",
                                event: {
                                    onclick: paginatorTemplateConfig.onPageChanging
                                },
                                class: paginatorTemplateConfig.designClass.paginatorClass.listItemClass,
                                childrens: [{
                                    a: {
                                        class: paginatorTemplateConfig.designClass.paginatorClass.anchorClass,
                                        childrens: [
                                            {
                                                i: { class: paginatorTemplateConfig.designClass.paginatorClass.iconClass }
                                            },
                                            { text: { text: ":text" } }]
                                    }
                                }]
                            }
                        }
                        ]
                    }
                }
            ]
        }
    }
}

function textTemplate() {
    return {
        div: { class: ["col-4"], childrens: [{ text: { text: 'showing ' } }, { text: { text: ':startCount' } }, { text: { text: ' to ' } }, { text: { text: ':endCount' } }, { text: { text: ' of ' } }, { text: { text: ':length' } }, { text: { text: ' entries' }}] }
    };
}

function dropdownTemplate(paginatorTemplateConfig: PaginatorTemplateConfig) {
    return {
        div: {
            class: paginatorTemplateConfig.designClass.dropDownTemplateClass.rootClass,
            childrens: [
                {
                    label: {
                        class: paginatorTemplateConfig.designClass.dropDownTemplateClass.labelClass,
                        childrens: [
                            {
                                text: {
                                    text: 'Show'
                                }
                            },
                            {
                                select: {
                                    event: {
                                        onchange: paginatorTemplateConfig.onMaxPerPageChanging
                                    },
                                    class: paginatorTemplateConfig.designClass.dropDownTemplateClass.controlClass,
                                    childrens: getPagingOptions(paginatorTemplateConfig.dropdownOptions)
                                }
                            },
                            {
                                text: {
                                    text: 'entries'
                                }
                            }
                        ]
                    }
                },
            ]
        }
    }
}

function getPagingOptions(source: any[]) {
    let templateConfigs: TemplateConfig[] = [];
    source.forEach(t => {
        var text = String(t);
        templateConfigs.push({
            option: {
                attributes: { value: text },
                childrens: [{ text: { text: text } }]
            }
        })
    })
    return templateConfigs;
}