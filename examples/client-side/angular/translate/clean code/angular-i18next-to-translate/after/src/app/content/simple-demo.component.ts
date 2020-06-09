import { Component, ViewEncapsulation, Input } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'simple-demo',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './simple-demo.component.html'
})
export class SimpleDemoComponent {
    value: Number = 15;
    str: string = 'Hello';

    @translate({ translationName: 'translation' }) translation: { [key: string]: any };
}
