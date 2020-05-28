import { TranslateService as TranslateServiceExtension, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, USE_DEFAULT_LANG, USE_STORE, USE_EXTEND } from "@ngx-translate/core";
import { TranslationResolver, RxTranslation } from "@rxweb/translate"
import { Inject, Injectable } from '@angular/core';
import { RequestState } from './request.state';
import { CUSTOM_LOADER } from '../const/app.const';
import { Observable } from 'rxjs';

@Injectable()
export class TranslateService extends TranslateServiceExtension {
    private changeLangFunc: Function;
    private extendExtension: boolean;
    private isInternal: boolean = false;
    isolateSubscriptions: { [key: string]: Observable<any> } = {};
    constructor(public store: TranslateStore,
        public currentLoader: TranslateLoader,
        public compiler: TranslateCompiler,
        public parser: TranslateParser,
        public missingTranslationHandler: MissingTranslationHandler,
        @Inject(USE_DEFAULT_LANG) useDefaultLang: boolean = true,
        @Inject(USE_STORE) isolate: boolean = false,
        @Inject(USE_EXTEND) extend: boolean = false,
        @Inject("singleton") singleton: boolean = false,
        private rxTranslation: RxTranslation,
        private requestState: RequestState,
        private translationResolver: TranslationResolver,
        @Inject(CUSTOM_LOADER) public customLoader?: TranslateLoader
    ) {
        super(store, currentLoader, compiler, parser, missingTranslationHandler, useDefaultLang, isolate, extend, null);
        this.defineProperty();
        this.extendExtension = extend;
        if (singleton) {
            this.translationResolver.ngxTranslate = this;
        }
        this["updateLangs"] = (lang) => { this.updateLanguages(lang); };
        this.translationResolver.resolver = this.storeResolve.bind(this);
    }
    languageCode: string;


    changeLanguage(lang: string, onComplete: Function) {
        if (this.translationResolver.activeTranslationsLength > 1) {
            if (lang != this.languageCode && !this.translationResolver.pending) {
                this.languageCode = lang;
                this.rxTranslation.change(lang, () => {
                    onComplete();
                })
            }
            else if (this.translationResolver.pending) {
                let time = setTimeout(() => { clearTimeout(time); this.changeLanguage(lang, onComplete); }, 5);
            }
            else
                onComplete();
        }
        else {
            onComplete();
        }
    }

    get translations() {
        return this.store.translations;
    }

    defineProperty() {
        Object.defineProperty(this, "pending", {
            get: () => this.requestState.pending,
            set: (value) => this.requestState.pending = value,
            enumerable: true,
            configurable: true
        })

        Object.defineProperty(this, "loadingTranslations", {
            get: () => this.requestState.loadingTranslations,
            set: (value) => this.requestState.loadingTranslations = value,
            enumerable: true,
            configurable: true
        })
    }

    setDefaultLang(language: string) {
        this.updateLanguages(language);
        return super.setDefaultLang(language);
    }

    useByTranslationName(translationName: string, languageCode: string) {
        return super.use(`${translationName}_${languageCode}`).subscribe(t => {

        });
    }

    use(language: string) {
        this.updateLanguages(language)
        return super.use(language)
    }

    private updateLanguages(language: string) {
        if (language && (!this.translationResolver.activeLanguage || this.translationResolver.activeLanguage != language))
            if (!this.isInternal)
                this.translationResolver.activeLanguage = language;
        if ((language && this.translationResolver.allowedLanguages.indexOf(language) === -1)) {
            this.translationResolver.allowedLanguages.push(language);
            this.addLangs([language]);
        }
    }

    private storeResolve(name: string, data: any) {
        data = this.compiler.compileTranslations(data, this.currentLang);
        this.translations[name] = data;
        return data;
    }
}
