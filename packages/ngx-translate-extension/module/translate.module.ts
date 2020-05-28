import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import {  TranslateModuleConfig, TranslateCompiler, TranslateParser, TranslateFakeCompiler, TranslateDefaultParser, MissingTranslationHandler, FakeMissingTranslationHandler, TranslateStore, USE_STORE, USE_DEFAULT_LANG, USE_EXTEND, DEFAULT_LANGUAGE, TranslateLoader } from '@ngx-translate/core';
import { TranslatePipe } from '../pipes/translate.pipe'
import { TranslateService } from '../services/translate.service'
import { TranslateDirective } from "../directives/translate.directive"
import { TranslateLoaderExtension } from '../services/translate-loader-extension';
import { RouterModule } from '@angular/router';
import { RequestState } from '../services/request.state';
import { CUSTOM_LOADER } from '../const/app.const';
import { RxTranslateModule } from '@rxweb/translate';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        TranslatePipe,
        TranslateDirective
    ],
    imports: [RouterModule, RxTranslateModule, HttpClientModule],
    exports: [
        TranslatePipe,
        TranslateDirective,
        RxTranslateModule
    ]
})
export class TranslateModule {
    constructor(injector: Injector) {
        
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
                config.loader ? { provide: CUSTOM_LOADER, useClass: (<any>config.loader).useClass } : { provide: CUSTOM_LOADER, useValue: null },
                { provide: "singleton", useValue: true},
                TranslateService,
                RequestState
          ]
        };
    }

    static forChild(config: TranslateModuleConfig  = {}): ModuleWithProviders<TranslateModule> {
        return {
            ngModule: TranslateModule,
            providers: []
        };
    }
}
