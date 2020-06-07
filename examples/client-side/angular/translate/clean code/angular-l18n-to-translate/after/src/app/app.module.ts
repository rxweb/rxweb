import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxTranslateModule, RxTranslateSanitizeModule } from "@rxweb/translate"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PipeComponent } from './home/pipe/pipe.component';
import { DirectiveComponent } from './home/directive/directive.component';
import { ApiComponent } from './home/api/api.component';
import { ValidationComponent } from './validation/validation.component';
import { OnPushComponent } from './on-push/on-push.component';
import { TimeAgoPipe } from './home/api/pipes/time-ago.pipe';
import { FormatNumberPipe } from './home/api/pipes/format-number.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PipeComponent,
        DirectiveComponent,
        ApiComponent,
        ValidationComponent,
        OnPushComponent,
        TimeAgoPipe,
        FormatNumberPipe
    ],
    imports: [
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        RxTranslateModule.forRoot({
            languageCode:"en-US",
            cacheLanguageWiseObject: true,
            globalFilePath: "assets/i18n/app-{{language-code}}.json",
            filePath: "assets/i18n/{{translation-name}}-{{language-code}}.json",
        }),
        RxTranslateSanitizeModule, CommonModule
    ],
    providers: [TimeAgoPipe,
        FormatNumberPipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
