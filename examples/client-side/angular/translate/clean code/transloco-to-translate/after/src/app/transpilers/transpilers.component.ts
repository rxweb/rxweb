import { Component, Injector } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-transpilers',
    templateUrl: './transpilers.component.html',
    styleUrls: ['./transpilers.component.css']
})
export class TranspilersComponent {
    value = '🦄';
    key = 'home';
    gender = 'female';
    @translate({ translationName: 'transpilers/messageformat' }) transpilers: { [key: string]: any };
    changeParam() {
        this.value = this.value === '🦄' ? '🦄🦄🦄' : '🦄';
    }
}
