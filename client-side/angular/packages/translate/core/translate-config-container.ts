import { RxTranslateConfig } from "../interface/rx-translate-config";
import { Injector } from "@angular/core";
import { TranslationLoader } from "../interface/translation-loader";
import { HttpClient } from "@angular/common/http";
export const translateConfigContainer:
    {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
        resolver: Function;
        ngxTranslate: any;
        customLoader: TranslationLoader;
        httpClient: HttpClient;
    } = new (class {
        config: RxTranslateConfig;
        loading: boolean;
        injector: Injector;
        activePageTranslationName: string;
        resolver: Function;
        ngxTranslate: any;
        customLoader: TranslationLoader;
        httpClient: HttpClient;
    })();