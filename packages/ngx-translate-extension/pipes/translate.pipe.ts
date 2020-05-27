import { Injectable, Pipe, ChangeDetectorRef, ElementRef } from "@angular/core";
import { TranslatePipe as TranslatePipeNgx, } from "@ngx-translate/core"
import { TranslateService } from "../services/translate.service";
import { TranslationResolver, RxTranslation } from "@rxweb/translate"
import { ActivatedRoute } from '@angular/router';
import { RequestState } from '../services/request.state';
import { Subscription } from 'rxjs';
import { UNDEFINED } from '../const/app.const';
import { isObject } from '../functions/is-object';
const TRANSLATE: string = "translate";
const NG_COMPONENT: string = "ng-component";
@Injectable()
@Pipe({
    name: 'translate',
    pure: false // required to update the value when the promise is resolved
})
export class TranslatePipe extends TranslatePipeNgx {
    private nodeName: string;
    private baseOnLangChange: Subscription;
    private currentTranslationName: string;
    private languageCode: string;
    constructor(private translateBase: TranslateService, ref: ChangeDetectorRef, elementRef?: ElementRef, private rxTranslation?: RxTranslation, private activatedRoute?: ActivatedRoute, private requestState?: RequestState, private translationResolver?: TranslationResolver) {
        super(translateBase, ref)
        this[TRANSLATE] = new TranslateService(translateBase.store, translateBase.currentLoader, translateBase.compiler, translateBase.parser, translateBase.missingTranslationHandler, true, true, false, false, rxTranslation, new RequestState(), this.translationResolver);
        this[TRANSLATE]["isInternal"] = true;
        this.nodeName = elementRef.nativeElement.nodeName ? elementRef.nativeElement.nodeName.toLowerCase() : '';
        this.subscribe();
        this.setAndGetCurrentLang();

    }

    private setAndGetCurrentLang(isSet: boolean = true) {
        let name = null;
        if (this.currentTranslationName) {
            if (this.currentTranslationName == "global")
                name = this.languageCode;
            else
                name = `${this.currentTranslationName}_${this.languageCode || this.translationResolver.activeLanguage}`;
        } else {
            if (this.nodeName == NG_COMPONENT)
                name = this.translationResolver.getTranslationNameByInstance(this.activatedRoute.component, this.languageCode);
            else
                name = this.translationResolver.getTranslationName(this.nodeName, this.languageCode);
            if (!name)
                name = this.languageCode || this.translationResolver.activeLanguage;
        }
        if (isSet)
            this[TRANSLATE].currentLang = name;
        return name;
    }
    transform(query: string, ...args: any[]): any {
        if (args && args.length > 0) {
            this.checkAndSetLanguageCode(...args);
        }
        return super.transform(query, ...args);
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
            this[TRANSLATE].onTranslationChange.emit({ lang: name, translations: this.translateBase.translations[name] })
        })
    }

    private notifyDefaultLanguageChange() {
        let name = this.setAndGetCurrentLang();
        this[TRANSLATE].onDefaultLangChange.emit({ lang: name })
    }

    private notifyChangeLanguage() {
        let name = this.setAndGetCurrentLang();
        this[TRANSLATE].onLangChange.emit({ lang: name, translations: this.translateBase.translations[name] })
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

    checkAndSetLanguageCode(...args: any[]) {
        for (var i = 0; i < args.length; i++) {
            if (isObject(args[i]) && (args[i].lang || args[i].translationName)) {
                this.languageCode = args[i].lang
                this.currentTranslationName = args[i].translationName;
                var name = this.setAndGetCurrentLang(false);
                if (!this.translateBase.translations[name]) {
                    if (!this.translateBase.isolateSubscriptions[name]) {
                        this.translateBase.isolateSubscriptions[name] = this[TRANSLATE].use(name);
                        this.translateBase.isolateSubscriptions[name].subscribe(t => {
                            this.translateBase.isolateSubscriptions[name] = undefined;
                            delete this.translateBase.isolateSubscriptions[name];
                            this.notifyChangeLanguage();
                        })
                    } else {
                        this.translateBase.isolateSubscriptions[name].subscribe(t => {
                            this.notifyChangeLanguage();
                        })
                    }
                } else
                    this.setAndGetCurrentLang();
                break;
            }
        }
    }
}
