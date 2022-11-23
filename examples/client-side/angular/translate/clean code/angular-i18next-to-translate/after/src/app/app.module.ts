import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccessDeniedComponent } from './content/access-denied/access-denied.component';
import { SimpleDemoComponent } from './content/simple-demo.component';
import { AppRouterModule } from './routing/AppRouterModule';
import { AppErrorComponent } from './structure/app-error.component';
import { AppFooterComponent } from './structure/app-footer.component';
import { AppHeaderComponent } from './structure/app-header.component';
import { HeaderLanguageComponent } from './structure/header-controls/header.language.component';

import { RxTranslateModule, RxTranslateSanitizeModule } from "@rxweb/translate"
import { CommonModule } from '@angular/common';


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
        CommonModule,
        BrowserModule,
        FormsModule,
        //lib
        RxTranslateModule.forRoot({
            cacheLanguageWiseObject: true,
            globalFilePath: "locales/{{language-code}}.validation.json",
            filePath: "locales/{{language-code}}.{{translation-name}}.json",
            controlErrorMessage: { path: "" }, languageCode:'en'
        }), RxTranslateSanitizeModule,
        //app
        AppRouterModule,
    ],
    exports: [
    ],
    providers: [],
    entryComponents: [

    ]
})
export class AppModule {}

