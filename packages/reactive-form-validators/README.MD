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
## Validation Decorators & Validators 
```Validation can be applied using two options, either by using validation decorators or validations . Here are their names and descriptions``` 

| Name | Description | 
| ----------- | ----------- |
| allOf      | allOf validation will check whether the user has entered values which are satisfying matchValues of the  field if not so , the property will become invalid<br/> Example(You can use any of below two based on your need) :  <br/> 1. Validator Based :  ``` RxwebValidators.allOf({matchValues:['angular']}) ``` <br/> 2. Decorator Based : ``` @allOf({matchValues:['angular']}) skills:string[]; ``` |
| alpha   |   Alpha validation will allow only alphabets to be entered, It will not allow any number or special character.<br/> Example(You can use any of below two based on your need) :  <br/> 1. Validator Based :  ``` RxwebValidators.alpha() ``` <br/> 2. Decorator Based : ``` @alpha() stateName: string; ``` |
| alphaNumeric   | Alpha Numeric validation will allow only alphabets and numbers to be entered, It will not allow any special character.<br/> Example(You can use any of below two based on your need) :  <br/> 1. Validator Based :  ``` RxwebValidators.alphaNumeric() ``` <br/> 2. Decorator Based : ```@alphaNumeric() flatAddress: string; ``` |
| choice   | choice validation will check whether the value entered is matching the properties defined.<br/> Example(You can use any of below two based on your need) :  <br/> 1. Validator Based :  ``` RxwebValidators.choice({minLength:'5'}) ``` <br/> 2. Decorator Based : ```@choice({minLength:'5'}) Hobbies: string; ``` |
| compare   | Compare validation will compare two inputs, If user enter unmatched value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based :  ```RxwebValidators.compare({fieldName:'password'   })``` <br/> 2. Decorator Based : ```@compare({fieldName:'password'})	confirmPassword: string; ``` |
| contains   |  Contains validation will check that value is in the input, It will not allow to enter input that not contains value.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based :  ```RxwebValidators.contains({value:'@gmail.com' })``` <br/> 2. Decorator Based : ```@contains({value:'@gmail.com' }) emailAddress: string; ``` |
| creditCard   | creditCard validation will check property value is creditcardtype or not, It will not allow to enter any value rather than credit card.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based :  ```RxwebValidators.creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:x => x.cardType == "visa"})``` <br/> 2. Decorator Based : ```@creditCard({creditCardTypes:[CreditCardType.Visa]  ,conditionalExpression:x => x.cardType == "visa"}) 	otherVisaCard: string; ``` |
| different   | Different validation will check  two values if they are different it will be valid,it is opposite of compare validator. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based :  ```RxwebValidators.different({fieldName:"firstName" })``` <br/> 2. Decorator Based : ```@different({fieldName:"firstName" }) lastName: string; ```
| digit   |  Digit validation will allow only digits to be entered, It will not allow any alphabets or special character.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.digit()``` <br/> 2. Decorator Based : ```@digit() age: number; ```
| email   | Email validation  will allow only emails to be entered.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.email()``` <br/> 2. Decorator Based : ```@email() email: string; ```
| even   |  Even validation  will check whether the value entered is a Even or not , if the value is not even the value will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.even()``` <br/> 2. Decorator Based : ```@even() evenNumber: number;```
| factor   | factor validation  will check whether the value entered is factor of the particular value,if user tries to enter value which is not factor of the value  the property will be invalid. .<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.factor({dividend:50 })``` <br/> 2. Decorator Based : ```@factor({dividend:50 }) firstNumber: Number;```
| greaterThanEqualTo   | Greater than equal to validation will check that input property is greater than equal to value, If user tries to enter less than value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.greaterThanEqualTo({fieldName:'age'})``` <br/> 2. Decorator Based : ```@greaterThanEqualTo({fieldName:'age'}) voterAge: number;```
| greaterThan   | Greater than validation  will check that input property is greater than related field input, If user tries to enter less than or equal to value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.greaterThan({fieldName:'age'})``` <br/> 2. Decorator Based : ```@greaterThan({fieldName:'age' }) voterAge: number;```
| hexColor   | HexColor validation  will allow only Hex Color to be entered.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.hexColor()``` <br/> 2. Decorator Based : ```@hexColor() color: string;```
| json   | json validation  will allow only Json to be entered.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.json()``` <br/> 2. Decorator Based : ```@json() locationJson: string;```
| leapYear   | LeapYear validation will check whether the value entered is a leap year or not, if user tries to enter value which is not a leap year the property will be invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.leapYear()``` <br/> 2. Decorator Based : ```@leapYear()	birthYear: number;```
| lessThanEqualTo   |  Less than equal to validation will check that input property is less than equal to value, If user tries to enter greater than value then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.lessThanEqualTo({fieldName:'totalMarks'})``` <br/> 2. Decorator Based : ```@lessThanEqualTo({fieldName:'totalMarks'}) marks: number;```
| lessThan   | Less than validation will check that input property is less than value, If user tries to enter greater than equal to value then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.lessThan({fieldName:'totalMarks'})``` <br/> 2. Decorator Based : ```@lessThan({fieldName:'totalMarks'}) marks: number;```
| lowerCase   | lowerCase validation will allow only lowercase to be entered, If user tries to enter any case except lower then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.lowerCase()``` <br/> 2. Decorator Based : ```@lowerCase() username: string;```
| mac   | mac validation decorator will check whether the value entered is in proper format of mac address.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.mac()``` <br/> 2. Decorator Based : ```@mac()	systemMacAddress: string;```
| maxDate  |  MaxDate validation will allow only maximum date be entered upto value parameter, If user tries to enter any number that greater then the value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.maxDate({value:new Date(2018,7,30)})``` <br/> 2. Decorator Based : ```@maxDate({value:new Date(2018,7,30) })	registrationDate: Date;```
| maxLength   | MaxLength validation will allow only maximum length be entered upto value parameter, If user tries to enter any string that length exceed then the value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.maxLength({value:10 })``` <br/> 2. Decorator Based : ```@maxLength({value:10 }) firstName: string;```
| maxNumber |  MaxNumber validation will allow only maximum number be entered upto value parameter,If user tries to enter any number that greater then the value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.maxNumber({value:50 })``` <br/> 2. Decorator Based : ```@maxNumber({value:50 }) passingMarks: number;```
| minDate   | Minimum Date validation will allow only minimum date be entered upto value parameter, If user tries to enter any date that less then the value then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.minDate({value:new Date(2018,7,30) })``` <br/> 2. Decorator Based : ```@minDate({value:new Date(2018,7,30) }) registrationDate: Date;```
| minLength   |  MinLength validation  will allow only minimum length be entered upto value parameter, If user tries to enter any string having length less then the value then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.minLength({value:8 })``` <br/> 2. Decorator Based : ```@minLength({value:8 }) countryName: string;```
| minNumber   | MinNumber validation will allow only minimum number be entered upto value parameter, If user tries to enter any number that less then the value then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.minNumber({value:35 })``` <br/> 2. Decorator Based : ```@minNumber({value:35 }) 	maths: number;```
| noneOf   | noneOf validation will check whether the user has entered none of the value is selected from the given inputs, if user tries to enter any of the values it  will be invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.noneOf({matchValues: ["MVC", "AngularJS"]})``` <br/> 2. Decorator Based : ```@noneOf({matchValues: ["MVC", "AngularJS"]}) skills: string;```
| numeric   | numeric validation will check whether the value entered is a valid number or not.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber, allowDecimal: false, conditionalExpression: "x => x.dataType == 'Integer'"})``` <br/> 2. Decorator Based : ```@numeric({acceptValue:NumericValueType.PositiveNumber, allowDecimal: false, conditionalExpression: "x => x.dataType == 'Integer'"}) integerNumber: number;```
| odd   |  Odd validation will check whether the value entered is an odd value or not.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.odd()``` <br/> 2. Decorator Based : ```@odd() oddNumber: number;```
| oneOf   | oneOf validation will check whether the user has entered any one of the given inputs.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.oneOf({matchValues: ["MVC", "AngularJS"]})``` <br/> 2. Decorator Based : ```@oneOf({matchValues: ["MVC", "AngularJS"]}) skills: string;```
| password   | Password validation will allow only password to be entered, If user tries to enter any string rather than password pattern according for PasswordValidation parameters then the property will become invalid. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true})``` <br/> 2. Decorator Based : ```@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}) 	password: string;```
| pattern   |  Pattern validation decorator will allow only match input as pattern to be entered. <br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')})``` <br/> 2. Decorator Based : ```@pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')}) 	userName: string;```
| prop   | Prop decorator is used to define a property in model class.<br/> Example: ```@prop() oldPassword: string;```
| propArray   | propArray is used to make array of field when nested model class is used.<br/> Example: ``` @propArray(Course) courses: Array<Course>;```
| propObject   | propObject is used to make array of field when nested model class is used.<br/> Example: ```  @propObject(UserAddress)  userAddress: UserAddress;```
| range   | Range validation decorator will allow only in specify range will be entered, If EmployeeInfo tries to enter any value which exceed the range then the property will become invalid.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })``` <br/> 2. Decorator Based : ```@range({minimumNumber:18  ,maximumNumber:60 }) age: number;```
| required   | Required validation decorator will check that value is entered or not in the property.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.required()``` <br/> 2. Decorator Based : ```@required()	firstName: string;```
| time   |  time validation decorator will allow only time format to be entered.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.time()``` <br/> 2. Decorator Based : ```@time() entryTime: string;```
| upperCase   | Upper Case validation decorator will allow only uppercase to be entered.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.upperCase()``` <br/> 2. Decorator Based : ```@upperCase() countryName: string;```
| url   |  Url validation decorator will check that value is url or not in the property.<br/> Example(You can use any of below two based on your need) : <br/> 1. Validator Based : ```RxwebValidators.url()``` <br/> 2. Decorator Based : ```@url() 	adminWebsiteUrl: string;```


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
