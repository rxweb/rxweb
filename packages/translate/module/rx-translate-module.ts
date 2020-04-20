import { ComponentGuard } from "../resolver/component-multilingual";
import { NgModule, ModuleWithProviders, Inject } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";

import { RxTranslateDirective } from "../directives/rx-translate.directive";
import { BaseResolver } from "../resolver/base-resolver";
import { overrideProperty } from "../functions";
import { RouterModule } from "@angular/router";

import { translateConfigContainer } from "../core/translate-config-container";
import { RxTranslation } from "../service/rx-translation";
import { RX_TRANSLATE_CONFIG } from "../core/rx-translate-config.const";

@NgModule({
    imports: [RouterModule],
    declarations: [RxTranslateDirective],
    providers: [ComponentGuard, RxTranslation],
    exports: [RxTranslateDirective],
})
export class RxTranslateModule {
    constructor(@Inject(RX_TRANSLATE_CONFIG) config: RxTranslateConfig) {
        translateConfigContainer.config =  config;
        if (!translateConfigContainer.config.languageCode)
            translateConfigContainer.config.languageCode = "en";
        if (config.globalFilePath) {
            let translateConfig = { config: { translationName: 'global', filePath: config.globalFilePath }, instance: null }; 
            var baseResolver = new BaseResolver(config);
            baseResolver.resolveGlobal(translateConfig);
        }
        overrideProperty();
    }
    static forRoot(config?: RxTranslateConfig): ModuleWithProviders<RxTranslateModule> {
        return {
            ngModule: RxTranslateModule,
            providers: [
                ComponentGuard, RxTranslation,
                { provide: RX_TRANSLATE_CONFIG, useValue: config }
            ]
        };
    }

    
}