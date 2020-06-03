import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RxWebModule } from './rxweb.module';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { LazyLoadChildComponent } from './lazy-load/shared/lazy-load-child/lazy-load-child.component';
import { CodeViewerComponent } from './shared/code-viewer/code-viewer.component';
import { CountryService } from './countries.service';
import { HttpClientModule } from '@angular/common/http';
import { FixedLanguageComponent } from './lazy-load/shared/fixed-language/fixed-language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent, LazyLoadComponent, LazyLoadChildComponent, CodeViewerComponent, FixedLanguageComponent
    ],
    imports: [FormsModule, ReactiveFormsModule,
        BrowserModule, HttpClientModule,
    AppRoutingModule, RxWebModule
  ],
    providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
