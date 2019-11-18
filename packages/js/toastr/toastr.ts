import { DomManipulation, TemplateConfig, ElementConfig } from "@rxweb/dom"
import { BaseDomProvider } from "../core/base-dom-provider";
import { TemplateCategory } from '../enums/template-category'
import { ToastrDesignClass, ToastrConfig } from "./toastr-design-class";
import { getToastrTemplate } from "./toastr-template";
import { ToastrMessageType } from "./toastr-message-type";
export abstract class Toastr extends BaseDomProvider {
    private rootElement: DomManipulation;
    private domManipulations: DomManipulation[];

    designClass: ToastrDesignClass;
    defaultConfig: ToastrConfig;

    constructor() {
        super();
        this.designClass = new ToastrDesignClass();
        this.defaultConfig = new ToastrConfig();
        this.domManipulations = new Array<DomManipulation>();
    }

    protected getDefaultTemplate() {
        return getToastrTemplate(this.designClass);
    }

    show(message: string, messageType: ToastrMessageType, config?: ToastrConfig, customTemplate?: TemplateConfig) {
        var toastrConfig = config ? { ...config, ...{ messageType: messageType, message: message } } : { ...this.defaultConfig, ...{ messageType: messageType, message: message } };

        var template = customTemplate || this.getDefaultTemplate();
        this.createRoot();
        var domManipulation = this.createElement(this.rootElement.element, 'div', template.div, toastrConfig, 0, {});
        if (this.designClass.showClass)
            domManipulation.addOrRemoveClass(this.designClass.showClass);
        this.hide(domManipulation, toastrConfig);
        this.domManipulations.push(domManipulation);
    }

    createRoot() {
        if (!this.rootElement) 
            this.rootElement = this.createElement(document.body, "div", {}, {}, 0, {});
    }

    hide(domManipulation: DomManipulation, toastrConfig: ToastrConfig) {
        setTimeout(() => {
            if (this.designClass.hideClass) {
                domManipulation.addOrRemoveClass(this.designClass.showClass,false);
                domManipulation.addOrRemoveClass(this.designClass.hideClass);
            }
            setTimeout(() => {
                this.removeChildren(domManipulation.element);
                var elements = this.domManipulations.filter(t => t.element != null);
                if (elements.length == 0) {
                    this.domManipulations = [];
                    this.removeChildren(this.rootElement.element);
                    this.rootElement = null;
                }
            },50);
        }, toastrConfig.timeOut);
    }
}