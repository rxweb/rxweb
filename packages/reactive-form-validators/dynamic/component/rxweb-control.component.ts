import {EventEmitter,OnDestroy,QueryList,ViewChild,ComponentFactoryResolver, Component, ViewContainerRef, OnInit, Input } from "@angular/core"
import { FormGroup, FormArray } from "@angular/forms"
import { DynamicReactiveFormConfig } from '../dynamic-reactive-form-config'
import { FormControlConfig } from '../form-control-config'
import { ControlTemplateDirective } from '../directives/control-template.directive'

const CONTROL_CONTAINER: string = "controlContainer";
const FORM_ARRAY: string = "formArray";
const FORM_GROUP: string = "formGroup";
const SECTION_CONFIG: string = "sectionConfig";
const CONFIGS: string = "configs";
const FORM_CONTROL: string = "formControl";
const CONTROL_CONFIG: string = "controlConfig";
const VALUE: string = "value";

@Component({
    selector: 'rxweb-control',
    template: `
        <ng-template #controlContainer></ng-template>
    `
})
export class RxWebControlComponent implements OnInit, OnDestroy {
    @ViewChild(CONTROL_CONTAINER, { read: ViewContainerRef }) controlContainerRef: ViewContainerRef;
    @Input() formControlConfig: FormControlConfig;
    @Input() sectionConfig: any;

    @Input() name: string;
    @Input() formGroup: FormGroup;
    @Input() formArray: FormArray;
    @Input() configs: any;
    @Input() controlTemplates: QueryList<ControlTemplateDirective>;

    private componentRef: any;
    private isCleared: boolean = false;
    private componentConfig: any;
    private eventSubscriptions: any[];

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
                this.componentRef = this.controlContainerRef.createEmbeddedView(controlTemplate.templateRef, jObject);
                this.overrideValueProp();
                this.formControlConfig.onHide = this.onHide;
            }else
                this.createInstance();
        } 
    }

    private createInstance() {
        this.componentRef = this.controlContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.componentConfig.component))
        if (this.formControlConfig) {
            this.setFieldConfigParams(this.componentRef.instance);
            this.subscribeEvents(this.componentRef.instance);
            this.overrideValueProp();
            this.formControlConfig.onHide = this.onHide;
        }
        if (this.sectionConfig)
            this.setSectionConfigParams();
        this.isCleared = false;
    }

    private subscribeEvents(instance: any) {
        if (this.formControlConfig && this.formControlConfig.events) {
            this.eventSubscriptions = new Array<any>();
            for (var columnName in this.formControlConfig.events) {
                if (instance[columnName] instanceof EventEmitter) {
                    let observe = (<EventEmitter<any>>instance[columnName]).asObservable();
                    this.eventSubscriptions.push(observe.subscribe(t => { this.formControlConfig.events[columnName].call(this.formControlConfig, t); }))
                }
            }
        }
        
    }

    private setSectionConfigParams() {
        this.componentRef.instance[FORM_ARRAY] = this.formArray;
        this.componentRef.instance[FORM_GROUP] = this.formGroup;
        this.componentRef.instance[SECTION_CONFIG] = this.sectionConfig;
        this.componentRef.instance[CONFIGS] = this.configs;
    }
    private setFieldConfigParams(instance: {[key:string]:any}) {
        for (let param in this.formControlConfig.inputs)
            this.addParams(instance, param, this.formControlConfig.inputs);
        instance[FORM_CONTROL] = this.formControlConfig.formControl;
        instance[CONTROL_CONFIG] = this.formControlConfig;
    }

    overrideValueProp() {
        let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.formControlConfig), VALUE);
        Object.defineProperty(this.formControlConfig, VALUE, {
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
            this.controlContainerRef.clear();
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

    ngOnDestroy() {
        if (this.eventSubscriptions) 
            this.eventSubscriptions.forEach(t => t.unsubscribe());
        this.eventSubscriptions = [];
        if (this.controlContainerRef) 
            this.controlContainerRef.clear();
        this.controlContainerRef = undefined;
    }
}