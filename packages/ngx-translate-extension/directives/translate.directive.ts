import { TranslateDirective as TranslateDirectiveNgx } from "@ngx-translate/core"
import { ElementRef, ChangeDetectorRef, ViewContainerRef, Input, Directive } from '@angular/core';
import { TranslateService } from "../services/translate.service"
import { RxTranslation, TranslationResolver, equals } from '@rxweb/translate';
import { RequestState } from '../services/request.state';
import { Subscription } from 'rxjs';
import { isObject } from '../functions/is-object';
import { UNDEFINED } from '../const/app.const';
const TRANSLATE_SERVICE: string = "translateService"
const VIEW: string = "_view";
@Directive({
    selector: '[translate],[ngx-translate]'
})
export class TranslateDirective extends TranslateDirectiveNgx {
    private component: any;
    private baseOnLangChange: Subscription;
    private currentTranslationName: string;
    private languageCode: string;

    constructor(private translateBase: TranslateService, element: ElementRef, _ref: ChangeDetectorRef, viewContainer: ViewContainerRef, private rxTranslation: RxTranslation, private requestState: RequestState, private translationResolver: TranslationResolver) {
        super(new TranslateService(translateBase.store, translateBase.currentLoader, translateBase.compiler, translateBase.parser, translateBase.missingTranslationHandler, true, true, false, false, rxTranslation, new RequestState(), translationResolver), element, _ref);
        this[TRANSLATE_SERVICE]["isInternal"] = true;
        this.subscribe();
        if (viewContainer[VIEW] && viewContainer[VIEW].component) {
            this.component = viewContainer[VIEW].component.constructor;
            this.setAndGetCurrentLang();
        }
    }

    @Input() set translateLang(value: string) {
        if (!equals(this.languageCode, value)) {
            this.checkAndSetLanguageCode({ lang: value });
            this.checkNodes(true);
        }
    }

    set translateParams(params) {
        if (!equals(this.currentParams, params)) {
            this.checkAndSetLanguageCode(params);
            this.currentParams = params;
            this.checkNodes(true);
        }
    }

    @Input() set translationName(value: string) {
        if (!equals(this.currentTranslationName, value)) {
            this.checkAndSetLanguageCode({ translationName: value });
            this.checkNodes(true);
        }
    }

    setAndGetCurrentLang(isSet: boolean = true) {
        let name = null;
        if (this.currentTranslationName) {
            if (this.currentTranslationName == "global")
                name = this.languageCode;
            else
                name = `${this.currentTranslationName}_${this.languageCode || this.translationResolver.activeLanguage}`
        } else
            name = this.translationResolver.getTranslationNameByInstance(this.component, this.languageCode);
        if (!name)
            name = this.languageCode || this.translationResolver.activeLanguage;
        if (isSet)
            this[TRANSLATE_SERVICE].currentLang = name;
        return name;
    }
    subscribe() {
        this.translateBase.onDefaultLangChange.subscribe(t => {
            this.translateBase.changeLanguage(t.lang, this.notifyDefaultLanguageChange.bind(this));
        })
        this.translateBase.onLangChange.subscribe(t => {
            this.translateBase.changeLanguage(t.lang, this.notifyChangeLanguage.bind(this))
        })

        this.translateBase.onTranslationChange.subscribe(t => {
            let name = this.setAndGetCurrentLang();
            this[TRANSLATE_SERVICE].onTranslationChange.emit({ lang: name, translations: this.translateBase.translations[name] })
        })
    }

    private notifyDefaultLanguageChange() {
        let name = this.setAndGetCurrentLang();
        this[TRANSLATE_SERVICE].onDefaultLangChange.emit({ lang: name })
    }

    private notifyChangeLanguage() {
        let name = this.setAndGetCurrentLang();
        this[TRANSLATE_SERVICE].onLangChange.emit({ lang: name, translations: this.translateBase.translations[name] })
    }
    destroy() {
        if (typeof this.baseOnLangChange !== UNDEFINED) {
            this.baseOnLangChange.unsubscribe();
            this.baseOnLangChange = undefined;
        }
    }
    ngOnDestroy() {
        this.destroy();
        super.ngOnDestroy();
    }

    checkAndSetLanguageCode(params: any) {
        if (isObject(params) && (params.lang || params.translationName)) {
            this.languageCode = params.lang
            this.currentTranslationName = params.translationName;
            var name = this.setAndGetCurrentLang(false);
            if (!this.translateBase.translations[name]) {
                if (!this.translateBase.isolateSubscriptions[name]) {
                    this.translateBase.isolateSubscriptions[name] = this[TRANSLATE_SERVICE].use(name);
                    this.translateBase.isolateSubscriptions[name].subscribe(t => {
                        this.translateBase.isolateSubscriptions[name] = undefined;
                        delete this.translateBase.isolateSubscriptions[name];
                        this.notifyChangeLanguage();
                    })
                } else {
                    this.translateBase.isolateSubscriptions[name].subscribe(t => {
                        this.notifyChangeLanguage();
                        console.log(params);
                    })
                }
            } else
                this.setAndGetCurrentLang();
        }
    }
}
