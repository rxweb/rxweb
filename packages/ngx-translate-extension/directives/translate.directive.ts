import { TranslateDirective as TranslateDirectiveNgx } from "@ngx-translate/core"
import { ElementRef, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TranslateService } from "../services/translate.service"
import { RxTranslation, TranslationResolver } from '@rxweb/translate';
import { RequestState } from '../services/request.state';
import { Subscription } from 'rxjs';
import { UNDEFINED } from '../const/app.const';
const TRANSLATE_SERVICE: string = "translateService"
const VIEW: string = "_view";

export class TranslateDirective extends TranslateDirectiveNgx {
    private component: any;
    private baseOnLangChange: Subscription;
    constructor(private translateBase: TranslateService, element: ElementRef, _ref: ChangeDetectorRef, viewContainer: ViewContainerRef, private rxTranslation: RxTranslation, private requestState: RequestState, private translationResolver: TranslationResolver) {
        super(new TranslateService(translateBase.store, translateBase.currentLoader, translateBase.compiler, translateBase.parser, translateBase.missingTranslationHandler, true, true, false, false, rxTranslation, requestState, translationResolver), element, _ref);
        this.subscribe();
        if (viewContainer[VIEW] && viewContainer[VIEW].component) {
            this.component = viewContainer[VIEW].component.constructor;
            this[TRANSLATE_SERVICE].currentLang = this.getName();
        }
    }

    getName() {
        let name = this.translationResolver.getTranslationNameByInstance(this.component);
        if (!name)
            name = this.translationResolver.activeLanguage;
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
            let name = this.getName();
            this[TRANSLATE_SERVICE].currentLang = name;
            this[TRANSLATE_SERVICE].onTranslationChange.emit({ lang: name, translations: this.translateBase.translations[name] })
        })
    }

    private notifyDefaultLanguageChange() {
        let name = this.getName();
        this[TRANSLATE_SERVICE].currentLang = name;
        this[TRANSLATE_SERVICE].onDefaultLangChange.emit({ lang: name })
    }

    private notifyChangeLanguage() {
        let name = this.getName();
        this[TRANSLATE_SERVICE].currentLang = name;
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
}
