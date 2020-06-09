import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { RxTranslation, translate } from '@rxweb/translate';

@Component({
    selector: 'header-language',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './header.language.component.html',
    styles: [`

  `]
})
export class HeaderLanguageComponent {

    language: string = 'ru';
    languages: string[] = ['ru', 'en'];

    constructor(private rxTranslation: RxTranslation) { }

    @translate({ translationName: 'translation' }) translation: { [key: string]: any };


    changeLanguage(lang: string) {
        this.rxTranslation.change(lang, () => this.updateState(lang));
    }

    private updateState(lang: string) {
        this.language = lang;
    }

}
