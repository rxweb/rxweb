import { DomManipulation, TemplateConfig, ElementConfig } from "@rxweb/dom"
import { MultiLingualData } from "@rxweb/localization"
import { BaseDomProvider } from "../core/base-dom-provider";
import { TemplateCategory } from '../enums/template-category'
import { ToastrDesignClass, ToastrConfig, ToastrHideConfig } from "./toastr-design-class";
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

    protected getDefaultTemplate(config: ToastrConfig, hideConfig: ToastrHideConfig) {
        return getToastrTemplate(this.designClass, config, hideConfig);
    }
    private getMessage(message: string) {
        return message.charAt(0) == ':' ? MultiLingualData.get(message.replace(":", "")) : message;
    }
    show(message: string, messageType: ToastrMessageType, config?: ToastrConfig, customTemplate?: TemplateConfig) {
        message = this.getMessage(message);
        let hideConfig: ToastrHideConfig = { toastrConfig: toastrConfig, hideFunc: this.baseHide.bind(this) }; 
        var toastrConfig = config ? { ...config, ...{ messageType: messageType, message: message } } : { ...this.defaultConfig, ...{ messageType: messageType, message: message } };
        var template = customTemplate || this.getDefaultTemplate(config, hideConfig);
        this.createRoot();
        var domManipulation = this.createElement(this.rootElement.element, 'div', template.div, toastrConfig, 0, {});
        hideConfig.domManipulation = domManipulation;
        hideConfig.toastrConfig = toastrConfig;
        if (this.designClass.showClass)
            domManipulation.addOrRemoveClass(this.designClass.showClass);
        
        if (!config || (config && !config.autoHideDisable))
            this.hide(domManipulation, toastrConfig);
        this.domManipulations.push(domManipulation);
    }

    createRoot() {
        if (!this.rootElement)
            this.rootElement = this.createElement(document.body, "div", {}, {}, 0, {});
    }

    hide(domManipulation: DomManipulation, toastrConfig: ToastrConfig) {
        setTimeout(() => {
            this.baseHide(domManipulation, toastrConfig);            
        }, toastrConfig.timeOut);
    }

    private baseHide(domManipulation: DomManipulation, toastrConfig: ToastrConfig){
        if (this.designClass.hideClass) {
            domManipulation.addOrRemoveClass(this.designClass.showClass, false);
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
        }, 50);
    }
}