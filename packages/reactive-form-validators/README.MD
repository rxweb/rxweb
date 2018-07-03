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
     .	[alphaNumeric](#alphaNumeric)
     .	[compare](#compare)
     .	[contains](#contains)
     .	[creditCard](#creditCard)
     .	[digit](#digit)
     .	[email](#email)
     .	[greaterThan](#greaterThan)
     .	[greaterThanEqualTo](#greaterThanEqualTo)
     0.	[hexColor](#hexColor)
        .	[json](#json)
        .	[lessThan](#lessThan)
        .	[lessThanEqualTo](#lessThanEqualTo)
        .	[lowerCase](#lowerCase)
        .	[maxLength](#maxLength)
        .	[maxNumber](#maxNumber)
        .	[minNumber](#minNumber)
        .	[minLength](#minLength)
        .	[password](#password)
        .	[pattern](#pattern)
        .	[prop](#prop)
        .	[propArray](#propArray)
        .	[propObject](#propObject)
        .	[range](#range)
        .	[required](#required)
        .	[time](#time)
        .	[upperCase](#upperCase)
        .	[url](#url)

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

### 	alphaNumeric
alphaNumeric validation decorator will allow only alphanumeric to be entered. It will not allow any special character. If user tries to do so the property will become invalid. Below is the example for bind address info form with alphanumeric validation. **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/address.model.ts
```js
export class Address {
    @prop() @alphaNumeric() areaName: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/components/address.component.ts
```js
@Component({ ...})
export class AddressComponent implements OnInit {
    addressFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let address = new Address();
        this.addressFormGroup = this.formBuilder.formGroup(address);
    }
}
```

### 	compare
compare validation decorator will match the entered value with compared field value. Property will valid if it matches the value. If not matched, then property will become invalid. **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/reset-password.model.ts
```js
export class ResetPasswordModel {
    @prop()
    password: string;

    @prop() @compare({ fieldName: 'password' }) 
    confirmPassword: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/components/forgot-password.component.ts
```js
@Component({ ...})
export class ForgotPasswordComponent implements OnInit {
    resetPasswordFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let resetPassword = new ResetPasswordModel();
        this.resetPasswordFormGroup = this.formBuilder.formGroup(resetPassword);
    }
}
```

### 	contains
contains validation decorator will check the entered value with defined contains value. If contains value is not matched, then property will become invalid. **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/email-info.model.ts
```js
export class EmailInfoModel {
    @prop() @contains({ value: '@gmail.com' })
    emailAddress: string;
}
```
> Note : Import all neccesary dependencies in the respective component. 

> app/component/email-info.component.ts
```js
@Component({ ...})
export class EmailInfoComponent implements OnInit {
    emailInfoFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let emailInfo = new EmailInfoModel();
        this.emailInfoFormGroup = this.formBuilder.formGroup(emailInfo);
    }
}
```

### creditCard

creditCard validation decorator will allow valid credit card number to be entered otherwise property will be invalid if incorrect value is entered. **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/credit-card.model.ts

```js
export class CreditCardModel {
    @prop() @creditCard({ creditCardTypes: [CreditCardType.Visa] })
    visaCard: number;
}
```

> Note : Import all neccesary dependencies in the respective component. 

> app/component/credit-card.component.ts

```js
@Component({ ...})
export class CreditCardComponent implements OnInit {
    creditCardFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let creditCard = new CreditCardModel();
        this.creditCardFormGroup = this.formBuilder.formGroup(creditCard);
    }
}
```

### digit

digit validation decorator will allow only digits to be entered. It will not allow any alphabets or special character. If user tries to do so the property will become invalid.  **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/student-info.model.ts

```js
export class StudentInfo {
    @prop() @digit()
    age: number;
}
```

> Note : Import all neccesary dependencies in the respective component. 

> app/component/student-info.component.ts

```js
@Component({ ...})
export class StudentInfoComponent implements OnInit {
    studentInfoFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let studentInfo = new StudentInfo();
        this.studentInfoFormGroup = this.formBuilder.formGroup(studentInfo);
    }
}
```

### email

email validation decorator will allow valid email to be entered. If user tries to enter invalid email then, the property will become invalid.  **[See more features and examples.](http://rxweb.github.io)**

> Note : `@prop()` is used for define the property name, if `@prop()` decorator will not use then without validation decorator property will not bind in formgroup object. 

> app/models/student-info.model.ts

```js
export class StudentInfo {
    @prop() @email()
    emailId: string;
}
```

> Note : Import all neccesary dependencies in the respective component. 

> app/component/student-info.component.ts

```js
@Component({ ...})
export class StudentInfoComponent implements OnInit {
    studentInfoFormGroup: FormGroup;
    constructor(private formBuilder: RxFormBuilder) { }
    ngOnInit() {
        let studentInfo = new StudentInfo();
        this.studentInfoFormGroup = this.formBuilder.formGroup(studentInfo);
    }
}
```

