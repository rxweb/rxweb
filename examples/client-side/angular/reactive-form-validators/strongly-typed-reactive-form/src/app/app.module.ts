import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ReactiveTypedFormsModule } from "@rxweb/reactive-form-validators"
import { StronglyTypedReactiveFormComponent } from './strongly-typed-reactive-form/strongly-typed-reactive-form.component';

@NgModule({
    declarations: [
        AppComponent, StronglyTypedReactiveFormComponent
  ],
    imports: [
        BrowserModule, ReactiveTypedFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
