import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RxTranslateModule } from "@rxweb/translate"
import { DataComponent } from './data.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        AppComponent, DataComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
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
