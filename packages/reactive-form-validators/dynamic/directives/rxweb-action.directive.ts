import { Directive, ViewContainerRef, TemplateRef, Input,ElementRef,Renderer} from "@angular/core";
import { FormControlConfig } from "../form-control-config";

@Directive({
    selector: '[rxwebAction]'
})
export class RxwebActionDirective {
    element: Node;

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
    }


    bindAttributes() {
        if (this._controlConfig && this.attributeNames && Array.isArray(this.attributeNames)) {
            this.attributeNames.forEach(t => {
                this.process(t, this.controlConfig[t]);
            })
        }
        this.subscribe();
    }

    subscribe() {
        this._controlConfig.onAttributeValueChange = (name, value) => {
            this.process(name, value);
        }

    }

    process(name: string, value: any) {
        switch (name) {
            case 'focus':
                if(value)
                    this.invokeMethod(name, []) ;
                break;
            case 'description':
            case 'label':
                this.createText(value);
                break;
            case 'readonly':
                if (value)
                    this.setOrUpdateAttribute(name, value);
                else
                    this.setOrUpdateAttribute(name, null);
                break;
            case 'cssClassNames':
                if (value.oldClassNames)
                    value.oldClassNames.forEach(t => this.renderer.setElementClass(this.element, t, false));
                if(value.newClassNames)
                    value.newClassNames.forEach(t => this.renderer.setElementClass(this.element, t, true));
                if (Array.isArray(value))
                    value.forEach(t => this.renderer.setElementClass(this.element, t, true));
                break;
            default:
                this.setOrUpdateAttribute(name, value);
        }
    }

    createText(text:string) {
        this.renderer.createText(this.element, text);
    }

    invokeMethod(eventName:string,values:string[]) {
        this.renderer.invokeElementMethod(
            this.element, eventName, values);
    }

    setOrUpdateAttribute(attributeName: string, value: any) {
        this.renderer.setElementAttribute(this.element, attributeName, value);
    }

    private _controlConfig: FormControlConfig;
}