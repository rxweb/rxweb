import { Component, ViewEncapsulation, Input  } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
    @translate({ translationName: 'translation' }) translation: { [key: string]: any };
}
