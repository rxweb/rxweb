import { ViewContainerRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from "@angular/core"
import { FormControlConfig } from '../../services/form-control-config'
import { DynamicFormBuildConfig } from "@rxweb/reactive-dynamic-forms"
export interface ComponentType<T> {
    new (...args: any[]): T;
}

export class ComponentView<T> {
    private component: ComponentType<T>;
    private viewContainerRef: ViewContainerRef;
    private componentFactoryResolver: ComponentFactoryResolver;
    private componentRef: ComponentRef<T>;

    constructor(_component: ComponentType<T>, _viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver,private formControlConfig:FormControlConfig,private dynamicFormBuildConfig:DynamicFormBuildConfig) {
        this.component = _component;
        this.viewContainerRef = _viewContainerRef;
        this.componentFactoryResolver = _componentFactoryResolver;
    }

    create(): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, this.viewContainerRef.parentInjector);
        this.setParams(this.componentRef.instance);
    }

    private setParams(instance: { [key: string]: any }) {
        if (this.formControlConfig.inputs) {
            let propNames = Object.getOwnPropertyNames(this.formControlConfig.inputs);
            for (let propName of propNames) 
                this.overridePropAndSetValue(instance, propName, this.formControlConfig.inputs);
        }
        instance["controlConfig"] = this.formControlConfig;
        instance["dynamicFormBuildConfig"] = this.dynamicFormBuildConfig;
    }

    overridePropAndSetValue(instance: any, propName: string, inputs: any) {
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

    rootNode(): HTMLElement {
        return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    getComponentRef(): ComponentRef<any> {
        return this.componentRef;
    }

    destroy():void {
        if (this.componentRef)
        {
            this.componentRef.destroy();
            this.componentRef = undefined;
        }
    }
}