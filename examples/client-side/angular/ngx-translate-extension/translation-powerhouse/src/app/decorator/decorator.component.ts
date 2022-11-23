import { Component} from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';
import { translate, asyncTranslate, RxTranslation } from "@rxweb/translate"
import { CountryService } from '../service/country.service';
@Component({
    selector: 'app-decorator',
    templateUrl: './decorator.component.html',
})
export class DecoratorComponent {
    
    
    @translate() global: { [key: string]: any };

    @translate({ translationName:'global', language: 'fr' }) globalFrench: { [key: string]: any };

    @translate({ translationName: 'dashboard' }) dashboard: { [key: string]: any };

    @translate({ translationName: 'customfile', filePath: "assets/i18n/dashboard/en.json" }) dashboardEnglish: { [key: string]: any };

    @asyncTranslate({
        serviceModel: CountryService,
        serviceMethod: CountryService.prototype.get
    })
    countries: any;

    @translate({
        translationName: 'inliners',
        inlineTranslations: {
            en: () => import('./i18n/en.json'),
            fr: () => import('./i18n/fr.json')
        }
    }) inline: any;


    constructor(public translate: TranslateService, public rxTranslation: RxTranslation) { }

    name: string = "John";
    meridiem: string = "am";
    keys: string[] = ["keyOne", "nested.keyOne"];
    message: string;



    changeMeridiem() {
        this.meridiem = this.meridiem == "am" ? "pm" : "am";
    }

    selectUser(user) {
        this.message = this.rxTranslation.translate(
            this.global.selectedRecord, user
        );
    }
}
