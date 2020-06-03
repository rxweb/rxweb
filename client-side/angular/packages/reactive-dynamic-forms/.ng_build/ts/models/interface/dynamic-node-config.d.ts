import { Renderer2 } from "@angular/core";
import { FormControlConfig } from "../../services/form-control-config";
export interface DynamicNodeConfig {
    controlConfig: FormControlConfig;
    additionalClasses: any;
    renderer: Renderer2;
    collections: any[];
    controlConfigProcessor: any;
}
