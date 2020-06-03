import { Component } from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // setting up the default language and current language of the application.
    constructor(public translate: TranslateService) {
        translate.addLangs(['en', 'es', 'fr']);
        translate.setDefaultLang('en');

        translate.use('en');
    }
    title = 'ngx-translate-demo';
}
