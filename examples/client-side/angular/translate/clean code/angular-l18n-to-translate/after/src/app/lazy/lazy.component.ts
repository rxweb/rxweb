import { Component } from '@angular/core';
import { translate } from '@rxweb/translate';


@Component({
    selector: 'app-lazy',
    templateUrl: './lazy.component.html',
    styleUrls: ['./lazy.component.scss']
})
export class LazyComponent {

    @translate({ translationName: 'lazy' }) lazy: any;

}
