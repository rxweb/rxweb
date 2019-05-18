import {QueryList,ViewChild,ComponentFactoryResolver, Component, ViewContainerRef, OnInit, Input } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { DynamicReactiveFormConfig } from '../dynamic-reactive-form-config'
import { FormControlConfig } from '../form-control-config'
import { ControlTemplateDirective } from './directives/control-template.directive'
@Component({
    selector: 'app-column',
    template: `
        <ng-template #container></ng-template>
    `
})
export class RxWebControlComponent implements OnInit {
    @ViewChild('container', { read: ViewContainerRef }) containerRef: ViewContainerRef;
    @Input() formControlConfig: FormControlConfig;
    @Input() sectionConfig: any;

    @Input() name: string;
    @Input() formGroup: FormGroup;
    @Input() configs: any;
    @Input() controlTemplates: QueryList<ControlTemplateDirective>;
    componentRef: any;
    isCleared: boolean = false;
    private componentConfig: any;
    constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.process();
    }

    process() {
        if (this.formControlConfig || this.sectionConfig) {
            let name = this.formControlConfig ? this.formControlConfig.config.type : this.sectionConfig ? this.name : undefined;
            this.componentConfig = DynamicReactiveFormConfig.getComponentConfig(name);
            if (!this.componentConfig && this.controlTemplates.length > 0) {
                let controlTemplate = this.controlTemplates.filter(t => t.type == name)[0];
                let jObject = {};
                this.setFieldConfigParams(jObject)
                this.componentRef = this.containerRef.createEmbeddedView(controlTemplate.templateRef, jObject);
                this.overrideValueProp();
                this.formControlConfig.onHide = this.onHide;
            }else
                this.createInstance();
        } 
    }

    private createInstance() {
        this.componentRef = this.containerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.componentConfig.component))
        if (this.formControlConfig) {
            this.setFieldConfigParams(this.componentRef.instance);
            this.overrideValueProp();
            this.formControlConfig.onHide = this.onHide;
        }
        if (this.sectionConfig)
            this.setSectionConfigParams();
        this.isCleared = false;
    }

    private setSectionConfigParams() {
        this.componentRef.instance["formGroup"] = this.formGroup;
        this.componentRef.instance["sectionConfig"] = this.sectionConfig;
        this.componentRef.instance["configs"] = this.configs;
    }
    private setFieldConfigParams(instance: {[key:string]:any}) {
        for (let param in this.formControlConfig.inputs)
            this.addParams(instance, param, this.formControlConfig.inputs);
        instance["formControl"] = this.formControlConfig.formControl;
        instance["controlConfig"] = this.formControlConfig;
    }

    overrideValueProp() {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.formControlConfig), "value");
        Object.defineProperty(this.formControlConfig, "value", {
            get: () => { return descriptor.get.call(this.formControlConfig) },
            set: (v) => {
                if (this.formControlConfig.formControl.value != v) {
                    this.formControlConfig.formControl.setValue(v);
                } else {
                    descriptor.set.call(this.formControlConfig, v);
                    this.formControlConfig.refresh();
                }
                this.formControlConfig.config.value = v;
            }
        })


    }
    onHide = () => {
        if (this.formControlConfig.hide) {
            this.containerRef.clear();
            this.isCleared = true;
        } else if (this.isCleared) {
            this.createInstance();
        }
    }

    addParams(instance: any, propName: string, inputs: any) {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(inputs), propName)
        let value = '';
        if (!descriptor) {
            value = inputs[propName];
            delete inputs[propName];
        }
        Object.defineProperty(inputs, propName, {
            get() { return (descriptor) ? descriptor.get() : value },
            set(v) { instance[propName] = v; (descriptor) ? descriptor.set.call(inputs, v) : value = v; }
        })
        instance[propName] = descriptor ? descriptor.get.call(inputs) : value;
    }
}