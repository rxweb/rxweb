import { Component, OnInit } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-lazy',
    templateUrl: './lazy.component.html'
})
export class LazyComponent implements OnInit {

    @translate({ translationName: 'admin-page' }) adminPage: { [key: string]: any };

    @translate({ translationName: 'lazy-page' }) lazyPage: { [key: string]: any };

    constructor() { }

    ngOnInit() { }
}
