import { RxTranslateConfig } from "../interface/rx-translate-config";
import { Injector } from "@angular/core";
import { TranslationLoader } from "../interface/translation-loader";
export const translateConfigContainer:
    {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
        resolver: Function;
        ngxTranslate: any;
        customLoader: TranslationLoader;
    } = new (class {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
        resolver: Function;
        ngxTranslate: any;
        customLoader: TranslationLoader;
    })();