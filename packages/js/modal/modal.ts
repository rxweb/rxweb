import { DomManipulation, TemplateConfig, ElementConfig } from "@rxweb/dom"
import { BaseDomProvider } from "../core/base-dom-provider";
import { ModalClassConfig } from "./modal-class-config";
import { ComponentType } from './component-type';

export abstract class Modal extends BaseDomProvider {
    private domManipulation: DomManipulation;
    private overLayElement: DomManipulation;
    private popupElement: HTMLElement;
    element: HTMLElement;

    designClass: ModalClassConfig;

    resolver: (x: Function, params: { [key: string]: any }) => { element: HTMLElement, destroy: Function };

    constructor() {
        super();
        this.designClass = new ModalClassConfig();
    }

    protected getDefaultTemplate() {
        return {
            div: {
                class: this.designClass.class,
                style: this.designClass.style
            }
        }
    }

    show(component: ComponentType<any>, params: { [key: string]: any }): Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            if (this.resolver) {
                
                var template = this.getDefaultTemplate();
                let overLayElement = this.createElement(document.body, "div", { class: this.designClass.backDropClass }, {}, 0, {});
                let domManipulation = this.createElement(document.body, "div", template.div, {}, 0, {});
                let refResolver: any = {};
                let componentRef = this.resolver(component, { ...params, hide: this.hideResolver(resolve, domManipulation, overLayElement, refResolver) });
                refResolver.destroy = componentRef.destroy;
                domManipulation.element.appendChild(componentRef.element);
                if (this.designClass.showIn.length > 0)
                setTimeout(() => {
                        domManipulation.addOrRemoveClass(this.designClass.showIn);
                }, 50)
            }
        }); 
        return promise;
    }

    hideResolver(resolve: Function, domManipulation: DomManipulation, overLayElement: DomManipulation, refResolver:any) {
        return (data: any) => {
            this.hide(resolve, data, domManipulation, overLayElement, refResolver);
        }
    }

    hide(resolve: Function, data, domManipulation, overLayElement, refResolver) {
        if (this.designClass.showIn)
            domManipulation.addOrRemoveClass(this.designClass.showIn, false);
        setTimeout(() => {
            if (refResolver.destroy)
                refResolver.destroy();
            this.removeChildren(overLayElement.element);
            this.removeChildren(domManipulation.element);
            resolve(data)
        },200)
    }
}