import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxTranslateModule } from "@rxweb/translate"
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { OnPushComponent } from './on-push/on-push.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, OnPushComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
      RxTranslateModule.forRoot({
          cacheLanguageWiseObject: true,
          globalFilePath: "assets/i18n/{{language-code}}.json",
          filePath: "assets/i18n/{{translation-name}}/{{language-code}}.json",
      }),
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
