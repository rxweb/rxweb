import { PaginatorTemplateConfig } from "../interface/config/paginator-template-config";
import { TemplateConfig } from "..";
import { MultiLingualData } from "@rxweb/localization";
export function paginator(paginatorTemplateConfig: PaginatorTemplateConfig) {
    return {
        leftTemplate: dropdownTemplate(paginatorTemplateConfig),
        centerTemplate: textTemplate(),
        rightTemplate: paginatorTemplate(paginatorTemplateConfig)
    };
}

function paginatorTemplate(paginatorTemplateConfig: PaginatorTemplateConfig) {
    return {
        div: {
            class: paginatorTemplateConfig.designClass.paginatorClass.rootClass,
            childrens: [
                {
                    ul: {
                        id: paginatorTemplateConfig.isTop ? "top-pagination": "pagination",
                        class: paginatorTemplateConfig.designClass.paginatorClass.unorderedListItemClass,
                        sourceItems: paginatorTemplateConfig.paginatorSource,
                        childrens: [{
                            li: {
                                id: paginatorTemplateConfig.isTop ? "top-list-item" : "list-item",
                                event: {
                                    click: paginatorTemplateConfig.onPageChanging
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
        div: {
            class: ["col-4"],
            childrens: [
                { text: { text: ":showing" } },
                { text: { text: ':startCount' } },
                { text: { text: ':to' } },
                { text: { text: ':endCount' } },
                { text: { text: ':of'} },
                { text: { text: ':sourceLength' } },
                { text: { text: ':entriesText' } }]
        }
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
                                    text: ':show'
                                }
                            },
                            {
                                select: {
                                    id: paginatorTemplateConfig.isTop ? "top-select" : "bottom-select",
                                    event: {
                                        change: paginatorTemplateConfig.onMaxPerPageChanging
                                    },
                                    class: paginatorTemplateConfig.designClass.dropDownTemplateClass.controlClass,
                                    childrens: getPagingOptions(paginatorTemplateConfig.dropdownOptions)
                                }
                            },
                            {
                                text: {
                                    text: ':entriesText'
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
                attributes: {
                    value: text,
                    selected: function (x, y) {
                        return this.maxPerPage == x.data;
                    }
                },
                childrens: [{ text: { text: text } }],
                parameterConfig: {data:text}
            }
        })
    })
    return templateConfigs;
}