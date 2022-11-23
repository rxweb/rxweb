import { Component, OnInit } from '@angular/core';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'app-inline',
    templateUrl: './inline.component.html'
})
export class InlineComponent implements OnInit {
    constructor() { }

    ngOnInit() {}

    @translate({
        translationName: 'inliners',
        inlineTranslations: {
            en: () => import('../i18n/en.json'),
            es: () => import('../i18n/es.json')
        }
    }) inline: any;

    @translate() global: { [key: string]: any };
}
