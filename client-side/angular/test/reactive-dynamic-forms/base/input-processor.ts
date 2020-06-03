import { createComponentInstance } from "./component-provider"
import { DynamicFormConfiguration } from "@rxweb/reactive-dynamic-forms";
import { tick } from '@angular/core/testing';
export function inputProcessor<T>(options: {
    dynamicFormConfiguration?: DynamicFormConfiguration,
    component:any,
    serverData: any,
    tagName: string,
    elementValue?: any,
    uiBindings?: any,
    viewMode?:string
}) {
    const fixture = createComponentInstance<T>(options.component);
    let instance: any = fixture.componentInstance;
    instance.dynamicFormConfiguration = options.dynamicFormConfiguration;
    if (options.viewMode)
        instance.viewMode = options.viewMode;
    if (options.uiBindings)
        instance.uiBindings = options.uiBindings;
    instance.serverData = options.serverData;
    instance.form
    fixture.detectChanges();
    tick(100); 
    return {
        instance: instance, 
        nativeElement: fixture.nativeElement
    }
}