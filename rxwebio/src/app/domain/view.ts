import {ViewContainerRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef } from "@angular/core"

export interface ComponentType<T> {
    new (...args: any[]): T;
}

export class ComponentView<T> {
    private component: ComponentType<T>;
    private viewContainerRef: ViewContainerRef;
    private componentFactoryResolver: ComponentFactoryResolver;
    private componentRef: ComponentRef<T>;

    constructor(_component: ComponentType<T>, _viewContainerRef: ViewContainerRef, _componentFactoryResolver: ComponentFactoryResolver) {
        this.component = _component;
        this.viewContainerRef = _viewContainerRef;
        this.componentFactoryResolver = _componentFactoryResolver;
    }

    create(params?: {
        [key: string]: any;
    }): void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, this.viewContainerRef.parentInjector);
        if (params)
            this.setParams(params);
    }

    private setParams(params: {
        [key: string]: any;
    }): void {
        let propNames = Object.getOwnPropertyNames(params);
        for (let key of propNames) {
            this.componentRef.instance[key] = params[key];
        }
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
