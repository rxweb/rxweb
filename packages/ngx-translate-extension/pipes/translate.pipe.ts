import { Injectable, Pipe, ChangeDetectorRef, ElementRef, VERSION, ViewContainerRef } from "@angular/core";
import { TranslatePipe as TranslatePipeNgx, } from "@ngx-translate/core"
import { TranslateService } from "../services/translate.service";
import { TranslationResolver, RxTranslation } from "@rxweb/translate"
import { ActivatedRoute } from '@angular/router';
import { RequestState } from '../services/request.state';
import { Subscription } from 'rxjs';
import { UNDEFINED, IS_INTERNAL, GLOBAL } from '../const/app.const';
import { isObject } from '../functions/is-object';
const TRANSLATE: string = "translate";
const NG_COMPONENT: string = "ng-component";
const HOST_VIEW: string = "_hostView";
@Injectable()
@Pipe({
    name: 'translate',
    pure: false // required to update the value when the promise is resolved
})
export class TranslatePipe extends TranslatePipeNgx {
    private nodeName: string;
    private baseOnLangChange: Subscription;
    private baseDefaultLangChange: Subscription;
    private baseTranslationChange: Subscription;
    private isolateSubscription: Subscription;
    private currentTranslationName: string;
    private languageCode: string;
    constructor(private translateBase: TranslateService, ref: ChangeDetectorRef, elementRef?: ElementRef, private rxTranslation?: RxTranslation, private activatedRoute?: ActivatedRoute, private requestState?: RequestState, private translationResolver?: TranslationResolver, private viewContainerRef?: ViewContainerRef) {
        super(translateBase, ref)
        this[TRANSLATE] = new TranslateService(translateBase.store, translateBase.currentLoader, translateBase.compiler, translateBase.parser, translateBase.missingTranslationHandler, true, true, false, false, rxTranslation, new RequestState(), this.translationResolver);
        this[TRANSLATE][IS_INTERNAL] = true;
        if (viewContainerRef && parseInt(VERSION.major) >= 9)
            this.nodeName = viewContainerRef[HOST_VIEW][0].tagName
        else
            this.nodeName = elementRef.nativeElement.nodeName ? elementRef.nativeElement.nodeName.toLowerCase() : '';
        this.subscribe();
        this.setAndGetCurrentLang();

    }

    private setAndGetCurrentLang(isSet: boolean = true) {
        let name = null;
        if (this.currentTranslationName) {
            if (this.currentTranslationName == GLOBAL)
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
        this.baseDefaultLangChange = this.translateBase.onDefaultLangChange.subscribe(t => {
            this.translateBase.changeLanguage(t.lang, this.notifyDefaultLanguageChange.bind(this));
        })
        this.baseOnLangChange = this.translateBase.onLangChange.subscribe(t => {
            this.translateBase.changeLanguage(t.lang, this.notifyChangeLanguage.bind(this))
        })

        this.baseTranslationChange = this.translateBase.onTranslationChange.subscribe(t => {
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



    checkAndSetLanguageCode(...args: any[]) {
        for (var i = 0; i < args.length; i++) {
            if (isObject(args[i]) && (args[i].lang || args[i].translationName)) {
                this.languageCode = args[i].lang
                this.currentTranslationName = args[i].translationName;
                var name = this.setAndGetCurrentLang(false);
                if (!this.translateBase.translations[name]) {
                    if (!this.translateBase.isolateSubscriptions[name]) {
                        this.translateBase.isolateSubscriptions[name] = this[TRANSLATE].use(name);
                        this.unsubscribeIsolateSubscription();
                        this.isolateSubscription = this.translateBase.isolateSubscriptions[name].subscribe(t => {
                            this.translateBase.isolateSubscriptions[name] = undefined;
                            delete this.translateBase.isolateSubscriptions[name];
                            this.notifyChangeLanguage();
                        })
                    } else {
                        this.unsubscribeIsolateSubscription();
                        this.isolateSubscription = this.translateBase.isolateSubscriptions[name].subscribe(t => {
                            this.notifyChangeLanguage();
                        })
                    }
                } else
                    this.setAndGetCurrentLang();
                break;
            }
        }
    }

    unsubscribeIsolateSubscription() {
        if (typeof this.isolateSubscription !== UNDEFINED) {
            this.isolateSubscription.unsubscribe();
            this.isolateSubscription = undefined;
        }
    }

    destroy() {
        if (typeof this.baseDefaultLangChange !== UNDEFINED) {
            this.baseDefaultLangChange.unsubscribe();
            this.baseDefaultLangChange = undefined;
        }
        if (typeof this.baseOnLangChange !== UNDEFINED) {
            this.baseOnLangChange.unsubscribe();
            this.baseOnLangChange = undefined;
        }
        if (typeof this.baseTranslationChange !== UNDEFINED) {
            this.baseTranslationChange.unsubscribe();
            this.baseTranslationChange = undefined;
        }
        this.unsubscribeIsolateSubscription();
    }

    ngOnDestroy() {
        this.destroy();
        super.ngOnDestroy();
    }
}
