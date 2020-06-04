import { Component, OnDestroy } from '@angular/core';
import { RxTranslation } from '@rxweb/translate';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    availableLangs = [{ id: 'en', label: 'English' }, { id: 'es', label: 'Spanish' }]
    constructor(private service: RxTranslation) {
    }

    get activeLang() {
        return this.service.language;
    }

    change(lang: string) {
        this.service.change(lang);
    }

    ngOnDestroy() {
    }
}
