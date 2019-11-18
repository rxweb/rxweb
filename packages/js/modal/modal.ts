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

    resolver: (x: Function, params: { [key: string]: any }) => HTMLElement;

    destroy: () => void;

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
                this.popupElement = this.resolver(component, { ...params, hide: this.hideResolver(resolve) });
                var template = this.getDefaultTemplate();
                this.overLayElement = this.createElement(document.body, "div", { class: this.designClass.backDropClass }, {}, 0, {});
                this.domManipulation = this.createElement(document.body, "div", template.div, {}, 0, {});
                this.domManipulation.element.appendChild(this.popupElement);
                if (this.designClass.showIn.length > 0)
                setTimeout(() => {
                        this.domManipulation.addOrRemoveClass(this.designClass.showIn);
                }, 50)
            }
        }); 
        return promise;
    }

    hideResolver(resolve: Function) {
        return (data: any) => {
            this.hide(resolve,data);
        }
    }

    hide(resolve:Function,data) {
        if (this.designClass.showIn)
            this.domManipulation.addOrRemoveClass(this.designClass.showIn, false);
        setTimeout(() => {
            if (this.destroy)
                this.destroy();
            //this.domManipulation.element.removeChild(this.popupElement);
            this.removeChildren(this.overLayElement.element);
            this.removeChildren(this.domManipulation.element);
            resolve(data)
        },200)
    }
}