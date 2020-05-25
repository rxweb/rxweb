import { Injectable, Pipe, ChangeDetectorRef, ElementRef } from "@angular/core";
import { TranslatePipe as TranslatePipeNgx, } from "@ngx-translate/core"
import { TranslateService } from "../services/translate.service";
import { TranslationResolver, RxTranslation } from "@rxweb/translate"
import { ActivatedRoute } from '@angular/router';
import { RequestState } from '../services/request.state';
import { Subscription } from 'rxjs';
import { UNDEFINED } from '../const/app.const';
const TRANSLATE: string = "translate";
const NG_COMPONENT: string = "ng-component";
export class TranslatePipe extends TranslatePipeNgx {
    private nodeName: string;
    private baseOnLangChange: Subscription;
    constructor(private translateBase: TranslateService, ref: ChangeDetectorRef, elementRef?: ElementRef, private rxTranslation?: RxTranslation, private activatedRoute?: ActivatedRoute, private requestState?: RequestState, private translationResolver?: TranslationResolver) {
        super(translateBase, ref)
        this[TRANSLATE] = new TranslateService(translateBase.store, translateBase.currentLoader, translateBase.compiler, translateBase.parser, translateBase.missingTranslationHandler, true, true, false, false, rxTranslation, requestState, this.translationResolver);
        this.nodeName = elementRef.nativeElement.nodeName ? elementRef.nativeElement.nodeName.toLowerCase() : '';
        this.subscribe();
        this[TRANSLATE].currentLang = this.getName();
    }

    private getName() {
        let name = null;
        if (this.nodeName == NG_COMPONENT)
            name =  this.translationResolver.getTranslationNameByInstance(this.activatedRoute.component);
        else
            name = this.translationResolver.getTranslationName(this.nodeName);
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
            this[TRANSLATE].currentLang = name;
            this[TRANSLATE].onTranslationChange.emit({ lang: name, translations: this.translateBase.translations[name] })
        })
    }

    private notifyDefaultLanguageChange() {
        let name = this.getName();
        this[TRANSLATE].currentLang = name;
        this[TRANSLATE].onDefaultLangChange.emit({ lang: name })
    }

    private notifyChangeLanguage() {
        let name = this.getName();
        this[TRANSLATE].currentLang = name;
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
}
