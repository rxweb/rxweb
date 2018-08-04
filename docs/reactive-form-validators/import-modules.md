---
title: Introduction to Razor Pages in ASP.NET Core
uid: import-modules
---
## Import modules
To work on reactive form it is require to import angular modules (FormsModule & ReactiveFormsModule) and for rxweb reactive form validation to import 'RxReactiveFormsModule' module and register that in the NgModule decorator imports property.
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


import {AppComponent} from './app.component';

@NgModule({
  declarations:[AppComponent],
  imports:[ BrowserModule, 
	FormsModule,
	ReactiveFormsModule, 
	RxReactiveFormsModule
	] 
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
```
