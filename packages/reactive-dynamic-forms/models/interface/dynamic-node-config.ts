import { Renderer2 } from "@angular/core"
import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export interface DynamicNodeConfig {
    controlConfig: FormControlConfig;
    additionalClasses: any;
    renderer: Renderer2;
    collections: any[];
    controlConfigProcessor: any;
}