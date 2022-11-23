import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RxTranslateModule } from "@rxweb/translate"
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RxTranslateModule.forRoot({
            cacheLanguageWiseObject: true,
            globalFilePath: "assets/i18n/global/{{language-code}}.json",
            filePath: "assets/i18n/{{translation-name}}/{{translation-name}}.{{language-code}}.json",
        })

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
