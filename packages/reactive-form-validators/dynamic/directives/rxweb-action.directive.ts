import { Directive, ViewContainerRef, TemplateRef, Input, ElementRef, Renderer } from "@angular/core";
import { FormControlConfig } from "../form-control-config";
import { ReactiveFormConfig } from "../../util/reactive-form-config"

@Directive({
    selector: '[rxwebAction]'
})
export class RxwebActionDirective {
    private _cssConfig: any;
    element: any;

    @Input() hideIfNoValue: string;

    @Input('rxwebAction') attributeNames: string[];

    @Input() set controlConfig(value: FormControlConfig) {
        this._controlConfig = value;
        this.bindAttributes();
    }

    get controlConfig() {
        return this._controlConfig;
    }

      constructor(private renderer: Renderer, private elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement as Node
        this._cssConfig = ReactiveFormConfig.activeUiFramework.cssClasses;
        this.setControlClass();
    }

    private setControlClass() {
        let controlName: string = '';
        switch (this.element.nodeName) {
            case 'TEXTAREA':
            case 'SELECT':
            case 'INPUT':
                controlName = (this.element.type) ? this.element.type.toLowerCase() : this.element.nodeName.toLowerCase();
                this.setDefaultCssClass(controlName);
                break;
        }
        return controlName;

    }

    setDefaultCssClass(controlName: string) {
        var classes: string[] = []
        switch (controlName) {
            case 'radio':
            case 'checkbox':
                classes = [this._cssConfig.checkBoxAndRadioControl];
                break;
            case 'file':
                classes = [this._cssConfig.fileControl];
                break;
            case 'range':
                classes = [this._cssConfig.rangeControl];
                break;
            default:
                classes = [this._cssConfig.defaultControl]
                break;
        }
        this.process('cssClassNames', classes);
    }
    bindAttributes() {
        if (this._controlConfig && this.attributeNames && Array.isArray(this.attributeNames)) {
            this.attributeNames.forEach(t => {
                if (this.controlConfig[t])
                    this.process(t, this.controlConfig[t]);
                if (this._cssConfig[t])
                    this.process('cssClassNames', [this._cssConfig[t]]);
                if (t == "group") {
                    let classNames = [];
                    switch (this.controlConfig.viewMode) {
                        case "bootstrap-basic":
                            classNames.push("form-group");
                            break;
                        case "bootstrap-horizontal":
                            classNames.push("form-group");
                            classNames.push("row");
                            break;
                        case "bootstrap-advance":
                            if (this.controlConfig.config && this.controlConfig.config.ui && this.controlConfig.config.ui.formGrid) {
                                let formGrid = this.controlConfig.config.ui.formGrid;
                                if (formGrid.column) {
                                    let classNames = this.getCssClasses(formGrid.column)
                                    this.process('cssClassNames', classNames, this.element.parentElement.parentElement);
                                }
                            }
                            break;
                    }
                }
                if (t == "label" && this.controlConfig.viewMode == "bootstrap-horizontal" && this.controlConfig.config && this.controlConfig.config.ui && this.controlConfig.config.ui.formGrid) {
                    let formGrid = this.controlConfig.config.ui.formGrid;
                    let cssClasses: string[] = [];
                    if (formGrid.label)
                        cssClasses = this.getCssClasses(formGrid.label);
                    else
                        cssClasses.push('col-md-2');
                    this.process('cssClassNames', cssClasses);
                }
                if (!this.controlConfig[t] && !this._cssConfig[t]) {
                    let cssClasses: string[] = [];
                    let splitText = t.split('.');
                    if (splitText.length > 1) {
                        let jObject = undefined
                        splitText.forEach(x => {
                            if (!jObject)
                                jObject = this.controlConfig.config.ui ? this.controlConfig.config.ui[x] : undefined;
                            else
                                jObject = jObject[x];
                            return jObject != undefined;
                        })
                        let cssClasses = jObject ? this.getCssClasses(jObject) : [];
                        this.process('cssClassNames', cssClasses);
                    }
                }
            })
        }
        this.subscribe();
    }

    private getCssClasses(jObject: { [key: string]: any }) {
        let cssClasses = [];
        Object.keys(jObject).forEach(t => {
            cssClasses.push(t !== "es" ? `col-${t}-${jObject[t]}` : `col-${jObject[t]}`)
        })
        return cssClasses;
    }


    subscribe() {
        this._controlConfig.onAttributeValueChange(this.attributeNames, (name, value) => {
            this.process(name, value);
        })
        if (this.hideIfNoValue && !this.controlConfig[this.hideIfNoValue])
            this.element.style.display = "none";
    }

    process(name: string, value: any, element: any = null) {
        switch (name) {
            case 'focus':
                if (value)
                    this.invokeMethod(name, []);
                break;
            case 'description':
            case 'label':
                this.createText(value);
                break;
            case 'readonly':
                if (value) {
                    this.setOrUpdateAttribute(name, value);
                    if (this.controlConfig.isPlainTextMode) {
                        this.renderer.setElementClass(this.element, this._cssConfig.defaultControl, false)
                        this.renderer.setElementClass(this.element, this._cssConfig.readOnlyPlainText, true);
                    }
                }
                else {
                    this.setOrUpdateAttribute(name, null);
                    if (this.controlConfig.isPlainTextMode) {
                        this.renderer.setElementClass(this.element, this._cssConfig.readOnlyPlainText, false);
                        this.renderer.setElementClass(this.element, this._cssConfig.defaultControl, true)
                    }
                }
                break;
            case 'cssClassNames':
                if (value.oldClassNames)
                    value.oldClassNames.forEach(t => this.renderer.setElementClass(this.element, t, false));
                if (value.newClassNames)
                    value.newClassNames.forEach(t => this.renderer.setElementClass(this.element, t, true));
                if (Array.isArray(value))
                    value.forEach(t => this.renderer.setElementClass(element || this.element, t, true));
                break;
            default:
                this.setOrUpdateAttribute(name, value);
        }
    }

    createText(text: string) {
        this.renderer.createText(this.element, text);
    }

    invokeMethod(eventName: string, values: string[]) {
        this.renderer.invokeElementMethod(
            this.element, eventName, values);
    }

    setOrUpdateAttribute(attributeName: string, value: any) {
        this.renderer.setElementAttribute(this.element, attributeName, value);
    }

    private _controlConfig: FormControlConfig;
}