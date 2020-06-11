import { Component } from '@angular/core';
import { translate, RxTranslation } from '@rxweb/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @translate() global : {[key:string]:any}
  constructor(private rxTranslation: RxTranslation) {}
  changeLanguage(languageCode) {
    this.rxTranslation.change(languageCode);
}
get day() {
  var currentHour = (new Date()).getHours();
  return currentHour < 12 ? 'Good Morning' : 'Good Day';
}
  title = 'getting-started';
}
