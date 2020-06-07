import { Component, OnInit, Inject } from '@angular/core';
import { RxTranslation } from '@rxweb/translate';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private translation: RxTranslation) { }

    setLocale(language: string): void {
        this.translation.change(language);
    }

}
