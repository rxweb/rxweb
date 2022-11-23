
[![Build Status](https://dev.azure.com/ajayojha/rxweb/_apis/build/status/rxweb-CI?branchName=master)](https://dev.azure.com/ajayojha/rxweb/_build/latest?definitionId=39&branchName=master)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![npm version](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators.svg)](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rxweb/rxweb)


<h3>rxweb</h3>
The most powerful validation framework for angular based enterprise application. This provides all type of complex validation and dynamic validation on Reactive Form, Template Driven Form and Model Based Form.


> Angular forms provides good feature, but at some level code become messy to fulfil the complex validation scenarios, so the core objective is to provide optimum solution for basic, complex, conditional and dynamic validation for angular based enterprise applications. 
This validation framework is an extension of angular forms library, which will help to fulfil the need with less lines of code. 


For More Information on ***[rxweb](http://rxweb.io)***

**Which Version to use?**

| Angular version | Reactive Form Validators version         |
| --------------- | ---------------------- |
| Angular >= 13   | `@rxweb/reactive-form-validators@13.x` |
| Angular <= 12    | less than  `@rxweb/reactive-form-validators@13.x` |


# Prerequisites
Reactive Form Validators will work in angular projects.

## Table of Contents

* [Installation](#installation)
* [Import Modules](#import-modules)
* [Form Validation](#form-validation)
* [Sanitization](#sanitization)
* [Important Features](#important-features)
    * [Dynamic Validation](#dynamic-validation)
    * [Conditional Validation](#conditional-validation)
    * [Dirty Check](#dirty-check)
    * [Post as Form Data of Reactive Form value](#post-as-form-data-of-reactive-form-value)
    * [Post Image through form Data](#post-image-through-form-data)
    * [Reset Form](#reset-form)
    * [Compare Password](#compare-password)
    * [Single Error Message](#single-error-message)
* [Upcoming Form Validations](#upcoming-form-validations)
* [Goal](#goal)
* [Contributing](#contributing)
* [Need Help](#need-help) 
* [Feature Request](#feature-request)
* [License](#license)

## Installation
```bash
$ npm install @rxweb/reactive-form-validators
```
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

## Form Validation 
Three ways to apply validation on the form via Validators, Validation Decorators or Template Form.  

1. [allOf](#allof)    
2. [alpha](#alpha)   
3. [alphaNumeric](#alphanumeric)   
4. [ascii](#ascii) 
5. [choice](#choice) 
6. [compare](#compare)
7. [compose](#compose)
8. [contains](#contains)   
9. [creditCard](#creditcard)  
10. [dataUri](#datauri) 
11. [different](#different) 
12. [digit](#digit)  
13. [email](#email)  
14. [endsWith](#endswith) 
15. [even](#even)   
16. [extension](#extension)  
17. [factor](#factor)   
18. [file](#file)
19. [fileSize](#filesize) 
20. [greaterThanEqualTo](#greaterthanequalto)   
21. [greaterThan](#greaterthan)
22. [ip](#ip)
23. [image](#image)
24. [hexColor](#hexcolor)   
25. [json](#json)  
26. [latitude](#latitude) 
27. [latLong](#latlong) 
28. [leapYear](#leapyear)  
29. [lessThanEqualTo](#lessthanequalto)   
30. [lessThan](#lessthan)   
31. [longitude](#longitude)
32. [lowerCase](#lowercase) 
33. [mac](#mac) 
34. [maxDate](#maxdate) 
35. [maxLength](#maxlength)  
36. [maxNumber](#maxnumber)
37. [minDate](#mindate) 
38. [minLength](#minlength) 
39. [minNumber](#minnumber)   
40. [noneOf](#noneof)  
41. [numeric](#numeric) 
42. [odd](#odd)  
43. [oneOf](#oneof)  
44. [password](#password)
45. [pattern](#pattern)   
46. [port](#port) 
47. [primeNumber](#primenumber)
48. [range](#range)   
49. [required](#required)  
50. [startsWith](#startswith)
51. [time](#time)
52. [unique](#unique)
53. [upperCase](#uppercase)   
54. [url](#url)   

## allOf
allOf validation will check whether the user has entered all of the values of given field or not.
> Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.allOf({matchValues:["MVC", "AngularJS","AngularJS 5","C#"]})], 
        });
```       
> Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [allOf]='{"matchValues":"MVC","AngularJS","AngularJS","C#"}'/>{{tag.name}}
```
> Decorator Based Validation
```js
  @allOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]}) skills: string[];
```
___
## alpha   
Alpha validation will allow only alphabets to be entered. It will not allow any digit or special character.
> Reactive Form Validation
```js
this.countryFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.alpha()], 
        });
```       
> Template Form Validation
```html
<input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="country.countryName" alpha >
```
> Decorator Based Validation
```js
@alpha() countryName: string;
```
___
## alphaNumeric
Alpha Numeric validation will allow only alphabets and numbers to be entered, It will not allow any special character. 
> Reactive Form Validation
```js
  this.locationFormGroup = this.formBuilder.group({
            areaName:['', RxwebValidators.alphaNumeric()], 
        });
```       
> Template Form Validation
```html
<input id="areaName" name="areaName" class="form-control"
         [(ngModel)]="location.areaName" alphaNumeric >
```
> Decorator Based Validation
```js
@alphaNumeric() areaName: string;
```
___
## ascii
ascii validation decorator allows user to enter the input which is in the proper ascii format.
> Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            specialCharAsciiCode:['', RxwebValidators.ascii()], 
        });
```       
> Template Form Validation
```html
<input id="specialCharAsciiCode" name="specialCharAsciiCode" class="form-control"
         [(ngModel)]="user.specialCharAsciiCode" ascii >
```
> Decorator Based Validation
```js
@ascii() specialCharAsciiCode: string;
```
___
## choice
choice validation will check whether the value entered is matching the properties defined. 
> Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.choice({minLength:5})], 
        });
```       
> Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}"
        [(ngModel)]="employee.skills" [choice]='{"minLength":"5"}'/>{{tag.name}}
```
> Decorator Based Validation
```js
 @choice({minLength:'5'}) skills: string[]; 
```
___
## compare
Compare validation will compare two inputs whether they are same or not.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            password:['',], 
            confirmPassword:['', RxwebValidators.compare({fieldName:'password' })], 
        });
```       
> Template Form Validation
```html
<input id="confirmPassword" name="confirmPassword" class="form-control"
         [(ngModel)]="user.confirmPassword" [compare]='{"fieldName":"password"}'] >
```
> Decorator Based Validation
```js
@compare({fieldName:'password'}) confirmPassword: string;
```
___
## compose
Compose validation decorator is used to apply multiple validations on a particular field.
> Reactive Form Validation
```js
this.userForm = this.formBuilder.group({
  Username:['',[ RxwebValidators.compose({
validators:[
RxwebValidators.required(),
RxwebValidators.alpha()
],]]
});
```       
> Template Form Validation
```html
<input id="Username" name="Username" class="form-control"
         [(ngModel)]="user.Username" [compose]='{"validators":[alpha,required]}' >
```
> Decorator Based Validation
```js
@compose({validators:[alpha,required]}) Username: string;
```
___
## contains
Contains validation will check that value is in the input, It will not allow to enter input that not contains the predefined value.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            emailAddress:['', RxwebValidators.contains({value:'@gmail.com' })], 
        });
```       
> Template Form Validation
```html
<input id="emailAddress" name="emailAddress" class="form-control"
         [(ngModel)]="user.emailAddress" [contains]='{"fieldName":"@gmail.com"}' >
```
> Decorator Based Validation
```js
@contains({value:'@gmail.com'}) emailAddress: string;
```
___
## creditCard
creditCard validation will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            cardType:['',], 
            creditCardNumber:['', RxwebValidators.creditCard({fieldName:'cardType' })], 
        });
```       
> Template Form Validation
```html
<input id="creditCardNumber" name="creditCardNumber" class="form-control"
         [(ngModel)]="user.creditCardNumber" [creditCard]='{"fieldName":"cardType"}' >
```
> Decorator Based Validation
```js
@creditCard({fieldName:'cardType' }) creditCardNumber: string;
```
___
## dataUri
dataUri validation  allows user to enter the input which is a valid data Uri.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            htmlDataUri:['', RxwebValidators.dataUri()], 
        });
```
___
> Template Form Validation
```html
<input id="htmlDataUri" name="htmlDataUri" class="form-control"
         [(ngModel)]="user.htmlDataUri" dataUri >
```
> Decorator Based Validation
```js
@dataUri() htmlDataUri: string;
```
___
## different
Different validation  will check two inputs whether they are different or not. It is just opposite of compare decorator.
> Reactive Form Validation
```js
 this.accountInfoFormGroup = this.formBuilder.group({
            firstName:['',], 
            lastName:['', RxwebValidators.different({fieldName:"firstName" })], 
        });
```       
> Template Form Validation
```html
<input id="lastName" name="lastName" class="form-control"
         [(ngModel)]="account.lastName" [different]='{"fieldName":"firstName"}' >
```
> Decorator Based Validation
```js
@different({fieldName:"firstName" }) lastName: string;
```
___
## digit
Digit validation  will allow only digits to be entered, It will not allow any alphabets or special character.
> Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.digit()], 
        });
```       
> Template Form Validation
```html
<input id="age" name="age" class="form-control"
         [(ngModel)]="user.age" digit >
```
> Decorator Based Validation
```js
@digit() age: number;
```
___
## email
Email validation  will only allow user to enter input which is in the correct email format. 
> Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            email:['', RxwebValidators.email()], 
        });
```       
> Template Form Validation
```html
<input id="email" name="email" class="form-control"
         [(ngModel)]="user.email" email >
```
> Decorator Based Validation
```js
@email() email: string;
```
___
## endsWith
endsWith validation  allows user to enter the input which ends with particular value. 
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.endsWith({value:'m' })], 
        });
```       
> Template Form Validation
```html
<input id="name" name="name" class="form-control"
         [(ngModel)]="user.name" [endsWith]='{"value":"m"}' >
```
> Decorator Based Validation
```js
@endsWith({value:'m' }) name: string;
```
___
## even
Even validation  will check whether the value entered by user is an even number or not.
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            evenNumber:['', RxwebValidators.even()], 
        });
```       
> Template Form Validation
```html
<input id="evenNumber" name="evenNumber" class="form-control"
         [(ngModel)]="user.evenNumber" even >
```
> Decorator Based Validation
```js
@even() evenNumber: number;
```
___
## extension
extension validation allows user to enter the input which is in the proper extension format.
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            Image :['', RxwebValidators.extension({extensions:'png','jpg'})], 
        });
```       
> Template Form Validation
```html
<input id="Image" name="Image" class="form-control"
         [(ngModel)]="user.Image" [extension]='{"extensions":"png":"jpg"}' >
```
> Decorator Based Validation
```js
@extension({extensions:'png','jpg'}) Image: string;
```
___
## factor
factor validation  will allow user to enter factor of a number which is called dividend.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.factor({dividend:50 })], 
        });
```       
> Template Form Validation
```html
<input id="firstNumber" name="firstNumber" class="form-control"
         [(ngModel)]="user.firstNumber" [factor]='{"dividend":"50"}' >
```
> Decorator Based Validation
```js
@factor({dividend:50 })	firstNumber: Number;
```
___
## file
file validation validators allows user to validate whether how many files can be uploaded . It depends upon maxFiles and minFiles.
> Reactive Form Validation
```js
   this.userInfoFormGroup = this.formBuilder.group({
            totalDocumentFiles:['', RxwebValidators.file({minFiles:5 })], 
        });
```       
> Template Form Validation
```html
 <input type="file" name="totalImageFiles" multiple [(ngModel)]="userinfo.totalImageFiles"  class="form-control" [file]="             {'maxFiles':5}"/>
```
> Decorator Based Validation
```js
	@file({maxFiles:5 }) 
	totalImageFiles: number;
```
___
## fileSize
fileSize validation  allows user to enter the input which is in the proper file size format.
> Reactive Form Validation
```js
   this.storageCapacityFormGroup = this.formBuilder.group({
            videoStorageSize:['', RxwebValidators.fileSize({maxSize:50 })], 
        });
```       
> Template Form Validation
```html
<input id="videoStorageSize" name="videoStorageSize" class="form-control"
         [(ngModel)]="storage.videoStorageSize" [fileSize]='{"maxSize":"50"}' >
```
> Decorator Based Validation
```js
@fileSize({maxSize:50 }) videoStorageSize: string;
```
___
## greaterThanEqualTo
Greater than equal to validation decorator will check that input property is greater than or equal to the related field input.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age' })], 
        });
```       
> Template Form Validation
```html
<input id="voterAge" name="voterAge" class="form-control"
         [(ngModel)]="user.voterAge" [greaterThanEqualTo]='{"fieldName":"age"}' >
```
> Decorator Based Validation
```js
@greaterThanEqualTo({fieldName:'age' }) voterAge: number;
```
___
## greaterThan
Greater than validation will check that input property is greater than related field input.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThan({fieldName:'age' })], 
        });
```       
> Template Form Validation
```html
<input id="voterAge" name="voterAge" class="form-control"
         [(ngModel)]="user.voterAge" [greaterThan]='{"fieldName":"age"}' >
```
> Decorator Based Validation
```js
@greaterThan({fieldName:'age' }) voterAge: number;
```
___
## hexColor
HexColor validation will allow user to enter only the input in proper Hex Color format. 
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            color:['', RxwebValidators.hexColor()], 
        });
```       
> Template Form Validation
```html
<input id="color" name="color" class="form-control"
         [(ngModel)]="user.color" hexColor >
```
> Decorator Based Validation
```js
@hexColor() color: string;
```
___
## ip
ip validation validators is used to validate the ip address of the device.
> Reactive Form Validation
```js
    this.userFormGroup = this.formBuilder.group({
            ipV4:['', RxwebValidators.ip({version:1 })], 
        });
```       
___
## image
image validation validators allows user to validate image like height,width etc .
> Reactive Form Validation
```js
   this.userInfoFormGroup = this.formBuilder.group({
            profilePhoto:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100 })], 
        });
```       
> Template Form Validation
```html
  <input type="file" name="profilePhoto"  [(ngModel)]="userinfo.profilePhoto"  class="form-control" [image]="{'maxHeight':100,'maxWidth':100}"/>
```
> Decorator Based Validation
```js
	@image({maxHeight:100  ,maxWidth:100 }) 
	profilePhoto: string;
```
___
## json
json validation will allow user to enter the input only in proper Json format. 
> Reactive Form Validation
```js
 this.jsonInfoFormGroup = this.formBuilder.group({
            locationJson:['', RxwebValidators.json()], 
        });
```       
> Template Form Validation
```html
<input id="locationJson" name="locationJson" class="form-control"
         [(ngModel)]="json.locationJson" json >
```
> Decorator Based Validation
```js
@json() locationJson: string;
```
___
## latitude
latitude validation allows user to enter value which is valid latitude.
> Reactive Form Validation
```js
this.numberInfoFormGroup = this.formBuilder.group({
            firstCountryLatitude:['', RxwebValidators.latitude()], 
        });
```       
> Template Form Validation
```html
<input id="firstCountryLatitude" name="firstCountryLatitude" class="form-control"
         [(ngModel)]="number.firstCountryLatitude" latitude >
```
> Decorator Based Validation
```js
@latitude() firstCountryLatitude: string;
```
___
## leapYear
LeapYear validation will check whether the value entered is a leap year or not.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            birthYear:['', RxwebValidators.leapYear()], 
        });
```       
> Template Form Validation
```html
<input id="birthYear" name="birthYear" class="form-control"
         [(ngModel)]="user.birthYear" leapYear >
```
> Decorator Based Validation
```js
@leapYear() birthYear: number;
```
___
## latLong
latLong validation allows user to enter the input which is valid Latitude or longitude.
> Reactive Form Validation
```js
 this.countryFormGroup = this.formBuilder.group({
            firstCountry:['', RxwebValidators.latLong()], 
        });
```       
> Template Form Validation
```html
<input id="firstCountry" name="firstCountry" class="form-control"
         [(ngModel)]="country.firstCountry" latLong >
```
> Decorator Based Validation
```js
@latLong() firstCountry: string;
```
___
## lessThanEqualTo
Less than equal to validation will allow the user to enter only that value which is less than oe equal to the value in the pre defined field. 
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            totalMarks:['',], 
            marks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks' })], 
        });
```       
> Template Form Validation
```html
<input id="marks" name="marks" class="form-control"
         [(ngModel)]="user.marks" [lessThanEqualTo]='{"fieldName":"totalMarks"}' >
```
> Decorator Based Validation
```js
@lessThanEqualTo({fieldName:'totalMarks' }) marks: number;
```
___
## lessThan
Less than validation will allow the user to enter only that value which is less than the value in the pre defined field.
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            marks:['',], 
            passingMarks:['', RxwebValidators.lessThan({fieldName:'marks' })], 
        });
```       
> Template Form Validation
```html
<input id="passingMarks" name="passingMarks" class="form-control"
         [(ngModel)]="user.passingMarks" [lessThan]='{"fieldName":"marks"}' >
```
> Decorator Based Validation
```js
@lessThan({fieldName:'marks' }) passingMarks: number;
```
___
## longitude
longitude validation allows user to enter the input which is in the proper longitude format.
> Reactive Form Validation
```js
   this.numberInfoFormGroup = this.formBuilder.group({
            firstCountryLongitude:['', RxwebValidators.longitude()], 
        });
```       
> Template Form Validation
```html
<input id="firstCountryLongitude" name="firstCountryLongitude" class="form-control"
         [(ngModel)]="number.firstCountryLongitude" longitude >
```
> Decorator Based Validation
```js
@longitude() firstCountryLongitude: string;
```
___
## lowercase
lowerCase validation will allow user to enter only the lowercase alphabets.
> Reactive Form Validation
```js
     this.userInfoFormGroup = this.formBuilder.group({
            username:['', RxwebValidators.lowerCase()], 
        });
```       
> Template Form Validation
```html
<input id="username" name="username" class="form-control"
         [(ngModel)]="user.username" lowercase >
```
> Decorator Based Validation
```js
@lowerCase() username: string;
```
___
## mac
mac validation will check whether the value entered is a valid mac address.
> Reactive Form Validation
```js
     this.macAddressInfoFormGroup = this.formBuilder.group({
            systemMacAddress:['', RxwebValidators.mac()], 
        });
```       
> Template Form Validation
```html
<input id="systemMacAddress" name="systemMacAddress" class="form-control"
         [(ngModel)]="macAddress.systemMacAddress" mac >
```
> Decorator Based Validation
```js
@mac() systemMacAddress: string;
```
___
## maxDate
MaxDate validation will allow user to enter the date less than the maxDate value parameter.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30) })], 
        });
```       
> Template Form Validation
```html
<input id="registrationDate" name="registrationDate" class="form-control"
         [(ngModel)]="user.registrationDate" [maxDate]='{"value":"2018-07-30"}' >
```
> Decorator Based Validation
```js
@maxDate({value:new Date(2018,7,30) }) registrationDate: Date;
```
___
## maxLength
MaxLength validation will allow user to enter the input upto the maximum length value parameter.
> Reactive Form Validation
```js
  this.locationFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.maxLength({value:10 })], 
        });
```       
> Template Form Validation
```html
<input id="firstName" name="firstName" class="form-control"
         [(ngModel)]="location.firstName" [maxLength]='{"value":"10"}' >
```
> Decorator Based Validation
```js
@maxLength({value:10 })	firstName: string;
```
___
## maxNumber
MaxNumber validation will allow user to enter the input upto the maximum number value parameter.
> Reactive Form Validation
```js
 this.subjectDetailsFormGroup = this.formBuilder.group({
            passingMarks:['', RxwebValidators.maxNumber({value:50 })], 
        });
```       
> Template Form Validation
```html
<input id="passingMarks" name="passingMarks" class="form-control"
         [(ngModel)]="subject.passingMarks" [maxNumber]='{"value":"50"}' >
```
> Decorator Based Validation
```js
@maxNumber({value:50 }) passingMarks: number;
```
___
## minDate
Minimum Date validation will allow user to enter date greater the minimum date value parameter.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.minDate({value:new Date(2018,7,30) })], 
        });
```       
> Template Form Validation
```html
<input id="registrationDate" name="registrationDate" class="form-control"
         [(ngModel)]="user.registrationDate"  [minDate]='{"value":"2018-07-30"}' >
```
> Decorator Based Validation
```js
@minDate({value:new Date(2018,7,30) }) registrationDate: Date;
```
___
## minLength
MinLength validation will allow user to enter the input length matching the minimum length value parameter.
> Reactive Form Validation
```js
this.contactFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.minLength({value:8 })], 
        });
```       
> Template Form Validation
```html
<input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="country.countryName" [minLength]='{"value":"8"}' >
```
> Decorator Based Validation
```js
@minLength({value:8 }) countryName: string;
```
___
## minNumber
MinNumber validation will allow user to enter the input greater than the minimum number value parameter.
> Reactive Form Validation
```js
  this.resultInfoFormGroup = this.formBuilder.group({
            maths:['', RxwebValidators.minNumber({value:35 })], 
        });
``` 
___
> Template Form Validation
```html
<input id="maths" name="maths" class="form-control"
         [(ngModel)]="result.maths" [minNumber]='{"value":"35"}' >
```
> Decorator Based Validation
```js
	@minNumber({value:35 }) maths: number;
```
___
## noneOf
noneOf validation will check whether the user has entered none of the value is selected from the given inputs.
> Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.noneOf({matchValues:["MVC", "AngularJS","Angular 5","C#"]})], 
        });
```       
> Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [noneOf]='{"matchvalues":"MVC","AngularJS","Angular 5","C#"}'/>{{tag.name}}
```
> Decorator Based Validation
```js
  @noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]})  skills: string[];
```
___
## numeric
numeric validation will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.
> Reactive Form Validation
```js
 this.userInfoFormGroup = this.formBuilder.group({
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false })], 
        });
```       
> Template Form Validation
```html
<input id="integerNumber" name="integerNumber" class="form-control"
         [(ngModel)]="user.integerNumber" [numeric]='{"acceptValue":"NumericValueType.PositiveNumber","allowDecimal":"false"}' >
```
> Decorator Based Validation
```js
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }) integerNumber: number;
```
___
## odd
Odd validation will check whether the value entered is an odd number or not.
> Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            oddNumber:['', RxwebValidators.odd()], 
        });
```       
> Template Form Validation
```html
<input id="oddNumber" name="oddNumber" class="form-control"
         [(ngModel)]="user.oddNumber" odd >
```
> Decorator Based Validation
```js
	@odd() oddNumber: number;
```
___
## oneOf
oneOf validation will check whether the user has entered any one of the given inputs or not.
> Reactive Form Validation
```js
    this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.oneOf({matchValues:["MVC", "AngularJS","Angular 5","C#"]})], 
        });
```       
> Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [oneOf]='{"matchvalues":"MVC","AngularJS","Angular 5","C#"}'/>{{tag.name}}
```
> Decorator Based Validation
```js
 @oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]}) skills: string[];
```
___
## password
Password validation will allow user to enter only the input according to correct password validation format.
> Reactive Form Validation
```js
  this.loginInfoFormGroup = this.formBuilder.group({
            password:['', RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} })], 
        });
```       
> Template Form Validation
```html
 <input id="password" name="password" class="form-control"
         [(ngModel)]="login.password" [password]='{"validation":{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}}' >
 >
```
> Decorator Based Validation
```js
@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} })	password: string;
```
___
## pattern
Pattern validation will allow user to enter the input which match the predefined pattern value parameter.
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            userName:['', RxwebValidators.pattern({expression:{'onlyAlpha': /^[A-Za-z]+$/} })], 
        });
```       
> Template Form Validation
```html
 <input id="userName" name="userName" class="form-control"
         [(ngModel)]="user.userName" [pattern]='{"expression":{'onlyAlpha': /^[A-Za-z]+$/}}' >
```
> Decorator Based Validation
```js
	@pattern({expression:{'onlyAlpha': /^[A-Za-z]+$/} }) userName: string;
```
___
## port
port validation allows user to enter the input which is a valid port number.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            educationalWebsitePort:['', RxwebValidators.port()], 
        });
```       
> Template Form Validation
```html
 <input id="educationalWebsitePort" name="educationalWebsitePort" class="form-control"
         [(ngModel)]="user.educationalWebsitePort" port >
```
> Decorator Based Validation
```js
		@port()	educationalWebsitePort: string;
```
___
## primeNumber
primeNumber validation allows user to enter only prime number.
> Reactive Form Validation
```js
 this.numberInfoFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.primeNumber()], 
        });
```       
> Template Form Validation
```html
 <input id="firstNumber" name="firstNumber" class="form-control"
         [(ngModel)]="user.firstNumber" primeNumber >
```
> Decorator Based Validation
```js		
	@primeNumber() firstNumber: string;
```
___
## range
Range validation will check that the entered value is in the specified range
> Reactive Form Validation
```js
this.employeeInfoFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
        });
```       
> Template Form Validation
```html
 <input id="age" name="age" class="form-control"
         [(ngModel)]="employee.age" [range]='{"minimumNumber":"18","maximumNumber":"60"}' >
```
> Decorator Based Validation
```js		
  @range({minimumNumber:18  ,maximumNumber:60 }) age: number;
```
___
## required
Required validation will check that the user has entered the value in the property or not.
> Reactive Form Validation
```js
this.userInfoFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.required()], 
        });
```       
> Template Form Validation
```html
 <input id="firstName" name="firstName" class="form-control"
         [(ngModel)]="user.firstName" required >
```
> Decorator Based Validation
```js		
 @required() firstName: string;
```
___
## startsWith
startsWith validation allows user to enter the input which starts with particular value.
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.startsWith({value:'n' })], 
        });
```       
> Template Form Validation
```html
 <input id="name" name="name" class="form-control"
         [(ngModel)]="user.name" [startsWith]='{"value":"n"}'>
```
> Decorator Based Validation
```js		
 @startsWith({value:'n' }) name: string;
```
___
## time
time validation will allow user to enter the input only in the correct time format.
> Reactive Form Validation
```js
  this.attandanceDetailFormGroup = this.formBuilder.group({
            entryTime:['', RxwebValidators.time()], 
        });
```       
> Template Form Validation
```html
 <input id="entryTime" name="entryTime" class="form-control"
         [(ngModel)]="attandance.entryTime" time >
```
> Decorator Based Validation
```js		 
	@time() entryTime: string;
```
___
## unique
Unique validation validators is used to validate unique input based on formArray.
> Reactive Form Validation
```js
 this.employeeFormGroup = this.formBuilder.group({
            fullName:[''], 
            skills:this.formBuilder.array([
              this.getSkillFormGroup()
            ])
        });
        
         addSkill(){
        let skillsArray = <FormArray>this.employeeFormGroup.controls.skills;
        skillsArray.push(this.getSkillFormGroup());
      }
      
     getSkillFormGroup(){
        return this.formBuilder.group({
          skillName:['',RxwebValidators.unique()]
        })
      }
```       
> Decorator Based Validation
```js		 
  @unique()
	skillName: string[];
```
___
## upperCase
UpperCase validation will allow user to enter the alphabets only in the upperCase format. 
> Reactive Form Validation
```js
        this.locationFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.upperCase()], 
        });
```       
> Template Form Validation
```html
 <input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="location.countryName" upperCase >
```
> Decorator Based Validation
```js		 
@upperCase() countryName: string;
```
___
## url
Url validation will check that value entered in the property is in the correct url format or not.
> Reactive Form Validation
```js
      this.webSiteInfoModelFormGroup = this.formBuilder.group({
            adminWebsiteUrl:['', RxwebValidators.url()], 
        });
```       
> Template Form Validation
```html
 <input id="adminWebsiteUrl" name="adminWebsiteUrl" class="form-control"
         [(ngModel)]="website.adminWebsiteUrl" url >
```
> Decorator Based Validation
```js		 
@url() adminWebsiteUrl: string;
```
___

## Sanitization
1. [blacklist](#blacklist)  
2. [ltrim](#ltrim)
3. [rtrim](#rtrim)
4. [toBoolean](#toboolean)
5. [toDate](#todate)
6. [toDouble](#todouble)
7. [toInt](#toint)
8. [toString](#tostring)
9. [trim](#trim)
10. [whitelist](#whitelist)

## blacklist
Remove the characters form the user entered value.
```js
  @prop()
  @blacklist('abc' ) 
  freeText: string;
```
___
## ltrim
Trim characters from the left-side of the input.
```js
  @prop()
  @ltrim() 
  freeText: string;
```
___
## rtrim
Trim characters from the right-side of the input.
```js
  @prop()
  @rtrim() 
  freeText: string;
```
___
## toBoolean
Convert the input to a boolean.
```js
  @prop()
  @toBoolean() 
  Active: boolean;
```
___
## toDate
Convert the input to a date, or null if the input is not a date.
```js
  @prop()
  @toDate() 
  dob: Date;
```
___
## toDouble
Convert the input to a float, or NAN if the input is not a float.
```js
  @prop()
  @toDouble() 
  amount: number;
```
___
## toInt
Convert the input to an integer, or NAN if the input is not an integer.
```js
  @prop()
  @toInt() 
  amount: number;
```
___
## toString
Convert the input to a string.
```js
  @prop()
  @toString() 
  freeText: string;
```
___
## trim
Trim characters from the input.
```js
  @prop()
  @trim() 
  freeText: string;
```
___
## whitelist
Remove characters that do not appear in the whitelist.
```js
  @prop()
  @whitelist('abc' ) 
  freeText: string;
```
___

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
First of all retrieve the validation rules from server and pass it to the group method.
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
## Post as Form Data of Reactive Form value
This provides a `toFormData()` method which converts the FormGroup value into the FormData. Here is an example of Post as FormData of Reactive Form value. See the working code example on ***[stackblitz](https://stackblitz.com/angular/nvpxmkolygpx?file=src%2Fapp%2Fformadata-complete.component.ts)***
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            firstName:[''], 
            lastName :[''],
            userName:[''],
            password : ['']
        });     
	
     addUser(){
         let formdata = this.userFormGroup.toFormData()
       this.http.post(this.api, formdata); // This is fake uri, This is just for your reference.
      }
```   
## Post Image through form Data
To create fileObject from the input we have to set writeFile="true" attribute on the HTMLInputFileElement. Here is an example of Post Image through formData. See the working code example on ***[stackblitz](https://stackblitz.com/edit/angular-zzzxd1?file=src/app/fileobject-complete.component.ts)***
> Reactive Form Validation
```js
   this.userInfoFormGroup = this.formBuilder.group({
            profilePhoto:[''], 
        });
    
      addUser(){
         let formdata = (<FormGroupExtension>this.userInfoFormGroup).toFormData()
       this.http.post(this.api, formdata); // This is fake uri, This is just for your reference.      
      }
```   
```html
 <input type="file" [writeFile]="true" formControlName="profilePhoto" class="form-control" multiple />
``` 
## Reset Form
RxFormBuilder provide a solution for reset form of angular reactive form object. If you want to reset the form as per the value initialized while creating an instance of the formControls, you can use resetForm()method of FormGroupExtension. See the working code example on ***[stackblitz](https://stackblitz.com/edit/angular-rfjvfk?file=src/app/reset-complete.component.ts)***
> Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
    firstName:[''],
    lastName:[''],
    userName:[''],
    password:['']
        });
    
     resetForm(){
      (<FormGroupExtension>this.userFormGroup).resetForm();
      }
```   
## Compare Password
Compare validation is used to check whether the value of two formControls are same or not .Here is an example of comparing password.
 field. See the working code example on ***[stackblitz](https://stackblitz.com/angular/nlylepgknjb?file=src%2Fapp%2Fcompare-field-name.component.ts)***
> Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            password:['',], 
            confirmPassword:['', RxwebValidators.compare({fieldName:'password' })], 
        });
```       
> Template Form Validation
```html
<input id="confirmPassword" name="confirmPassword" class="form-control"
         [(ngModel)]="user.confirmPassword" [compare]='{"fieldName":"password"}'] >
```
> Decorator Based Validation
```js
@compare({fieldName:'password'}) confirmPassword: string;
```
## Single Error Message
You can a single default message for a formControl and display it in single errormessage without multiple conditions ***[stackblitz](https://stackblitz.com/edit/angular-best-way-to-show-error-message-reactive-form?file=src%2Fapp%2Fapp.component.html)***
```html
  <input type="text" formControlName="userName" class="form-control"  />
    {{userFormGroup.controls.userName["errorMessage"]}}
```

In ReactiveFormConfig set the global validation message
```  ReactiveFormConfig.set({
      "validationMessage":{
    "required":"This field is required",
      "minLength":"minimum length is {{0}}",
      "maxLength":"allowed max length is {{0}}"
      }
    });
    
      this.userFormGroup = this.formBuilder.group({
     userName:['',[RxwebValidators.required(),RxwebValidators.minLength({value:5}),RxwebValidators.maxLength({value:10})]]
    })
```

## Upcoming Form Validations
1. Masking.
2. Phone/Mobile Number Masking.
3. Countrywise Masking.
4. Alphabet validation in other languages.
5. AlphaNumeric validation in other languages.
6. File Validation(size, extension, width and height validation).

## Goal
1. Provides all type of client side validations.
2. Easy implementation of complex and dynamic validation with less lines of code.
3. Faster development for Advanced/Complex validation Forms.

## Contributing
If you are thinking to make rxweb framework better, that's truly great. You can contribute from a single character to core architectural work or significant documentation – all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are don’t feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches.

Check out the <a href="https://rxweb.io/community/where_to_start_contributing">docs</a> on how you can put your precious efforts on the rxweb framework and contribute in the respective area.

## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT
