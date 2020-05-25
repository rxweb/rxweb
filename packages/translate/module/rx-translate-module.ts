import { ComponentGuard } from "../resolver/component-multilingual";
import { NgModule, ModuleWithProviders, Inject } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";

import { RxTranslateDirective } from "../directives/rx-translate.directive";
import { BaseResolver } from "../resolver/base-resolver";
import { overrideProperty } from "../functions";
import { RouterModule } from "@angular/router";

import { translateConfigContainer } from "../core/translate-config-container";
import { RxTranslation } from "../service/rx-translation";
import { RX_TRANSLATE_CONFIG, CUSTOM_LOADER } from "../core/rx-translate-config.const";
import { overrideErrorsProperty } from "../functions/override-errors-property";
import { TranslationResolver } from "../core/translation-resolver";
import { HttpClientModule, HttpClient } from "@angular/common/http";

@NgModule({
    imports: [RouterModule, HttpClientModule],
    declarations: [RxTranslateDirective],
    providers: [ComponentGuard, RxTranslation, TranslationResolver],
    exports: [RxTranslateDirective],
})
export class RxTranslateModule {
    constructor(@Inject(RX_TRANSLATE_CONFIG) config: RxTranslateConfig, httpClient: HttpClient) {
        if (!translateConfigContainer.config) {
            translateConfigContainer.config = config;
            if (!translateConfigContainer.config.languageCode)
                translateConfigContainer.config.languageCode = "en";
            let translateConfig = { config: { translationName: 'global', filePath: config.globalFilePath }, instance: null };
            var baseResolver = new BaseResolver(config, httpClient);
            baseResolver.resolveGlobal(translateConfig);
            overrideProperty();
            if (config.controlErrorMessage)
                overrideErrorsProperty(config.controlErrorMessage);
        }

    }
    static forRoot(config?: RxTranslateConfig): ModuleWithProviders<RxTranslateModule> {
        return {
            ngModule: RxTranslateModule,
            providers: [
                ComponentGuard, RxTranslation,
                { provide: RX_TRANSLATE_CONFIG, useValue: config },
                config.loader ? { provide: CUSTOM_LOADER, useClass: <any>config.loader } : { provide: CUSTOM_LOADER, useValue: null },
            ]
        };
    }


}