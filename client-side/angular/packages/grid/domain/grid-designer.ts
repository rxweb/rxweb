import { DomManipulation } from "@rxweb/dom";
import { TranslationCore } from "@rxweb/translate"

import { TemplateConfig, ElementConfig } from "../interface/config/template-config";
import { ControlState } from './control-state'
import { GridTemplate } from './grid-template';
import { table } from "../template/table/table";
import { EVENTS } from "../const/events.const";
import { paginator } from '../template/paginator';
import { GridConfig } from "../interface/config/grid-config";
import { ElementOnDemand } from "../interface/config/element-on-demand"
import { translatedText } from "../functions/translated-text";
import { Subscription } from "rxjs";
export class GridDesigner extends GridTemplate {
    childDom: DomManipulation;
    private element: HTMLElement;
    private isReDesign: boolean = false;
    startNodeName: string = "table"
    isDivBase: boolean = false;
    hideHeaderFooter: boolean = false;
    hideFooter: boolean = false;
    hideHeader: boolean = false;
    private DomManipulations: DomManipulation[];
    authorization: { [key: string]: any };
    private gridConfiguration: GridConfig;

    subscription: Subscription
    
    constructor(source: any[], model: Function, configuration: GridConfig) {
        super(source, model, configuration);
        this.gridConfiguration = configuration;
        this.eventSubscriber.subscribe(EVENTS.ADD_ROWS, this.addRows.bind(this));
        this.eventSubscriber.subscribe(EVENTS.REMOVE_ROWS, this.removeRows.bind(this));
        this.controlState = new ControlState();
    }

    languageChange() {
        if (this.headerColumns)
        translatedText(this.headerColumns, "headerKey", "headerTitle");
        this.paginationMultilingual();
    }


    design(element: HTMLElement) {
        if (this.isTranslateModuleUsed)
            this.subscription = TranslationCore.languageChanged.subscribe(t => { this.languageChange(); });
        this.element = element;
        this.bindSource();
        var isRowEvent = this.gridConfiguration && this.gridConfiguration.actions && this.gridConfiguration.actions.onRowSelect !== undefined;
        if (isRowEvent && !this.isReDesign)
            this.overrideRowSelect();
        var template = table({
            hideHeader: this.hideHeader,
            hideFooter: this.hideFooter,
            hideHeaderFooter: this.hideHeaderFooter,
            isDivBase: this.isDivBase,
            allowSorting: this.allowSorting,
            classConfig: this.designClass,
            eventSubscriber: this.eventSubscriber,
            gridColumns: this.gridColumns,
            multiLingualPath: this.componentId,
            isRowEvent: isRowEvent,
            authorization: this.authorization,
            authroizationMethod: this.authorize.bind(this),
            isTranslateModuleUsed: this.isTranslateModuleUsed,
            gridConfiguration: this.gridConfig.configuration
        }, this.gridSource);
        if (!this.isReDesign)
            this.pagination();

        this.bodyTemplate = template.bodyTemplate;
        this.headerTemplate = template.headerTemplate;
        this.headerColumns = template.headerColumns;
        this.createElement(element, this.startNodeName, this.tableElementConfig, this, 0);
        if (!this.hideHeaderFooter && !this.hideFooter) {
            var footerTemplate = paginator({ onPageChanging: this.onPageChanging.bind(this), designClass: this.footerDesignClass, dropdownOptions: this.pagingSource, eventSubscriber: this.eventSubscriber, onMaxPerPageChanging: this.onMaxPerPageChanging.bind(this), paginatorSource: this.paginationConfigs });
            this.footerLeftTemplate = footerTemplate.leftTemplate;
            this.footerCenterTemplate = footerTemplate.centerTemplate;
            this.footerRightTemplate = footerTemplate.rightTemplate;
            this.createChildElements(element, [this.footerTemplate], this, 0);
        }
        var column = this.gridColumns.filter(t => t.isAscending)[0];
        super.sortColumn(column, true);
    }

    private overrideRowSelect() {
        var onRowSelect = this.gridConfiguration.actions.onRowSelect;
        this.gridConfiguration.actions.onRowSelect = (x, y) => {
            if (y.srcElement.id != "action")
                onRowSelect(x);
        }
    }
    resolveOnDemandSelector(selectorName: any, jObject: { [key: string]: any }): ElementOnDemand {
        return null;
    }
    private createElement(parentElement: HTMLElement, elementName: string, elementConfig: ElementConfig, modelObject: any, index: number) {
        let authorizationPassed = (this.authorization && elementConfig && elementConfig.authorize && this.authorization[elementConfig.authorize]) ? this.authorize(this.authorization[elementConfig.authorize]) : true;
        if (authorizationPassed) {
            var domManipulation = new DomManipulation(parentElement, elementName, elementConfig, modelObject, index, this.gridConfiguration);
            domManipulation.bind();
            if (elementConfig.onDemandSelector) {
                domManipulation.onDemand = this.resolveOnDemandSelector(elementConfig.onDemandSelector, modelObject.instance ? modelObject.instance : modelObject) as ElementOnDemand
                domManipulation.element.appendChild(domManipulation.onDemand.element);
            }
            if (this.DomManipulations)
                this.DomManipulations.push(domManipulation);
            this.controlState.elements[domManipulation.controlId] = domManipulation;
            if (elementConfig.sourceItems && elementConfig.childrens) {
                elementConfig.sourceItems.forEach((t, index) => {
                    if (elementConfig["rowItem"])
                        this.DomManipulations = this.DomRows[index] = []
                    var childrenLength = elementConfig.childrens.length;
                    let x = {};
                    if (modelObject.value) {
                        x = { ...t, ...{ parentObject: modelObject.value } };
                    }
                    else
                        x = t;
                    this.createChildElements(domManipulation.element, [childrenLength > index ? elementConfig.childrens[index] : elementConfig.childrens[0]], x, index)
                });
            }
            else
                if (elementConfig.childrens)
                    this.createChildElements(domManipulation.element, elementConfig.childrens, elementConfig.gridData ? { ...{ gridData: elementConfig.gridData, ...modelObject } } : modelObject, 0);
            return domManipulation;
        }
    }

    private createChildElements(element: HTMLElement, childrens: TemplateConfig[], modelObject: any, index: number) {
        childrens.forEach(templateConfig => {
            Object.keys(templateConfig).forEach(t => {
                let bind = templateConfig[t].isBind === undefined ? true : templateConfig[t].isBind(modelObject.instance);
                if (bind)
                    this.createElement(element, t, templateConfig[t], modelObject, index);
            })
        })
    }

    private addRows(dataItem: { [key: string]: any }) {
        var name = `${dataItem.identity}-0`;
        var domManipulation = this.controlState.elements[name];
        if (domManipulation)
            this.createChildElements(domManipulation.element, this.getChildTemplate(name), dataItem.row, dataItem.index)
    }



    private removeRows(rowIndex: { [key: string]: number }) {
        for (var i = rowIndex.start, j = rowIndex.end; i < j; i++) {
            var control = this.controlState.elements[`${rowIndex.identity}-${i}`];
            if (control)
                this.removeChildren(control.element);
        }
    }

    reDesign() {
        this.isReDesign = true;
        this.removeChildren(this.element, false);
        this.design(this.element);
        this.isReDesign = false
    }


    addChildGrid(id: number, grid: GridDesigner) {
        var element = this.getRowElement(id);
        if (element) {
            var dom = new DomManipulation(element, 'div', {}, {}, 0);
            grid.childDom = dom;
            grid.design(dom.element);
            this.childrens[id] = grid;
        }
    }



    destroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
        this.removeChildrens();
        this.removeChildren(this.element);
    }

    private removeChildren(element: any, isRemoveRoot: boolean = true) {
        let controlId = element.getAttribute("data-rxwebid");
        let rxinner = element.getAttribute("data-rxinner");
        while (element.firstElementChild)
            if (controlId && this.controlState.elements[controlId] && this.controlState.elements[controlId].onDemand)
                this.controlState.elements[controlId].onDemand.onDestroy();
            else {
                if (!rxinner)
                    this.removeChildren(element.firstElementChild);
                else
                    break;
            }
            
        if (isRemoveRoot) {
            let controlId = element.getAttribute("data-rxwebid");
            if (controlId && this.controlState.elements[controlId]) {
                this.controlState.elements[controlId].destroy();
                delete this.controlState.elements[controlId];
            }
        }
    }

    private getChildTemplate(name: string) {
        switch (name) {
            case "tbody-id-0":
                return this.bodyTemplate[this.isDivBase ? "div" : "tbody"].childrens;
                break;
            case "pagination-0":
                return this.footerTemplate.div.childrens[2].div.childrens[0].ul.childrens;
                break;
        }
    }

    authorize(authorizeConfig: { [key: string]: any }): boolean {
        return true;
    }
}