import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { L10nTranslationService, L10nIntlService } from 'angular-l10n';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit, OnChanges {

    @Input() today: number;
    @Input() timeAgo: string;
    @Input() value: number;

    greeting: string;
    whoIAm: string;
    description: string;

    formattedToday: string;
    formattedTimeAgo: string;
    formattedValue: string;

    constructor(private translation: L10nTranslationService, private intl: L10nIntlService) { }

    ngOnInit() {
        this.translation.onChange().subscribe({
            next: () => {
                this.greeting = this.translation.translate('home.greeting');
                this.whoIAm = this.translation.translate('home.whoIAm', { name: 'Angular l10n' });
                this.description = this.translation.translate('home.description');

                this.formattedToday = this.intl.formatDate(this.today, { dateStyle: 'full', timeStyle: 'short' });
                this.formattedTimeAgo = this.intl.formatRelativeTime(this.timeAgo, 'second', { numeric: 'always', style: 'long' });
                this.formattedValue = this.intl.formatNumber(this.value, { digits: '1.2-2', style: 'currency' });
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.formattedTimeAgo = this.intl.formatRelativeTime(changes.timeAgo.currentValue, 'second', { numeric: 'always', style: 'long' });
    }

}
