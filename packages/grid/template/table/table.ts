import { Item } from "@rxweb/dom";

import { TemplateConfig } from "../..";
import { TableTemplateConfig } from "../../interface/config/table-template-config";
import { GridColumnConfig } from "../../interface/config/grid-column-config";
import { EVENTS } from "../../const/events.const";

export function table(templateConfig: TableTemplateConfig,source:Item[]) {
    var config = getHeaderAndRowConfiguration(templateConfig)
    var headerTemplate = {
        thead: {
            class: templateConfig.classConfig.headerClass,
            childrens: [{
                tr: {
                    sourceItems: config.headerColumns,
                    childrens: config.headerTemplateChildrens
                }
            }]
        }
    }
    var bodyTemplate = {
        tbody: {
            id: "tbody-id",
            class: templateConfig.classConfig.bodyClass,
            sourceItems: source,
            childrens: [config.rowTemplateConfg]
        }
    }
    return { headerTemplate: headerTemplate, bodyTemplate: bodyTemplate };
}

function getHeaderAndRowConfiguration(templateConfig: TableTemplateConfig) {
    var _rowChildrens: TemplateConfig[] = [];
    var _rowHeaderChildrens: TemplateConfig[] = [];
    var headerColumns: Item[] = [];
    templateConfig.gridColumns.forEach(columnConfig => {

        if (columnConfig.visible) {
            var headerCellChildrens: TemplateConfig[] = [];
            headerCellChildrens.push({
                text: {
                    text: columnConfig.headerTitle ? columnConfig.headerTitle : columnConfig.headerKey
                }
            });
            var headerItem = new Item({ ...columnConfig }, Object.keys(columnConfig));
            headerColumns.push(headerItem);
            var th: TemplateConfig = {};
            if (templateConfig.allowSorting && columnConfig.allowSorting) {
                headerCellChildrens.push({
                    i: {
                        parameterConfig: { columnConfig: columnConfig },
                        class: [(y: GridColumnConfig) => y.isAscending ? templateConfig.classConfig.ascendingClass : '', (y: GridColumnConfig) => y.isAscending === false ? templateConfig.classConfig.descendingClass : '']
                    }
                });
                th = {
                    th: {
                        parameterConfig: { columnConfig: columnConfig },
                        style: columnConfig.style,
                        event: {
                            onclick: (event) => {
                                templateConfig.eventSubscriber.dispatch(EVENTS.SORTING, headerItem.instance)
                            }
                            
                            
                        },
                    }
                };
            }
            th.th.class = templateConfig.classConfig.headerCellClass;
            th.th.childrens = headerCellChildrens;
            _rowHeaderChildrens.push(th);
            _rowChildrens.push({
                td: {
                    parameterConfig: { columnConfig: columnConfig },
                    class: columnConfig.class ? templateConfig.classConfig.cellClass.concat(columnConfig.class) : templateConfig.classConfig.cellClass,
                    childrens: columnConfig.template ? [columnConfig.template] : [{
                        text: {
                            text: `:${columnConfig.name}`
                        }
                    }]
                }
            })
        }
    })

    return {
        headerColumns : headerColumns,
        headerTemplateChildrens: _rowHeaderChildrens,
        rowTemplateConfg : {
            tr: {
                class: templateConfig.classConfig.rowClass,
                id: 'row-id',
                childrens: _rowChildrens
            }
        }
    }
    

}