import { createComponentInstance } from "./component-provider"
import { DynamicFormBuildConfig } from "@rxweb/reactive-dynamic-forms";
import { tick } from '@angular/core/testing';
export function inputProcessor<T>(options: {
    dynamicFormBuildConfig?: DynamicFormBuildConfig,
    component:any,
    serverData: any,
    tagName: string,
    elementValue?: any,
    uiBindings?: any,
    viewMode?:string
}) {
    const fixture = createComponentInstance<T>(options.component);
    let instance: any = fixture.componentInstance;
    instance.dynamicFormBuildConfig = options.dynamicFormBuildConfig;
    if (options.viewMode)
        instance.viewMode = options.viewMode;
    if (options.uiBindings)
        instance.uiBindings = options.uiBindings;
    instance.serverData = options.serverData;
    fixture.detectChanges();
    tick(100); 
    return {
        instance: instance, 
        nativeElement: fixture.nativeElement
    }
}