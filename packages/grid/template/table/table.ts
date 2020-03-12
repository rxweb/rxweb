import { Item } from "@rxweb/dom";
import { MultiLingualData } from "@rxweb/localization";

import { TemplateConfig } from "../..";
import { TableTemplateConfig } from "../../interface/config/table-template-config";
import { GridColumnConfig } from "../../interface/config/grid-column-config";
import { EVENTS } from "../../const/events.const";
import { customTemplateParser } from "../../static/custom-template-parser";

export function table(templateConfig: TableTemplateConfig, source: Item[]) {
    var config = getHeaderAndRowConfiguration(templateConfig)
    var headerTemplate = {};
    if (!templateConfig.hideHeaderFooter && !templateConfig.hideHeader)
    headerTemplate = {
        [templateConfig.isDivBase ? "div" : "thead"]: {
            class: templateConfig.classConfig.headerClass,
            childrens: [{
                [templateConfig.isDivBase ? "div":"tr"]: {
                    sourceItems: config.headerColumns,
                    class: templateConfig.classConfig.headerRowClass,
                    childrens: config.headerTemplateChildrens
                }
            }]
        }
    }
    var bodyTemplate = {
        [templateConfig.isDivBase ? "div" : "tbody"]: {
            id: "tbody-id",
            class: templateConfig.classConfig.bodyClass,
            sourceItems: source,
            rowItem:true,
            childrens: [config.rowTemplateConfg]
        }
    }
    return { headerTemplate: headerTemplate, bodyTemplate: bodyTemplate, headerColumns: Object.keys(headerTemplate).length > 0 ? headerTemplate[templateConfig.isDivBase ? "div" : "thead"].childrens[0][templateConfig.isDivBase ? "div" : "tr"].sourceItems:[] };
}
function getText(columnConfig: GridColumnConfig) {
    return columnConfig.headerKey || columnConfig.name;
}
function getHeaderCellClass(templateConfig: TableTemplateConfig, columnConfig: GridColumnConfig) {
    let cellClass = new Array<string>();
    if (templateConfig.classConfig.headerCellClass && templateConfig.classConfig.headerCellClass.length > 0)
        templateConfig.classConfig.headerCellClass.forEach(t => cellClass.push(t));
    if (columnConfig.headerCellClass && columnConfig.headerCellClass.length > 0) {
        columnConfig.headerCellClass.forEach(t => cellClass.push(t));
    }
    return cellClass;

}
function getHeaderAndRowConfiguration(templateConfig: TableTemplateConfig) {
    var _rowChildrens: TemplateConfig[] = [];
    var _rowHeaderChildrens: TemplateConfig[] = [];
    var headerColumns: Item[] = [];
    templateConfig.gridColumns.forEach(columnConfig => {
        if (columnConfig.visible) {
            var headerCellChildrens: TemplateConfig[] = [];
            if (columnConfig.configuredHeaderTemplate) {
                let item = customTemplateParser(columnConfig.configuredHeaderTemplate, columnConfig)
                if(item)
                    headerCellChildrens.push(item);
            }
                
            headerCellChildrens.push({
                text: {
                    text: columnConfig.headerTitle ? columnConfig.headerTitle : MultiLingualData.get(`${templateConfig.multiLingualPath}.${getText(columnConfig)}_gh`)
                }
            });
            if (columnConfig.isAscending === undefined)
                columnConfig.isAscending = false;
            var headerItem = new Item({ ...columnConfig }, Object.keys(columnConfig));
            headerColumns.push(headerItem);
            var th: TemplateConfig = {};
                headerCellChildrens.push({
                    i: {
                        parameterConfig: { columnConfig: columnConfig },
                        class: [function (y: GridColumnConfig) { return this.allowSorting && this.isAscending ? templateConfig.classConfig.ascendingClass : '' }, function (y: GridColumnConfig) { return this.allowSorting &&  this.isAscending === false ? templateConfig.classConfig.descendingClass : '' }]
                    }
                });
                th = {
                    [templateConfig.isDivBase ? "div" : "th"]: {
                        parameterConfig: { columnConfig: columnConfig },
                        style: columnConfig.style,
                        event: {
                            click: (event) => {
                                templateConfig.eventSubscriber.dispatch(EVENTS.SORTING, headerItem.instance)
                            }


                        },
                    }
            };
            th[templateConfig.isDivBase ? "div" : "th"].class = getHeaderCellClass(templateConfig, columnConfig);
            th[templateConfig.isDivBase ? "div" : "th"].childrens = headerCellChildrens;
                _rowHeaderChildrens.push(th);
            let tableData = {
                [templateConfig.isDivBase ? "div" : "td"]: {
                    attributes: { id: columnConfig.name },
                    parameterConfig: { columnConfig: columnConfig },
                    class: columnConfig.class ? templateConfig.classConfig.cellClass.concat(columnConfig.class) : templateConfig.classConfig.cellClass,
                    childrens: columnConfig.template ? [columnConfig.template] : [{
                        text: {
                            text: `:${columnConfig.name}`
                        }
                    }]
                }
            };
            if (templateConfig.isRowEvent && columnConfig.preventRowSelect === undefined) {
                tableData[templateConfig.isDivBase ? "div" : "td"]["event"] = {
                    click: "onRowSelect"
                };
            }
            _rowChildrens.push(tableData);
        }
    })
    var tableRow = {
        headerColumns: headerColumns,
        headerTemplateChildrens: _rowHeaderChildrens,
        rowTemplateConfg: {
            [templateConfig.isDivBase ? "div" : "tr"]: {
                
                class: templateConfig.classConfig.rowClass,
                id: `row-id`,
                childrens: _rowChildrens
            }
        }
    };
    return tableRow;
}