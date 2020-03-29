import { ComponentGuard } from "../resolver/component-multilingual";
import { NgModule, ModuleWithProviders, Inject } from "@angular/core";
import { RxTranslateConfig } from "../interface/rx-translate-config";
import { translateContainer } from "../core/translate-container";
import { RxTranslateDirective } from "../directives/rx-translate.directive";
import { BaseResolver } from "../resolver/base-resolver";
import { overrideProperty } from "../functions";
import { MultiLingualData } from "../core/multilingual-data";

@NgModule({
    declarations: [RxTranslateDirective],
    providers: [ComponentGuard],
    exports: [RxTranslateDirective],
})
export class RxTranslateModule {
    static config: RxTranslateConfig = null;
    constructor(@Inject("config") config: RxTranslateConfig) {
        RxTranslateModule.config = config;
        if (!RxTranslateModule.config.languageCode)
            RxTranslateModule.config.languageCode = "en";
        if (config.globalFilePath) {
            let translateConfig = { config: { name: 'global', filePath: config.globalFilePath }, instance: null }; 
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

    static changeLanguage(language: string): void {
        RxTranslateModule.config.languageCode = language;
        let keys = MultiLingualData.getActiveKeys();
        this.changeTranslation(keys, 0);
    }

    static tranlate(text: string, keys: { [key: string]: any }) {
        Object.keys(keys).forEach(t => {
            text.split(`#${t}`).join(keys[t]);
        })
    }

    private static changeTranslation(keys, index) {
        if (keys.length > index) {
            var baseResolver = new BaseResolver(RxTranslateModule.config);
            baseResolver.resolveByName(keys[index]).then(x => {
                let nextIndex = index + 1;
                this.changeTranslation(keys, nextIndex);
            });
        }
    }
}