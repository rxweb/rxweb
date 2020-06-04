import { Component, OnInit } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'scope-sharing',
    templateUrl: './scope-sharing.component.html',
    styleUrls: []
})
export class ScopeSharingComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    @translate({ translationName: 'todos-page' }) todos: { [key: string]: any };

    @translate({ translationName: 'lazy-page' }) lazyPage: { [key: string]: any };

    @translate() global: { [key: string]: any };
}
