import { NgModule, ModuleWithProviders, Injector, Inject } from '@angular/core';
import { TranslateCompiler, TranslateParser, TranslateFakeCompiler, TranslateDefaultParser, MissingTranslationHandler, FakeMissingTranslationHandler, TranslateStore, USE_STORE, USE_DEFAULT_LANG, USE_EXTEND, DEFAULT_LANGUAGE, TranslateLoader } from '@ngx-translate/core';
import { TranslateModuleConfig } from '../interface/translate-module-config'
import { TranslatePipe } from '../pipes/translate.pipe'
import { TranslateService } from '../services/translate.service'
import { TranslateDirective } from "../directives/translate.directive"
import { TranslateLoaderExtension } from '../services/translate-loader-extension';
import { RouterModule } from '@angular/router';
import { RequestState } from '../services/request.state';
import { CUSTOM_LOADER, NGX_TRANSLATE_EXTENSION_CONFIG } from '../const/app.const';
import { RxTranslateModule, TranslationResolver } from '@rxweb/translate';
import { HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from "../services/translate-http-loader"
import { configContainer } from '../const/config.container';

@NgModule({
    declarations: [
        TranslatePipe,
        TranslateDirective
    ],
    imports: [RouterModule.forChild([]),
        RxTranslateModule, HttpClientModule],
    exports: [
        TranslatePipe,
        TranslateDirective,
        RxTranslateModule
    ]
})
export class TranslateModule {
    constructor(translateService: TranslateService, @Inject(NGX_TRANSLATE_EXTENSION_CONFIG) config: TranslateModuleConfig, translationResolver: TranslationResolver) {
        configContainer.config = config;
        if (config.controlErrorMessage)
            translationResolver.controlErrorMessage = config.controlErrorMessage
    }
    static forRoot(config: TranslateModuleConfig = {}): ModuleWithProviders<TranslateModule> {
        return {
            ngModule: TranslateModule,
            providers: [
                TranslateStore,
                { provide: TranslateLoader, useClass: TranslateLoaderExtension },
                config.compiler || { provide: TranslateCompiler, useClass: TranslateFakeCompiler },
                config.parser || { provide: TranslateParser, useClass: TranslateDefaultParser },
                config.missingTranslationHandler || { provide: MissingTranslationHandler, useClass: FakeMissingTranslationHandler },
                { provide: USE_STORE, useValue: config.isolate },
                { provide: USE_DEFAULT_LANG, useValue: config.useDefaultLang },
                { provide: USE_EXTEND, useValue: config.extend },
                { provide: DEFAULT_LANGUAGE, useValue: config.defaultLanguage },
                config.loader && !(<any>config.loader).useFactory ? { provide: CUSTOM_LOADER, useClass: (<any>config.loader).useClass } : config.loader && (<any>config.loader).useFactory ? { provide: CUSTOM_LOADER, useFactory: (<any>config.loader).useFactory, deps: (<any>config.loader).deps } : { provide: CUSTOM_LOADER, useClass: TranslateHttpLoader },
                { provide: "singleton", useValue: true },
                {
                    provide: "rxTranslateConfig",
                    useValue: {
                        forNgxTranslate: true,
                        cacheLanguageWiseObject: true,
                    }
                },
                {
                    provide: NGX_TRANSLATE_EXTENSION_CONFIG, useValue: config || {}
                },
                TranslateService,
                RequestState
            ]
        };
    }

    static forChild(config: TranslateModuleConfig = {}): ModuleWithProviders<TranslateModule> {
        return {
            ngModule: TranslateModule,
            providers: []
        };
    }
}
