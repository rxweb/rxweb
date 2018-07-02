[![npm version](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators.svg)](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rx-web/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

# Prerequisites
Reactive Form Validators will work in angular projects.

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Validation Quick Start](#validation-quick-start)
* [Import Modules](#import-modules)
* [Configure Global Validation Messages](#configure-global-validation-messages)
* [Reactive Form Validators](#reactive-form-validators)
	1.	[alpha](#alpha)
	2.	[alphaNumeric](#alphaNumeric)
	3.	[compare](#compare)
	4.	[contains](#contains)
	5.	[creditCard](#creditCard)
	6.	[digit](#digit)
	7.	[email](#email)
	8.	[greaterThan](#greaterThan)
	9.	[greaterThanEqualTo](#greaterThanEqualTo)
	10.	[hexColor](#hexColor)
	11.	[json](#json)
	12.	[lessThan](#lessThan)
	13.	[lessThanEqualTo](#lessThanEqualTo)
	14.	[lowerCase](#lowerCase)
	15.	[maxLength](#maxLength)
	16.	[maxNumber](#maxNumber)
	17.	[minNumber](#minNumber)
	18.	[minLength](#minLength)
	19.	[password](#password)
	20.	[pattern](#pattern)
	21.	[prop](#prop)
	22.	[propArray](#propArray)
	23.	[propObject](#propObject)
	24.	[range](#range)
	25.	[required](#required)
	26.	[time](#time)
	27.	[upperCase](#upperCase)
	28.	[url](#url)
	
* [Documentation](#documentation)
* [License](#license)

## Introduction
Smart way to validate the forms with `@rxweb/reactive-form-validators`. RxWeb Reactive Forms Validation provides several different approaches to validate your application's data. It supports client side validations with reactive form in angular and also manage to useful validation messages. 
**[Documentation](http://rxweb.github.io)**

## Installation
```bash
$ npm install @rxweb/reactive-form-validators
```
## Validation Quick Start
To learn more about Rx Web powerful validation features, let us look at a complete example of validating a form and displaying the error messages back to the user. 

## Import modules
To work on form it is require to import angular modules(FormsModule && ReactiveFormsModule) and for rxweb reactive form validation to import 'RxReactiveFormsModule' module and register that in the NgModule decorator imports property.
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module


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

## Configure Global Validation Messages
Apply global validation messages throughout the application, then configure the validation messages globaly(whenever application starts it will initialized automatically). 
Below is the example to configure the validation messages in 'ReactiveFromConfig'.
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: './app.component.css'
})
export class AppComponent implements OnInit {
  
	constructor() {  }
  
	ngOnInit(): void 
	{
		ReactiveFormConfig.set({ 
            "validationMessage": {
                "required": "this field is required.",
				//.... set key name of validator name and assign the message of that particular key.
            }
        });
  }
}
```

# Reactive Form Validators
### 	alpha
Alpha validation decorator will allow only alphabets to be entered. It will not allow any number or special character. If user tries to do so the property will become invalid. Below is the example for bind country form with alpha validation. **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/country.model.ts
```js
export class Country{
    @prop() @alpha() countryName: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/components/country.component.ts
```js
@Component({ ...})
export class CountryComponent implements OnInit {
    countryFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let country = new Country();
        this.countryFormGroup = this.formBuilder.formGroup(country);
    }
}
```

