import { APP_INITIALIZER, ApplicationRef, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, ITranslationService, defaultInterpolationFormat } from 'angular-i18next';
import { I18NextValidationMessageModule } from 'angular-validation-message';

import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './content/access-denied/access-denied.component';
import { SimpleDemoComponent } from './content/simple-demo.component';
import { ENV_PROVIDERS } from './environment';
import { AppRouterModule } from './routing/AppRouterModule';
import { AppErrorComponent } from './structure/app-error.component';
import { AppFooterComponent } from './structure/app-footer.component';
import { AppHeaderComponent } from './structure/app-header.component';
import { HeaderLanguageComponent } from './structure/header-controls/header.language.component';

/*
 * Platform and Environment providers/directives/pipes
 */
const i18nextOptions = {
    whitelist: ['en', 'ru'],
    fallbackLng: 'en',
    debug: true, // set debug?
    returnEmptyString: false,
    ns: [
        'translation',
        'validation',
        'error',

        // 'feature.rich_form'
    ],
    interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
    },
    //backend plugin options
    backend: {
        loadPath: 'locales/{{lng}}.{{ns}}.json'
    },
    // lang detection plugin options
    detection: {
        // order and from where user language should be detected
        order: ['cookie'],

        // keys or params to lookup language from
        lookupCookie: 'lang',

        // cache user language on
        caches: ['cookie'],

        // optional expire and domain for set cookie
        cookieMinutes: 10080, // 7 days
        cookieDomain: {}
    }
};

export function appInit(i18next: ITranslationService) {
    return () => {
        let promise: Promise<I18NextLoadResult> = i18next
            .use(XHR)
            .use<any>(LanguageDetector)
            .init(i18nextOptions);
        return promise;
    };
}

export function localeIdFactory(i18next: ITranslationService) {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    },
];

type StoreType = {
    //state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        //app
        AppComponent,
        AppHeaderComponent,
        AppFooterComponent,
        HeaderLanguageComponent,
        AppErrorComponent,
        SimpleDemoComponent,
        AccessDeniedComponent
    ],
    imports: [ // import Angular's modules
        //core
        BrowserModule,
        FormsModule,
        //lib
        I18NextModule.forRoot({
            // errorHandlingStrategy: StrictErrorHandlingStrategy
        }),
        //app
        AppRouterModule,
        I18NextValidationMessageModule
    ],
    exports: [
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        I18N_PROVIDERS
    ],
    entryComponents: [

    ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) { }

    hmrOnInit(store: StoreType) {
        if (!store) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        //this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        //delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        //const state = this.appState._state;
        //store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}

