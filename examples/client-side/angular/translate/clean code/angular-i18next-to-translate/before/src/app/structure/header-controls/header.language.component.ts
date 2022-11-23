import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { Component, ViewEncapsulation, Inject } from '@angular/core';

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

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  )
  {}

  ngOnInit() {
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string){
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }

}
