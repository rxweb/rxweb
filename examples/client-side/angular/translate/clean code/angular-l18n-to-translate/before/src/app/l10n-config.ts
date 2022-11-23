import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    L10nConfig,
    L10nLoader,
    L10nStorage,
    L10nLocale,
    L10nTranslationLoader,
    L10nProvider,
    L10nValidation,
    L10N_LOCALE,
    L10nNumberFormatOptions,
    L10nDateTimeFormatOptions,
    parseDigits
} from 'angular-l10n';

export const l10nConfig: L10nConfig = {
    format: 'language-region',
    providers: [
        { name: 'app', asset: './assets/i18n/app', options: { version: '9.0.0' } }
    ],
    fallback: false,
    cache: true,
    keySeparator: '.',
    defaultLocale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
    schema: [
        { locale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' }, dir: 'ltr', text: 'United States' },
        { locale: { language: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome' }, dir: 'ltr', text: 'Italia' }
    ],
    defaultRouting: true
};

export function initL10n(l10nLoader: L10nLoader): () => Promise<void> {
    return () => l10nLoader.init();
}

@Injectable() export class AppStorage implements L10nStorage {

    private hasStorage: boolean;

    constructor() {
        this.hasStorage = typeof Storage !== 'undefined';
    }

    public async read(): Promise<L10nLocale | null> {
        if (this.hasStorage) {
            return Promise.resolve(JSON.parse(sessionStorage.getItem('locale')));
        }
        return Promise.resolve(null);
    }

    public async write(locale: L10nLocale): Promise<void> {
        if (this.hasStorage) {
            sessionStorage.setItem('locale', JSON.stringify(locale));
        }
    }

}

@Injectable() export class HttpTranslationLoader implements L10nTranslationLoader {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(@Optional() private http: HttpClient) { }

    public get(language: string, provider: L10nProvider): Observable<{ [key: string]: any }> {
        const url = `${provider.asset}-${language}.json`;
        const options = {
            headers: this.headers,
            params: new HttpParams().set('v', provider.options.version)
        };
        return this.http.get(url, options);
    }

}

@Injectable() export class LocaleValidation implements L10nValidation {

    constructor(@Inject(L10N_LOCALE) private locale: L10nLocale) { }

    public parseNumber(value: string, options?: L10nNumberFormatOptions, language = this.locale.language): number | null {
        if (value === '' || value == null) return null;

        let format = { minimumIntegerDigits: 1, minimumFractionDigits: 0, maximumFractionDigits: 0 };
        if (options && options.digits) {
            format = { ...format, ...parseDigits(options.digits) };
        }

        let decimalSeparator: string;
        switch (language) {
            case 'it-IT':
                decimalSeparator = ',';
                break;
            default:
                decimalSeparator = '.';
        }

        const pattern = `^-?[\\d]{${format.minimumIntegerDigits},}(\\${decimalSeparator}[\\d]{${format.minimumFractionDigits},${format.maximumFractionDigits}})?$`;
        const regex = new RegExp(pattern);
        return regex.test(value) ? parseFloat(value.replace(decimalSeparator, '.')) : null;
    }

    public parseDate(value: string, options?: L10nDateTimeFormatOptions, language = this.locale.language): Date | null {
        return null;
    }

}
