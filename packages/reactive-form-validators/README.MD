[![npm version](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators.svg)](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rx-web/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

<h3>rxweb</h3>
Advanced, conditional and dynamic validation framework for faster and easier web development.

* Basic validations.
* Advance validations.
* Conditional validations.
* Dynamic validations.
* Configure application wide validation messages.
* Set per control custom validation message.
* Make `FormGroup` object with default values and control validations.

# Prerequisites
Reactive Form Validators will work in angular projects.

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Validation Quick Start](#validation-quick-start)
    * [Import Modules](#import-modules)
    * [Configure Global Validation Messages](#configure-global-validation-messages)
    * [Implement Validation Decorators](#implement-validation-decorators)
    * [Validation Example Demo](#validation-example-demo)
* [License](#license)

## Introduction
Smart way to validate the forms with `@rxweb/reactive-form-validators`. RxWeb Reactive Forms Validation provides several different approaches to validate your application form data. It supports client side reactive form validation in angular and also manage the useful validation messages. 


## Installation
```bash
$ npm install @rxweb/reactive-form-validators
```
## Validation Quick Start
To learn more about `rxweb` powerful validation features, let us look at a complete example of validating a form and displaying the error messages back to the user. 

## Import modules
To work on form it is require to import angular modules(`FormsModule` and `ReactiveFormsModule`) and also import 'RxReactiveFormsModule' which provides advanced/dynamic level validation features. All three modules register in the `NgModule` decorator `imports` property.
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
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
Consitency is required any enterprise level application. It is good to manage the error message on application wide, So configure and register the validation messages at the start of the application. 
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

## Implement Validation Decorators
**[Demo Code Walkthrough and Download the code](https://stackblitz.com/edit/complete-rxweb-angular-reactive-form-validator-example)**

> user.model.ts
```js
import {
    propObject,    prop, alphaNumeric, alpha, compare, contains, creditCard, CreditCardType, digit, email, greaterThanEqualTo,greaterThan, hexColor, json, lessThanEqualTo, lowerCase, maxLength,maxNumber,
    minNumber, password, pattern, lessThan, range, required, time, upperCase, url, propArray, minLength
} from "@rxweb/reactive-form-validators";

import { UserAddress } from "./user-address.model";
import { Course } from "./course.model";

export class User{

    @alpha()
    userName: string;

    @alphaNumeric()
    areaCode: string;

    @prop() oldPassword: string;

    @compare({ fieldName: "oldPassword" })
    newPassword: string;

    @contains({ value: "Admin" })
    roleName: string;

    @creditCard({ creditCardTypes: [CreditCardType.Visa] })
    creditCardNo: string;

    @digit()
    joiningAge: number;

    @email()
    email: string;

    @greaterThan({ fieldName: 'joiningAge' })
    retirementAge: number;

    @greaterThanEqualTo({ fieldName: 'joiningAge' })
    currentAge: number;

    @hexColor()
    teamColorCode: string;

    @json()
    json: string;

    @prop()
    currentExperience: number;

    @lessThanEqualTo({ fieldName: 'currentExperience' })
    minimumExperience: string;

    @lessThan({ fieldName: "currentExperience" })
    experience: string;

    @lowerCase()
    cityName: string;

    @maxLength({ value: 10 })
    mobileNumber: string;

    @maxNumber({ value: 3 })
    maximumBankAccount: string;

    @minLength({ value: 8 })
    landlineNo: string;

    @minNumber({ value: 1 })
    minimumBankAccount: string;

    @password({ validation: { maxLength: 10, minLength: 5, alphabet: true } })
    password: string;

    @pattern({ pattern: { 'zipCode': /^\d{5}(?:[-\s]\d{4})?$/ } })
    zipCode: string

    @range({ minimumNumber: 18, maximumNumber: 60 })
    eligiblityAge: number;

    @required()
    stateName: string;

    @time()
    entryTime: string;

    @upperCase()
    countryCode: string;

    @url()
    socialProfileUrl: string
    
    @minDate({ value: new Date(2000, 0, 1) }) 
    licenseDate: Date;

    @maxDate({ value: new Date(2018, 5, 6) }) 
    licenseExpiration: Date

    @propObject(UserAddress) 
    userAddress: UserAddress;

    @propArray(Course) 
    courses: Array<Course>;
}
```
> user.address.model.ts
```js
import { prop } from "@rxweb/reactive-form-validators";

export class UserAddress {
    @prop() mobileNo: string;
}
```
> course.model.ts
```js
import { required } from "@rxweb/reactive-form-validators";

export class Course {
    @required() courseName:string;
}
```
> user.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';

import { User } from "./user.model";
import { UserAddress } from "./models/user-address.model";
import { Course } from "./models/course.model";


@Component({...})

export class UserComponent implements OnInit { 
  userFormGroup: FormGroup;

  constructor(private formBuilder: RxFormBuilder) { }

  ngOnInit() {
      let user = new User();
      user.currentExperience = 5;
      user.userAddress = new UserAddress(); // create nested object, this will bind as a `FormGroup`.
      let course = new Course();
      user.courses = new Array<Course>(); // create nested array object, this will bind as a `FormArray`.
      user.courses.push(course);
      this.userFormGroup = this.formBuilder.formGroup(user);
  }
}
```
## Validation Example 
This example only covers the basic validations. For advanced, conditional and dynamic validations goto the **[rxweb](https://rxweb.github.io)** .
**[Demo Code Walkthrough and Download the code](https://stackblitz.com/edit/complete-rxweb-angular-reactive-form-validator-example)**

<img src="https://rxweb.blob.core.windows.net/test/CompleteValidator.gif"/>


# License
MIT