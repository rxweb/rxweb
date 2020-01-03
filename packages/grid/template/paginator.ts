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
                        id: "pagination",
                        class: paginatorTemplateConfig.designClass.paginatorClass.unorderedListItemClass,
                        sourceItems: paginatorTemplateConfig.paginatorSource,
                        childrens: [{
                            li: {
                                id: "list-item",
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
                { text: { text: MultiLingualData.get(`global.showing_gf`) || 'showing ' } },
                { text: { text: ':startCount' } },
                { text: { text: MultiLingualData.get(`global.to_gf`) || ' to ' } },
                { text: { text: ':endCount' } },
                { text: { text: MultiLingualData.get(`global.of_gf`) || ' of ' } },
                { text: { text: ':sourceLength' } },
                { text: { text: MultiLingualData.get(`global.entries_gf`) || ' entries' } }]
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
                                    text: MultiLingualData.get(`global.show_gf`) || 'Show'
                                }
                            },
                            {
                                select: {
                                    event: {
                                        change: paginatorTemplateConfig.onMaxPerPageChanging
                                    },
                                    class: paginatorTemplateConfig.designClass.dropDownTemplateClass.controlClass,
                                    childrens: getPagingOptions(paginatorTemplateConfig.dropdownOptions)
                                }
                            },
                            {
                                text: {
                                    text: MultiLingualData.get(`global.entries_gf`) || 'entries'
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