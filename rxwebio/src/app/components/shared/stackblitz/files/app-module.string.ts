export const APP_MODULE :string = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ##component-name## } from './##component-path##';
import { AppComponent } from './app.component';

import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule,RxReactiveFormsModule,HttpClientModule ],
  declarations: [AppComponent, ##component-name##],
  bootstrap:    [ AppComponent]
})
export class AppModule { }
`
