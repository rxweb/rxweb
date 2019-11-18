import { DomManipulation, TemplateConfig, ElementConfig } from "@rxweb/dom"
import { BaseDomProvider } from "../core/base-dom-provider";
import { DialogClick } from './dialog-click'
import { TemplateCategory } from '../enums/template-category'
import { DialogClass, DialogButtonClass } from "./dialog-class-config";
import { OverlayDesign } from '../models/overlay-design'
import { getDefaultTemplate } from "./dialog.template";
import { DialogViewMode } from "./dialog-view-mode";
import { DialogConfig } from "./dialog-config";

export abstract class Dialog extends BaseDomProvider {
    private domManipulation: DomManipulation;
    private overLayElement: DomManipulation;
    designClass: DialogClass;
    defaultConfig: DialogConfig;
    constructor() {
        super();
        this.designClass = new DialogClass();
        this.designClass.button = new DialogButtonClass();
        this.defaultConfig = new DialogConfig();
        this.designClass.overlay = new OverlayDesign();
    }

    protected getDefaultTemplate() {
        return getDefaultTemplate(this.designClass);
    }

    show(message: string | DialogConfig, viewMode: DialogViewMode, template?: TemplateConfig): Promise<any> {
        let promise = new Promise<DialogClick>((resolve, reject) => {
            var events = this.getEvents(resolve);
            var template = template || this.getDefaultTemplate();
            var data: any;
            if (message instanceof DialogConfig)
                data = { ...message, ...{ viewMode: viewMode } };
            else
                data = {
                    ...this.defaultConfig, ...{ text: { ...this.defaultConfig.text, ...{ message: message }  } }, ...{ viewMode: viewMode }
                };
            if (this.designClass.overlay.class || this.designClass.overlay.style)
                this.overLayElement = this.createElement(document.body, 'div', { class: this.designClass.overlay.class, style: this.designClass.overlay.style }, {}, 0, {});
            this.domManipulation = this.createElement(document.body, 'div', template.div, data, 0, events);
        });
        return promise;
    }

    protected getEvents(resolve: Function) {
        return { ok: () => resolve(DialogClick.Ok), cancel: () => resolve(DialogClick.Cancel), save: () => resolve(DialogClick.Save), dontsave: () => resolve(DialogClick.DontSave) };
    }

    hide() {
        this.removeChildren(this.overLayElement.element);
        this.removeChildren(this.domManipulation.element);

    }
}