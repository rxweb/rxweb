import { Component} from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-sanitize',
    templateUrl: './sanitize.component.html',
})
export class SanitizeComponent {
    @translate({ translationName:'sanitize' }) sanitize: { [key: string]: any };

    pay: number = 0.259

    today: number = Date.now();

    numeric: number = 2.718281828459045;

    lowerCase: string = 'GOOD EXAMPLE'

    upperCase: string = 'good repository'

    titleCase: string = 'my name is  munad'

    percentage: number = 0.259;

    custom: string = 'Superb'

    get emoji() {
        return '😵';
    }

    get percentFormatting() {
        return '4.3-5';

    }

    get formatting() {
        return '4.5-5';

    }

    get currencyCode() {
        return this.sanitize.languageCode == 'en' ? 'CAD':'EUR'
    }

    get time() {
        return 'h:mm a z';
    }

}
