[![npm version](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators.svg)](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

<h3>rxweb</h3>
40+ Validation Decorator and 40+ Validators for angular reactive form based validation. All Validators/Decorators provides extensive features like conditional validation, dynamic validation and advanced validation, also it includes dirty check and better way to show error message on FormControl or FormGroup level.

# Prerequisites
Reactive Form Validators will work in angular projects.

## Table of Contents

* [Installation](#installation)
* [Validation Decorators](#validation-decorators)
* [Important Features](#important-features)
    * [Import Modules](#import-modules)
    * [Configure Global Validation Messages](#configure-global-validation-messages)
    * [Validator Based Validation](#validator-based-validation)
    * [Decorator Based Validation](#decorator-based-validation)
    * [Dynamic Validation](#dynamic-validation)
    * [Conditional Validation](#conditional-validation)
    * [Single Validation Configuration for All Properties](#single-validation-configuration-for-all-properties)
    * [Better Way To Show Error Message](#better-way-to-show-error-message)
    * [Dirty Check](#dirty-check)
    * [Complete Example of Model Based Decorator Validation](#complete-example-of-model-based-decorator-validation)
    * [More Information about validators and validation decorators](#more-information-about-validators-and-validation-decorators)
    
* [License](#license)

## Installation
```bash
$ npm install @rxweb/reactive-form-validators
```
## Validation Decorators & Validators
| Name | Description | 
| ----------- | ----------- |
| allOf      | allOf validation decorator will check whether the user has entered all of the values of given field, if user does not enter all the values of the given field.<br/> Example :  <br/> 1. Validator Based :  ``` RxwebValidators.allOf({matchValues:['angular']}) ``` <br/> 2. Decorator Based : ``` @allOf({matchValues:['angular']}) skills:string[]; ``` |
| alpha   | 
| alphaNumeric   |
| choice   |
| compare   |
| contains   |
| creditCard   |
| different   |
| digit   |
| email   |
| even   |
| factor   |
| greaterThanEqualTo   |
| greaterThan   |
| hexColor   |
| json   |
| leapYear   |
| lessThanEqualTo   |
| lessThan   |
| lowerCase   |
| mac   |
| maxDate   |
| maxLength   |
| maxNumber   |
| minDate   |
| minLength   |
| minNumber   |
| noneOf   |
| numeric   |
| odd   |
| oneOf   |
| password   |
| pattern   |
| prop   |
| propArray   |
| propObject   |
| range   |
| required   |
| time   |
| upperCase   |
| url   |


## Import modules
To work on form it is require to import angular modules(`FormsModule` and `ReactiveFormsModule`) and also import `RxReactiveFormsModule` which provides advanced/dynamic level validation features. All three modules register in the `NgModule` decorator `imports` property.
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
Consitency is required any enterprise level application. It is good to manage the error message on application wide, So configure the validation messages at the start of the application. 
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
## Validator Based Validation
There are 40+ validators, but the below code example is for alpha validation. The field will only valid, if the entered value is in alphabets. see the complete code example on **[stackblitz](https://stackblitz.com/edit/rxweb-alpha-validator-angular-reactive-form?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.ts)**.
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['',[RxwebValidators.alpha()]]
        });
    }
}
```
## Decorator Based Validation
There are 40+ Decorator based model validation. The below code covers required field validation via decorator. You have set decorator on top of property, other things automatically managed by `RxFormBuilder`. see the complete working example on ***[stackblitz](https://stackblitz.com/edit/rxweb-required-validation-add-angular-reactive-form)***
> user-info.model.ts
```js
import {  required, } from "@rxweb/reactive-form-validators"
export class UserInfo {

	@required() 
	firstName: string;

}
```
> user-info.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { UserInfo } from '../user-info.model';

@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let userInfo = new UserInfo();
        this.userInfoFormGroup = this.formBuilder.formGroup(userInfo);
    }
}

```

## Dynamic Validation
Dynamic validation is used, when the validation rules will come from server side, means there is no static code on client side to manage the validation on reactive form. 
Scenario : First Name field should accepts alphabets and that is configured on server side.
Below is the json for validation rule for `firstName` field. See the working code example on ***[stackblitz](https://stackblitz.com/edit/rxweb-alpha-dynamic-angular-reactive-form?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.ts)***
> dynamic-validation.json
```json
{
"firstName":{
  "alpha":true
}
}
```
First of all retrive the validation rules from server and pass it to the group method.
> user-info.component.ts
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient
    ) { }

    ngOnInit() {
        this.http.get('assets/dynamic-validation.json').subscribe(                      (dynamicValidationConfiguration:any) => {
        
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['John']
        },
        new FormBuilderConfiguration( {dynamicValidation: dynamicValidationConfiguration}
                ));
})
    }
}

```
## Conditional Validation
Some fields are required based on some other fields value, like if the `firstName` field contains the value of 'John' then the `lastName` field is required. see the working code example on ***[stackblitz](https://stackblitz.com/edit/rxweb-conditional-required-validator-angular-reactive-form?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.ts)***
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['',[RxwebValidators.required()]],
          lastName:['',[RxwebValidators.required({conditionalExpression:(x)=> x.firstName == 'John'})]]
        });
    }
}


```
## Single Validation Configuration for All Properties
This will manage configured validation on all properties. See the complete code example on ***[stackblitz](https://stackblitz.com/edit/rxweb-required-validator-once-all-properties?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.ts)***
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"

import { RxFormBuilder,FormBuilderConfiguration } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['',],
          lastName:['',]
        }, new FormBuilderConfiguration({applyAllProps:[Validators.required]}));
    }
}
```

## Better Way To Show Error Message
If you are generating a `FormGroup` via `RxFormBuilder` then you will get one extra property of `errorMessage` in every `FormControl`. This will show the current error message of the control. like `firstName` field is `required` and should accepts alphabets. In this case you don't need to write different code for showing different validator message. see the below code example :
```html
<div class="form-group">
    <label>First Name</label>
    <input type="text" formControlName="firstName" class="form-control"  />
    <small class="form-text text-danger" >{{userInfoFormGroup.controls.firstName.errorMessage}}<br/></small>
</div>
```
## Dirty Check
Check the form is dirty or not. On component side you have to create a FormGroup object via `RxFormBuilder`, afterthat you can use `isDirty` method from FormGroup object. See the dirty code example on ***[stackblitz](https://stackblitz.com/edit/rxweb-dirty-check-angular-reactive-form?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.html)***
```html
<h3 class="bd-title" id="content">required Validator once for all properties</h3>
<br/>
<form [formGroup]="userInfoFormGroup">
<div class="form-group">
    <label>First Name</label>
    <input type="text" formControlName="firstName" class="form-control"  />
    <small class="form-text text-danger" >{{userInfoFormGroup.controls.firstName.errorMessage}}<br/></small>
</div>
<div class="form-group">
    <label>Last Name</label>
    <input type="text" formControlName="lastName" class="form-control"  />
    <small class="form-text text-danger" >{{userInfoFormGroup.controls.lastName.errorMessage}}<br/></small>
    
</div>
<button [disabled]="!userInfoFormGroup.isDirty()" class="btn btn-primary">Submit</button>
</form>
```
## Complete Example of Model Based Decorator Validation
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
## More Information about validators and validation decorators  
Form more information please goto the **[rxweb](https://rxweb.github.io)** .
**[Demo Code Walkthrough and Download the code](https://stackblitz.com/edit/complete-rxweb-angular-reactive-form-validator-example)**

<img src="https://rxweb.blob.core.windows.net/test/CompleteValidator.gif"/>


# License
MIT
