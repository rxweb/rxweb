import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { L10nConfig, L10nTranslationModule, L10nLoader } from 'angular-l10n';

import { AppComponent } from './app.component';

const l10nConfig: L10nConfig = {
    format: 'language-region',
    providers: [
        {
            name: 'app', asset: {
                'en-US': {
                    changeLocale: 'Change locale',
                },
                'it-IT': {
                    changeLocale: 'Cambia località',
                }
            }
        }
    ],
    keySeparator: '.',
    defaultLocale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' },
    schema: [
        { locale: { language: 'en-US', currency: 'USD', timeZone: 'America/Los_Angeles' }, dir: 'ltr', text: 'United States' },
        { locale: { language: 'it-IT', currency: 'EUR', timeZone: 'Europe/Rome' }, dir: 'ltr', text: 'Italia' }
    ]
};

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                L10nTranslationModule.forRoot(l10nConfig)
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;

        const loader = TestBed.inject(L10nLoader);
        await loader.init();
    });

    it('should create the app', () => {
        fixture.detectChanges();
        expect(app).toBeTruthy();
    });

});
