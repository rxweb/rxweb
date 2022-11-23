import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { L10nTranslationModule, L10nIntlModule, L10nValidationModule, L10nRoutingModule, L10nLoader } from 'angular-l10n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PipeComponent } from './home/pipe/pipe.component';
import { DirectiveComponent } from './home/directive/directive.component';
import { ApiComponent } from './home/api/api.component';
import { ValidationComponent } from './validation/validation.component';
import { OnPushComponent } from './on-push/on-push.component';

import { l10nConfig, initL10n, AppStorage, HttpTranslationLoader, LocaleValidation } from './l10n-config';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PipeComponent,
        DirectiveComponent,
        ApiComponent,
        ValidationComponent,
        OnPushComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        L10nTranslationModule.forRoot(
            l10nConfig,
            {
                storage: AppStorage,
                translationLoader: HttpTranslationLoader
            }
        ),
        L10nIntlModule,
        L10nValidationModule.forRoot({ validation: LocaleValidation }),
        L10nRoutingModule.forRoot()
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
