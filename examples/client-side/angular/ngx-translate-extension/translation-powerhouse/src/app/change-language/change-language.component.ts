import { Component } from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';
import { ActivatedRoute, Router } from '@angular/router';
import { translate } from '@rxweb/translate';

@Component({
    templateUrl: './change-language.component.html',
})
export class ChangeLanguageComponent {
    activeLanguage: string;
    @translate({ translationName:'lazy-load' }) global: any;
    constructor(public translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(t => {
            this.activeLanguage = t["languageCode"];
        })
    }


    changeLanguage(languageCode: string) {
        this.translate.use(languageCode);
    }

    navigate(languageCode: string) {
        this.router.navigate([languageCode, "lazy-load"])
    }
}
