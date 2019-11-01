import { DomManipulation } from "@rxweb/dom";

import { TemplateConfig, ElementConfig } from "../interface/config/template-config";
import { ControlState } from '../static/control-state'
import { GridTemplate } from './grid-template';
import { table } from "../template/table/table";
import { EVENTS } from "../const/events.const";
import { paginator } from '../template/paginator';
import { GridConfig } from "../interface/config/grid-config";

export class GridDesigner extends GridTemplate {
    private element: HTMLElement;
    private isReDesign: boolean = false;
    constructor(source: any[], model: Function, private gridConfiguration: GridConfig) {
        super(source, model);
        this.eventSubscriber.subscribe(EVENTS.ADD_ROWS, this.addRows.bind(this));
        this.eventSubscriber.subscribe(EVENTS.REMOVE_ROWS, this.removeRows.bind(this));
    }

    design(element: HTMLElement) {
        this.element = element;
       this.bindSource();
        var template = table({
            allowSorting: this.allowSorting,
            classConfig: this.designClass,
            eventSubscriber: this.eventSubscriber,
            gridColumns: this.gridColumns
        }, this.gridSource);
        if (!this.isReDesign)
        this.pagination();
        var footerTemplate = paginator({ onPageChanging: this.onPageChanging.bind(this), designClass: this.footerDesignClass, dropdownOptions: this.pagingSource, eventSubscriber: this.eventSubscriber, onMaxPerPageChanging: this.onMaxPerPageChanging.bind(this), paginatorSource: this.paginationConfigs });
        this.footerTemplate = footerTemplate;
        this.bodyTemplate = template.bodyTemplate;
        this.headerTemplate = template.headerTemplate;
        this.createElement(element, 'table', this.tableElementConfig, this, 0);
        this.createChildElements(element, [this.footerTemplate], this, 0);
    }

    private createElement(parentElement: HTMLElement, elementName: string, elementConfig: ElementConfig, modelObject: Object, index: number) {
        var domManipulation = new DomManipulation(parentElement, elementName, elementConfig, modelObject, index, this.gridConfiguration);
        domManipulation.bind();
        ControlState.elements[domManipulation.controlId] = domManipulation;
        if (elementConfig.sourceItems && elementConfig.childrens)
            elementConfig.sourceItems.forEach((t, index) => {
                var childrenLength = elementConfig.childrens.length;
                this.createChildElements(domManipulation.element, [childrenLength > index ? elementConfig.childrens[index] : elementConfig.childrens[0]], t, index)
            });
        else
            if (elementConfig.childrens)
                this.createChildElements(domManipulation.element, elementConfig.childrens, modelObject, 0);
        return domManipulation;
    }

    private createChildElements(element: HTMLElement, childrens: TemplateConfig[], modelObject: object, index: number) {
        childrens.forEach(templateConfig => {
            Object.keys(templateConfig).forEach(t => {
                this.createElement(element, t, templateConfig[t], modelObject, index);
            })
        })
    }

    private addRows(dataItem: { [key: string]: any }) {
        var name = `${dataItem.identity}-0`;
        var domManipulation = ControlState.elements[name];
        this.createChildElements(domManipulation.element, this.getChildTemplate(name), dataItem.row, dataItem.index)
    }



    private removeRows(rowIndex: { [key: string]: number }) {
        for (var i = rowIndex.start, j = rowIndex.end; i < j; i++) {
            var control = ControlState.elements[`${rowIndex.identity}-${i}`];
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

    private removeChildren(element: any, isRemoveRoot: boolean = true) {
        while (element.firstElementChild)
            this.removeChildren(element.firstElementChild);
        if (isRemoveRoot) {
            let controlId = element.getAttribute("data-rxwebid");
            if (controlId && ControlState.elements[controlId]) {
                ControlState.elements[controlId].destroy();
                delete ControlState.elements[controlId];
            }
        }
    }

    private getChildTemplate(name:string) {
        switch (name) {
            case "tbody-id-0":
                return this.bodyTemplate.tbody.childrens;
                break;
            case "pagination-0":
                return this.footerTemplate.div.childrens[2].div.childrens[0].ul.childrens;
                break;
        }
    }
}