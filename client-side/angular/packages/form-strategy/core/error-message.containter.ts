import { FormErrorMessageModuleConfig } from "../interface/form-error-message-module-config";
import { Injector } from "@angular/core";

export const errorMessageContainer:
    {
        injector: Injector;
        data: { [key: string]: any };
        config: FormErrorMessageModuleConfig;
    } = new (class {
        config: FormErrorMessageModuleConfig;
        data: { [key: string]: any }
        injector: Injector;
    })();
