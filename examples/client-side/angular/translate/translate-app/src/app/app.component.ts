import { Component } from '@angular/core';
import { translate, RxTranslation } from '@rxweb/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    @translate() global: any;

    name: string = "Bill"


    constructor(private translation: RxTranslation) {

    }

    changeLanguage(language: string) {
        this.translation.change(language)
    }
}
