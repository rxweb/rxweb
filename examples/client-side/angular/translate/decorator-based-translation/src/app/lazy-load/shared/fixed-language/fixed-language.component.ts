import { Component } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector:'app-fixed-language', 
    templateUrl: './fixed-language.component.html',
})
export class FixedLanguageComponent {
    @translate({ translationName: 'fixed-language', language:'en' }) fixedLanguage: any;


    get badgeClass() {
        return this.fixedLanguage && this.fixedLanguage.languageCode && this.fixedLanguage.languageCode == "en" ? "badge-warning" : "badge-success";
    }
}
