import { ComponentGuard } from "../resolver/component-multilingual";
import { NgModule, ModuleWithProviders, Inject } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";

import { RxTranslateDirective } from "../directives/rx-translate.directive";
import { BaseResolver } from "../resolver/base-resolver";
import { overrideProperty } from "../functions";
import { RouterModule } from "@angular/router";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { translateConfigContainer } from "../core/translate-config-container";

@NgModule({
    imports: [RouterModule],
    declarations: [RxTranslateDirective],
    providers: [ComponentGuard],
    exports: [RxTranslateDirective],
})
export class RxTranslateModule {
    constructor(@Inject("config") config: RxTranslateConfig) {
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
    static forRoot(config?: RxTranslateConfig): ModuleWithProviders {
        return {
            ngModule: RxTranslateModule,
            providers: [
                ComponentGuard,
                { provide: "config", useValue: config }
            ]
        };
    }

    static changeLanguage(languageCode: string): void {
        translateConfigContainer.config.languageCode = languageCode;
        var baseResolver = new BaseResolver(translateConfigContainer.config);
        baseResolver.languageChanged();
    }

    static tranlate(text: string, data: { [key: string]: any }) {
        let extractor = extract(['{', '}']);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{${key}}`, getValue(key, data));
        })
        return text;
    }
}