import { RxTranslateConfig } from "../interface/rx-translate-config";
import { Injector } from "@angular/core";
export const translateConfigContainer:
    {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
    } = new (class {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
    })();