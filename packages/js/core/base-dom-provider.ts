import { DomManipulation, ElementConfig, TemplateConfig } from "@rxweb/dom";
import { TemplateCategory } from "../enums/template-category";
import { controlsTemplateContainer } from "./controls-template-container";
import { ClassConfig } from "../interface/class-config";

export abstract class BaseDomProvider {
    protected elements: { [key: number]: DomManipulation } = {};

    createElement(parentElement: HTMLElement, elementName: string, elementConfig: ElementConfig, modelObject: Object, index: number, customEvents: { [key: string]: any }) {
        var domManipulation = new DomManipulation(parentElement, elementName, elementConfig, modelObject, index, customEvents);
        domManipulation.bind();
        this.elements[domManipulation.controlId] = domManipulation;
        if (elementConfig.sourceItems && elementConfig.childrens)
            elementConfig.sourceItems.forEach((t, index) => {
                var childrenLength = elementConfig.childrens.length;
                this.createChildElements(domManipulation.element, [childrenLength > index ? elementConfig.childrens[index] : elementConfig.childrens[0]], t, index, customEvents)
            });
        else
            if (elementConfig.childrens)
                this.createChildElements(domManipulation.element, elementConfig.childrens, modelObject, 0, customEvents);
        return domManipulation;
    }

    private createChildElements(element: HTMLElement, childrens: TemplateConfig[], modelObject: object, index: number, customEvents: { [key: string]: any }) {
        childrens.forEach(templateConfig => {
            Object.keys(templateConfig).forEach(t => {
                var result = true;
                if (templateConfig[t].if) 
                    result = templateConfig[t].if.call(modelObject);
                if (templateConfig[t].event && templateConfig[t].event.onclick)
                    if (customEvents[templateConfig[t].event.onclick])
                        templateConfig[t].event.onclick = customEvents[templateConfig[t].event.onclick];
                if (result)
                    this.createElement(element, t, templateConfig[t], modelObject, index, customEvents);
            })
        })
    }

    removeChildren(element: any, isRemoveRoot: boolean = true) {
        while (element.firstElementChild)
            this.removeChildren(element.firstElementChild);
        if (isRemoveRoot) {
            let controlId = element.getAttribute("data-rxwebid");
            if (controlId && this.elements[controlId]) {
                this.elements[controlId].destroy();
                delete this.elements[controlId];
            }
        }
    }
}