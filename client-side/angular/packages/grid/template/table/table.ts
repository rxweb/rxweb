import { Item } from "@rxweb/dom";
import { MultiLingualData } from "@rxweb/localization";

import { TemplateConfig } from "../..";
import { TableTemplateConfig } from "../../interface/config/table-template-config";
import { GridColumnConfig } from "../../interface/config/grid-column-config";
import { EVENTS } from "../../const/events.const";
import { customTemplateParser, getTemplate } from "../../static/custom-template-parser";
import { TranslationCore } from "@rxweb/translate";
import { GridConfiguration } from "../../interface/config/grid-configuration";

function designTopHeaders(columns: Item[], configuration: GridConfiguration) {
    let parentNode = [];
    if (configuration && configuration.groupColumnHeader && Array.isArray(columns)) {
        configuration.groupColumnHeader.forEach(headerItem => {
            let childrens = []
            headerItem.items.forEach(t => {
                let columnCount = 0;
                t.columns.forEach(x => { columns.filter(y => y.instance.name == x)[0] ? columnCount++ : 0 })
                var cloneTemplate: any = getTemplate(t.templateName)
                let gridData = { ...t.data, groupColumnCount: columnCount };
                Object.keys(cloneTemplate).forEach(t => cloneTemplate[t].gridData = gridData);
                childrens.push(cloneTemplate);
            })
            let parentTemplate = getTemplate(headerItem.parentTemplateName);
            Object.keys(parentTemplate).forEach(t => parentTemplate[t].childrens = childrens);
            parentNode.push(parentTemplate)
        })
    }
    return parentNode;
}

export function table(templateConfig: TableTemplateConfig, source: Item[]) {
    var config = getHeaderAndRowConfiguration(templateConfig)
    var headerTemplate = {};
    let childrens =[]
    if (!templateConfig.hideHeaderFooter && !templateConfig.hideHeader) {
        childrens = designTopHeaders(config.headerColumns, templateConfig.gridConfiguration);
        childrens.push({
            [templateConfig.isDivBase ? "div" : "tr"]: {
                sourceItems: config.headerColumns,
                class: templateConfig.classConfig.headerRowClass,
                childrens: config.headerTemplateChildrens
            }
        })
        headerTemplate = {
            [templateConfig.isDivBase ? "div" : "thead"]: {
                class: templateConfig.classConfig.headerClass,
                childrens: childrens
            }
        }
    }

    var bodyTemplate = {
        [templateConfig.isDivBase ? "div" : "tbody"]: {
            id: "tbody-id",
            class: templateConfig.classConfig.bodyClass,
            sourceItems: source,
            rowItem: true,
            childrens: [config.rowTemplateConfg]
        }
    }
    return { headerTemplate: headerTemplate, bodyTemplate: bodyTemplate, headerColumns: Object.keys(headerTemplate).length > 0 ? headerTemplate[templateConfig.isDivBase ? "div" : "thead"].childrens[childrens.length -1][templateConfig.isDivBase ? "div" : "tr"].sourceItems : [] };
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
        let authorizationCheck = templateConfig.authorization && templateConfig.authorization[columnConfig.name];
        let isAccess = true;
        let loopCount = 0;
        if (authorizationCheck) {
            if (Array.isArray(templateConfig.authorization[columnConfig.name])) {
                for (var keyName of templateConfig.authorization[columnConfig.name]) {
                    if (templateConfig.authorization[keyName]) {
                        isAccess = templateConfig.authroizationMethod(templateConfig.authorization[keyName]);
                        if (!isAccess)
                            loopCount += 1;
                    }
                }
                columnConfig.visible = columnConfig.visible ? !(templateConfig.authorization[columnConfig.name].length == loopCount) : columnConfig.visible;
            }
        }
        if (columnConfig.visible) {
            var headerCellChildrens: TemplateConfig[] = [];
            if (columnConfig.configuredHeaderTemplate) {
                let item = customTemplateParser(columnConfig.configuredHeaderTemplate, columnConfig)
                if (item)
                    headerCellChildrens.push(item);
            }

            headerCellChildrens.push({
                text: {
                    text: columnConfig.headerTitle ? columnConfig.headerTitle : templateConfig.isTranslateModuleUsed ? TranslationCore.getText(columnConfig.headerKey) : MultiLingualData.get(`${templateConfig.multiLingualPath}.${getText(columnConfig)}_gh`),
                    ref: 'headerTitle'
                }
            });
            if (columnConfig.isAscending === undefined)
                columnConfig.isAscending = false;
            let cloneColumnConfig = { ...columnConfig, ...{ isMultilingual: true } };
            var headerItem = new Item(cloneColumnConfig, Object.keys(cloneColumnConfig));
            headerColumns.push(headerItem);
            var th: TemplateConfig = {};
            headerCellChildrens.push({
                i: {
                    parameterConfig: { columnConfig: columnConfig },
                    class: [function (y: GridColumnConfig) { return this.allowSorting && this.isAscending ? templateConfig.classConfig.ascendingClass : '' }, function (y: GridColumnConfig) { return this.allowSorting && this.isAscending === false ? templateConfig.classConfig.descendingClass : '' }]
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