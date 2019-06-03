import { Directive, ViewContainerRef, TemplateRef, Input, ElementRef, Renderer } from "@angular/core";
import { FormControlConfig } from "../form-control-config";
import { ReactiveFormConfig } from "../../util/reactive-form-config"

@Directive({
    selector: '[rxwebError]'
})
export class RxwebErrorMessageDirective {
    private _cssConfig: any;
    private element: any;
    private showValidMarkOnControl: boolean = false;
    private bindingErrorMessage: boolean = true;
    @Input() formControl: any;

    @Input('rxwebError') set errorMessage(value: string) {
        if (value) {
            if (!this.isNodeElement() && ReactiveFormConfig.dynamicForm.showingErrorMessage) {
                this.renderer.setElementProperty(this.element, "innerText", value);
                this.renderer.setElementStyle(this.element, "display", "");
                this.element.style.display = "";
            }
            if (!ReactiveFormConfig.dynamicForm.showingErrorMessage && this.element.nodeName == "SPAN" && this.element.style.display == "")
                this.renderer.setElementStyle(this.element, "display", "none");
            this.renderer.setElementClass(this.element, this.getClassName(true), false);
            this.renderer.setElementClass(this.element, this.getClassName(false), true);
        }
        else {
            if (!this.isNodeElement() && ReactiveFormConfig.dynamicForm.showingErrorMessage) {
                this.renderer.setElementProperty(this.element, "innerText", value);
                this.renderer.setElementStyle(this.element, "display", "none");
            }

            this.renderer.setElementClass(this.element, this.getClassName(false), false);
            if (!this.formControl || (this.formControl && this.formControl.valid && this.formControl.value != null && this.showValidMarkOnControl))
                this.renderer.setElementClass(this.element, this.getClassName(true), true);
        }
    }



    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement as Node
        this._cssConfig = ReactiveFormConfig.activeUiFramework.cssClasses;
        this.showValidMarkOnControl = ReactiveFormConfig.activeUiFramework.showValidMarkOnControl;
    }


    isNodeElement() {
        let isNodeElement: boolean = false;
        let className: string = '';
        switch (this.element.nodeName) {
            case 'TEXTAREA':
            case 'SELECT':
            case 'INPUT':
                isNodeElement = true;
                break;
        }
        return isNodeElement;
    }

    getClassName(isValid: boolean) {
        let className: string = '';
        switch (this.element.nodeName) {
            case 'TEXTAREA':
            case 'SELECT':
            case 'INPUT':
                className = (isValid) ? this._cssConfig.controlValid : this._cssConfig.controlInvalid;
                break;
            default:
                className = (isValid) ? this._cssConfig.validMessage : this._cssConfig.invalidMessage;
        }
        return className;

    }


}