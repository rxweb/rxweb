[![npm version](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators.svg)](https://badge.fury.io/js/%40rxweb%2Freactive-form-validators)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

<h3>rxweb</h3>
50+ Validation Decorator and 50+ Validators for angular reactive form based validation. All Validators/Decorators provides extensive features like conditional validation, dynamic validation and advanced validation, also it includes dirty check and better way to show error message on FormControl or FormGroup level. For More Information on ***[rxweb](http://rxweb.io)***

# Prerequisites
Reactive Form Validators will work in angular projects.

## Table of Contents

* [Installation](#installation)
* [Validators](#validation-decorators)
* [Important Features](#important-features)
    * [Import Modules](#import-modules)
    * [Configure Global Validation Messages](#configure-global-validation-messages)
    * [Validator Based Validation](#validator-based-validation)
    * [Decorator Based Validation](#decorator-based-validation)
    * [Dynamic Validation](#dynamic-validation)
    * [Conditional Validation](#conditional-validation)
    * [Single Validation Configuration for All Properties](#single-validation-configuration-for-all-properties)
    * [Dirty Check](#dirty-check)
    * [Complete Example of Model Based Decorator Validation](#complete-example-of-model-based-decorator-validation)
    * [More Information about validators and validation decorators](#more-information-about-validators-and-validation-decorators)
    
* [License](#license)

## Installation
```bash
$ npm install @rxweb/reactive-form-validators
```
## Validators
```Validation can be applied via Validators or Decorators. If you are using validators then you don't need to import any module, you can directly as same as Angular validators in the 'FormControl'. This validators are more advanced than angular validators.``` 

| Name | Description |
| ----------- | ------------- |
| [allOf](#allOf)     | allOf validation will check whether the user has entered all of the values of given field or not. | 
| [alpha](#alpha)   | Alpha validation will allow only alphabets to be entered. It will not allow any digit or special character. |
| [alphaNumeric](#alphaNumeric)   |  Alpha Numeric validation will allow only alphabets and numbers to be entered, It will not allow any special character. |
| [ascii](#ascii) | ascii validation allows user to enter the input which is in the proper ascii format. |
| [choice](#choice)   | choice validation will check whether the value entered is matching the properties defined. |
| [compare](#compare)   |  Compare validation will compare two inputs whether they are same or not.|
| [contains](#contains)   |  Contains validation will check that value is in the input, It will not allow to enter input that not contains the predefined value. |
| [creditCard](#creditCard)   | creditCard validation will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.|
| [dataUri](#dataUri) | dataUri validation  allows user to enter the input which is a valid data Uri. |
| [different](#different)   |  Different validation  will check two inputs whether they are different or not. It is just opposite of compare decorator. |
| [digit](#digit)   |  Digit validation  will allow only digits to be entered, It will not allow any alphabets or special character. |
| [email](#email)   |  Email validation  will only allow user to enter input which is in the correct email format. |
| [endsWith](#endsWith) | endsWith validation  allows user to enter the input which ends with particular value. |
| [even](#even)   | Even validation  will check whether the value entered by user is an even number or not. |
| [factor](#factor)   | factor validation  will allow user to enter factor of a number which is called dividend.  |
| [fileSize](#fileSize) | fileSize validation  allows user to enter the input which is in the proper file size format. |
| [greaterThanEqualTo](#greaterThanEqualTo)   | Greater than equal to validation decorator will check that input property is greater than or equal to the related field input. |
| [greaterThan](#greaterThan)   | Greater than validation will check that input property is greater than related field input.|
| [hexColor](#hexColor)   | HexColor validation will allow user to enter only the input in proper Hex Color format. |
| [json](#json)   | json validation will allow user to enter the input only in proper Json format. |
| [latitude](#laititude) |  latitude validation allows user to enter value which is valid latitude. |
| [latLong](#latLong) | latLong validation allows user to enter the input which is valid Latitude or longitude. |
| [leapYear](#leapYear)   | LeapYear validation will check whether the value entered is a leap year or not. |
| [lessThanEqualTo](#lessThanEqualTo)   | Less than equal to validation will allow the user to enter only that value which is less than oe equal to the value in the pre defined field. |
| [lessThan](#lessThan)   | Less than validation will allow the user to enter only that value which is less than the value in the pre defined field. |
| [longitude](#longitude) | longitude validation allows user to enter the input which is in the proper longitude format. |
| [lowerCase](#lowerCase)   | lowerCase validation will allow user to enter only the lowercase alphabets. |
| [mac](#mac)  | mac validation will check whether the value entered is a valid mac address. |
| [maxDate](#maxDate)  |  MaxDate validation will allow user to enter the date less than the maxDate value parameter. |
| [maxLength](#maxLength)   |  MaxLength validation will allow user to enter the input upto the maximum length value parameter.|
| [maxNumber](#maxNumber) | MaxNumber validation will allow user to enter the input upto the maximum number value parameter.|
| [minDate](#minDate)   |  Minimum Date validation will allow user to enter date greater the minimum date value parameter. |
| [minLength](#minLength)   | MinLength validation will allow user to enter the input length matching the minimum length value parameter.|
| [minNumber](#minNumber)   |  MinNumber validation will allow user to enter the input greater than the minimum number value parameter.|
| [noneOf](#noneOf)  |  noneOf validation will check whether the user has entered none of the value is selected from the given inputs.|
| [numeric](#numeric)  | numeric validation will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.|
| [odd](#odd)   | Odd validation will check whether the value entered is an odd number or not. |
| [oneOf](#oneOf)  | oneOf validation will check whether the user has entered any one of the given inputs or not.|
| [password](#password)  | Password validation will allow user to enter only the input according to correct password validation format.|
| [pattern](#pattern)   | Pattern validation will allow user to enter the input which match the predefined pattern value parameter.|
| [port](#port) | port validation allows user to enter the input which is a valid port number. |
| [primeNumber](#primeNumber) |  primeNumber validation allows user to enter only prime number. |
| [range](#range)   | Range validation will check that the entered value is in the specified range. |
| [required](#required)   |  Required validation will check that the user has entered the value in the property or not. |
| [startsWith](#startsWith) | startsWith validation allows user to enter the input which starts with particular value. |
| [time](#time)   | time validation will allow user to enter the input only in the correct time format. |
| [upperCase](#upperCase)   | UpperCase validation will allow user to enter the alphabets only in the upperCase format. |
| [url](#url)   | Url validation will check that value entered in the property is in the correct url format or not. |

### alpha
##### Reactive Form Validation
```js
this.countryFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.alpha()], 
        });
```       
##### Template Form Validation
```html
<input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="country.countryName" alpha >
```
##### Decorator Based Validation
```js
@alpha() countryName: string;
```
### alphaNumeric
##### Reactive Form Validation
```js
  this.locationFormGroup = this.formBuilder.group({
            areaName:['', RxwebValidators.alphaNumeric()], 
        });
```       
##### Template Form Validation
```html
<input id="areaName" name="areaName" class="form-control"
         [(ngModel)]="location.areaName" alphaNumeric >
```
##### Decorator Based Validation
```js
@alphaNumeric() areaName: string;
```
### allOf
##### Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.allOf({matchValues:["MVC", "AngularJS","AngularJS 5","C#"]})], 
        });
```       
##### Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [allOf]='{"matchValues":"MVC","AngularJS","AngularJS","C#"}'/>{{tag.name}}
```
##### Decorator Based Validation
```js
  @allOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]}) skills: string[];
```
### choice
##### Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.choice({minLength:'5'})], 
        });
```       
##### Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}"
        [(ngModel)]="employee.skills" [choice]='{"minLength":"5"}'/>{{tag.name}}
```
##### Decorator Based Validation
```js
 @choice({minLength:'5'}) skills: string[]; 
```
### ascii
##### Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            specialCharAsciiCode:['', RxwebValidators.ascii()], 
        });
```       
##### Template Form Validation
```html
<input id="specialCharAsciiCode" name="specialCharAsciiCode" class="form-control"
         [(ngModel)]="user.specialCharAsciiCode" ascii >
```
##### Decorator Based Validation
```js
@ascii() specialCharAsciiCode: string;
```
### compare
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            password:['',], 
            confirmPassword:['', RxwebValidators.compare({fieldName:'password' })], 
        });
```       
##### Template Form Validation
```html
<input id="confirmPassword" name="confirmPassword" class="form-control"
         [(ngModel)]="user.confirmPassword" [compare]='{"fieldName":"password"}'] >
```
##### Decorator Based Validation
```js
@compare({fieldName:'password'}) confirmPassword: string;
```
### contains
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            emailAddress:['', RxwebValidators.contains({value:'@gmail.com' })], 
        });
```       
##### Template Form Validation
```html
<input id="emailAddress" name="emailAddress" class="form-control"
         [(ngModel)]="user.emailAddress" [contains]='{"fieldName":"@gmail.com"}' >
```
##### Decorator Based Validation
```js
@contains({value:'@gmail.com'}) emailAddress: string;
```
### creditCard
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            cardType:['',], 
            creditCardNumber:['', RxwebValidators.creditCard({fieldName:'cardType' })], 
        });
```       
##### Template Form Validation
```html
<input id="creditCardNumber" name="creditCardNumber" class="form-control"
         [(ngModel)]="user.creditCardNumber" [creditCard]='{"fieldName":"cardType"}' >
```
##### Decorator Based Validation
```js
@creditCard({fieldName:'cardType' }) creditCardNumber: string;
```
### dataUri
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            htmlDataUri:['', RxwebValidators.dataUri()], 
        });
```       
##### Template Form Validation
```html
<input id="htmlDataUri" name="htmlDataUri" class="form-control"
         [(ngModel)]="user.htmlDataUri" dataUri >
```
##### Decorator Based Validation
```js
@dataUri() htmlDataUri: string;
```
### different
##### Reactive Form Validation
```js
 this.accountInfoFormGroup = this.formBuilder.group({
            firstName:['',], 
            lastName:['', RxwebValidators.different({fieldName:"firstName" })], 
        });
```       
##### Template Form Validation
```html
<input id="lastName" name="lastName" class="form-control"
         [(ngModel)]="account.lastName" [different]='{"fieldName":"firstName"}' >
```
##### Decorator Based Validation
```js
@different({fieldName:"firstName" }) lastName: string;
```
### digit
##### Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.digit()], 
        });
```       
##### Template Form Validation
```html
<input id="age" name="age" class="form-control"
         [(ngModel)]="user.age" digit >
```
##### Decorator Based Validation
```js
@digit() age: number;
```
### email
##### Reactive Form Validation
```js
   this.userFormGroup = this.formBuilder.group({
            email:['', RxwebValidators.email()], 
        });
```       
##### Template Form Validation
```html
<input id="email" name="email" class="form-control"
         [(ngModel)]="user.email" email >
```
##### Decorator Based Validation
```js
@email() email: string;
```
### endsWith
##### Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.endsWith({value:'m' })], 
        });
```       
##### Template Form Validation
```html
<input id="name" name="name" class="form-control"
         [(ngModel)]="user.name" [endsWith]='{"value":"m"}' >
```
##### Decorator Based Validation
```js
@endsWith({value:'m' }) name: string;
```
### even
##### Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            evenNumber:['', RxwebValidators.even()], 
        });
```       
##### Template Form Validation
```html
<input id="evenNumber" name="evenNumber" class="form-control"
         [(ngModel)]="user.evenNumber" even >
```
##### Decorator Based Validation
```js
@even() evenNumber: number;
```
### factor
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.factor({dividend:50 })], 
        });
```       
##### Template Form Validation
```html
<input id="firstNumber" name="firstNumber" class="form-control"
         [(ngModel)]="user.firstNumber" [factor]='{"dividend":"50"}' >
```
##### Decorator Based Validation
```js
@factor({dividend:50 })	firstNumber: Number;
```
### fileSize
##### Reactive Form Validation
```js
   this.storageCapacityFormGroup = this.formBuilder.group({
            videoStorageSize:['', RxwebValidators.fileSize({maxSize:50 })], 
        });
```       
##### Template Form Validation
```html
<input id="videoStorageSize" name="videoStorageSize" class="form-control"
         [(ngModel)]="storage.videoStorageSize" [fileSize]='{"maxSize":"50"}' >
```
##### Decorator Based Validation
```js
@fileSize({maxSize:50 }) videoStorageSize: string;
```
### greaterThanEqualTo
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age' })], 
        });
```       
##### Template Form Validation
```html
<input id="voterAge" name="voterAge" class="form-control"
         [(ngModel)]="user.voterAge" [greaterThanEqualTo]='{"fieldName":"age"}' >
```
##### Decorator Based Validation
```js
@greaterThanEqualTo({fieldName:'age' }) voterAge: number;
```
### greaterThan
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThan({fieldName:'age' })], 
        });
```       
##### Template Form Validation
```html
<input id="voterAge" name="voterAge" class="form-control"
         [(ngModel)]="user.voterAge" [greaterThan]='{"fieldName":"age"}' >
```
##### Decorator Based Validation
```js
@greaterThan({fieldName:'age' }) voterAge: number;
```
### hexColor
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            color:['', RxwebValidators.hexColor()], 
        });
```       
##### Template Form Validation
```html
<input id="color" name="color" class="form-control"
         [(ngModel)]="user.color" hexColor >
```
##### Decorator Based Validation
```js
@hexColor() color: string;
```
### json
##### Reactive Form Validation
```js
 this.jsonInfoFormGroup = this.formBuilder.group({
            locationJson:['', RxwebValidators.json()], 
        });
```       
##### Template Form Validation
```html
<input id="locationJson" name="locationJson" class="form-control"
         [(ngModel)]="json.locationJson" json >
```
##### Decorator Based Validation
```js
@json() locationJson: string;
```
### latitude
##### Reactive Form Validation
```js
this.numberInfoFormGroup = this.formBuilder.group({
            firstCountryLatitude:['', RxwebValidators.latitude()], 
        });
```       
##### Template Form Validation
```html
<input id="firstCountryLatitude" name="firstCountryLatitude" class="form-control"
         [(ngModel)]="number.firstCountryLatitude" latitude >
```
##### Decorator Based Validation
```js
@latitude() firstCountryLatitude: string;
```
### leapYear
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            birthYear:['', RxwebValidators.leapYear()], 
        });
```       
##### Template Form Validation
```html
<input id="birthYear" name="birthYear" class="form-control"
         [(ngModel)]="user.birthYear" leapYear >
```
##### Decorator Based Validation
```js
@leapYear() birthYear: number;
```
### latLong
##### Reactive Form Validation
```js
 this.countryFormGroup = this.formBuilder.group({
            firstCountry:['', RxwebValidators.latLong()], 
        });
```       
##### Template Form Validation
```html
<input id="firstCountry" name="firstCountry" class="form-control"
         [(ngModel)]="country.firstCountry" latLong >
```
##### Decorator Based Validation
```js
@latLong() firstCountry: string;
```
### lessThanEqualTo
##### Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            totalMarks:['',], 
            marks:['', RxwebValidators.lessThanEqualTo({fieldName:'totalMarks' })], 
        });
```       
##### Template Form Validation
```html
<input id="marks" name="marks" class="form-control"
         [(ngModel)]="user.marks" [lessThanEqualTo]='{"fieldName":"totalMarks"}' >
```
##### Decorator Based Validation
```js
@lessThanEqualTo({fieldName:'totalMarks' }) marks: number;
```
### lessThan
##### Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            marks:['',], 
            passingMarks:['', RxwebValidators.lessThan({fieldName:'marks' })], 
        });
```       
##### Template Form Validation
```html
<input id="passingMarks" name="passingMarks" class="form-control"
         [(ngModel)]="user.passingMarks" [lessThan]='{"fieldName":"marks"}' >
```
##### Decorator Based Validation
```js
@lessThan({fieldName:'marks' }) passingMarks: number;
```
### longitude
##### Reactive Form Validation
```js
   this.numberInfoFormGroup = this.formBuilder.group({
            firstCountryLongitude:['', RxwebValidators.longitude()], 
        });
```       
##### Template Form Validation
```html
<input id="firstCountryLongitude" name="firstCountryLongitude" class="form-control"
         [(ngModel)]="number.firstCountryLongitude" longitude >
```
##### Decorator Based Validation
```js
@longitude() firstCountryLongitude: string;
```
### lowercase
##### Reactive Form Validation
```js
     this.userInfoFormGroup = this.formBuilder.group({
            username:['', RxwebValidators.lowerCase()], 
        });
```       
##### Template Form Validation
```html
<input id="username" name="username" class="form-control"
         [(ngModel)]="user.username" lowercase >
```
##### Decorator Based Validation
```js
@lowerCase() username: string;
```
### mac
##### Reactive Form Validation
```js
     this.macAddressInfoFormGroup = this.formBuilder.group({
            systemMacAddress:['', RxwebValidators.mac()], 
        });
```       
##### Template Form Validation
```html
<input id="systemMacAddress" name="systemMacAddress" class="form-control"
         [(ngModel)]="macAddress.systemMacAddress" mac >
```
##### Decorator Based Validation
```js
@mac() systemMacAddress: string;
```
### maxDate
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.maxDate({value:new Date(2018,7,30) })], 
        });
```       
##### Template Form Validation
```html
<input id="registrationDate" name="registrationDate" class="form-control"
         [(ngModel)]="user.registrationDate" [maxDate]='{"value":"2018-07-30"}' >
```
##### Decorator Based Validation
```js
@maxDate({value:new Date(2018,7,30) }) registrationDate: Date;
```
### maxLength
##### Reactive Form Validation
```js
  this.locationFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.maxLength({value:10 })], 
        });
```       
##### Template Form Validation
```html
<input id="firstName" name="firstName" class="form-control"
         [(ngModel)]="location.firstName" [maxLength]='{"value":"10"}' >
```
##### Decorator Based Validation
```js
@maxLength({value:10 })	firstName: string;
```
### maxNumber
##### Reactive Form Validation
```js
 this.subjectDetailsFormGroup = this.formBuilder.group({
            passingMarks:['', RxwebValidators.maxNumber({value:50 })], 
        });
```       
##### Template Form Validation
```html
<input id="passingMarks" name="passingMarks" class="form-control"
         [(ngModel)]="subject.passingMarks" [maxNumber]='{"value":"50"}' >
```
##### Decorator Based Validation
```js
@maxNumber({value:50 }) passingMarks: number;
```
### minDate
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            registrationDate:['', RxwebValidators.minDate({value:new Date(2018,7,30) })], 
        });
```       
##### Template Form Validation
```html
<input id="registrationDate" name="registrationDate" class="form-control"
         [(ngModel)]="user.registrationDate"  [minDate]='{"value":"2018-07-30"}' >
```
##### Decorator Based Validation
```js
@minDate({value:new Date(2018,7,30) }) registrationDate: Date;
```
### minLength
##### Reactive Form Validation
```js
this.contactFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.minLength({value:8 })], 
        });
```       
##### Template Form Validation
```html
<input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="country.countryName" [minLength]='{"value":"8"}' >
```
##### Decorator Based Validation
```js
@minLength({value:8 }) countryName: string;
```
### minNumber
##### Reactive Form Validation
```js
  this.resultInfoFormGroup = this.formBuilder.group({
            maths:['', RxwebValidators.minNumber({value:35 })], 
        });
```       
##### Template Form Validation
```html
<input id="maths" name="maths" class="form-control"
         [(ngModel)]="result.maths" [minNumber]='{"value":"35"}' >
```
##### Decorator Based Validation
```js
	@minNumber({value:35 }) maths: number;
```
### noneOf
##### Reactive Form Validation
```js
  this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.noneOf({matchValues:["MVC", "AngularJS","Angular 5","C#"]})], 
        });
```       
##### Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [noneOf]='{"matchvalues":"MVC","AngularJS","Angular 5","C#"}'/>{{tag.name}}
```
##### Decorator Based Validation
```js
  @noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]})  skills: string[];
```
### numeric
##### Reactive Form Validation
```js
 this.userInfoFormGroup = this.formBuilder.group({
            integerNumber:['', RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false })], 
        });
```       
##### Template Form Validation
```html
<input id="integerNumber" name="integerNumber" class="form-control"
         [(ngModel)]="user.integerNumber" [numeric]='{"acceptValue":"NumericValueType.PositiveNumber","allowDecimal":"false"}' >
```
##### Decorator Based Validation
```js
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }) integerNumber: number;
```
### odd
##### Reactive Form Validation
```js
  this.userFormGroup = this.formBuilder.group({
            oddNumber:['', RxwebValidators.odd()], 
        });
```       
##### Template Form Validation
```html
<input id="oddNumber" name="oddNumber" class="form-control"
         [(ngModel)]="user.oddNumber" odd >
```
##### Decorator Based Validation
```js
	@odd() oddNumber: number;
```
### oneOf
##### Reactive Form Validation
```js
    this.employeeInfoFormGroup = this.formBuilder.group({
           skills:[RxwebValidators.oneOf({matchValues:["MVC", "AngularJS","Angular 5","C#"]})], 
        });
```       
##### Template Form Validation
```html
 <input id="skills"  name="skills" type="checkbox" value="{{tag.name}}" 
        [(ngModel)]="employee.skills" [oneOf]='{"matchvalues":"MVC","AngularJS","Angular 5","C#"}'/>{{tag.name}}
```
##### Decorator Based Validation
```js
 @oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#"]}) skills: string[];
```
### password
##### Reactive Form Validation
```js
  this.loginInfoFormGroup = this.formBuilder.group({
            password:['', RxwebValidators.password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} })], 
        });
```       
##### Template Form Validation
```html
 <input id="password" name="password" class="form-control"
         [(ngModel)]="login.password" [password]='{"validation":{maxLength: 10,minLength: 5,digit: true,specialCharacter: true}]' >
```
##### Decorator Based Validation
```js
@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} })	password: string;
```
### pattern
##### Reactive Form Validation
```js
this.userFormGroup = this.formBuilder.group({
            userName:['', RxwebValidators.pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} })], 
        });
```       
##### Template Form Validation
```html
 <input id="userName" name="userName" class="form-control"
         [(ngModel)]="user.userName" [pattern]='{"pattern":{'onlyAlpha': RegExp('/^[A-Za-z]+$/')}]' >
```
##### Decorator Based Validation
```js
	@pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} }) userName: string;
```
### port
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            educationalWebsitePort:['', RxwebValidators.port()], 
        });
```       
##### Template Form Validation
```html
 <input id="educationalWebsitePort" name="educationalWebsitePort" class="form-control"
         [(ngModel)]="user.educationalWebsitePort" port >
```
##### Decorator Based Validation
```js
		@port()	educationalWebsitePort: string;
```
### primeNumber
##### Reactive Form Validation
```js
 this.numberInfoFormGroup = this.formBuilder.group({
            firstNumber:['', RxwebValidators.primeNumber()], 
        });
```       
##### Template Form Validation
```html
 <input id="firstNumber" name="firstNumber" class="form-control"
         [(ngModel)]="user.firstNumber" primeNumber >
```
##### Decorator Based Validation
```js		
	@primeNumber() firstNumber: string;
```
### range
##### Reactive Form Validation
```js
this.employeeInfoFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
        });
```       
##### Template Form Validation
```html
 <input id="age" name="age" class="form-control"
         [(ngModel)]="employee.age" [range]='{"minimumNumber":"18","maximumNumber":"60"}' >
```
##### Decorator Based Validation
```js		
  @range({minimumNumber:18  ,maximumNumber:60 }) age: number;
```
### required
##### Reactive Form Validation
```js
this.userInfoFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.required()], 
        });
```       
##### Template Form Validation
```html
 <input id="firstName" name="firstName" class="form-control"
         [(ngModel)]="user.firstName" required >
```
##### Decorator Based Validation
```js		
 @required() firstName: string;
```
### startsWith
##### Reactive Form Validation
```js
 this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.startsWith({value:'n' })], 
        });
```       
##### Template Form Validation
```html
 <input id="name" name="name" class="form-control"
         [(ngModel)]="user.name" [startsWith]='{"value":"n"}'>
```
##### Decorator Based Validation
```js		
 @startsWith({value:'n' }) name: string;
```
### time
##### Reactive Form Validation
```js
  this.attandanceDetailFormGroup = this.formBuilder.group({
            entryTime:['', RxwebValidators.time()], 
        });
```       
##### Template Form Validation
```html
 <input id="entryTime" name="entryTime" class="form-control"
         [(ngModel)]="attandance.entryTime" time >
```
##### Decorator Based Validation
```js		 
	@time() entryTime: string;
```
### upperCase
##### Reactive Form Validation
```js
        this.locationFormGroup = this.formBuilder.group({
            countryName:['', RxwebValidators.upperCase()], 
        });
```       
##### Template Form Validation
```html
 <input id="countryName" name="countryName" class="form-control"
         [(ngModel)]="location.countryName" upperCase >
```
##### Decorator Based Validation
```js		 
@upperCase() countryName: string;
```
### url
##### Reactive Form Validation
```js
      this.webSiteInfoModelFormGroup = this.formBuilder.group({
            adminWebsiteUrl:['', RxwebValidators.url()], 
        });
```       
##### Template Form Validation
```html
 <input id="adminWebsiteUrl" name="adminWebsiteUrl" class="form-control"
         [(ngModel)]="website.adminWebsiteUrl" url >
```
##### Decorator Based Validation
```js		 
@url() adminWebsiteUrl: string;
```
## Validation Quick Start
To learn more about `rxweb` powerful validation features, let us look at a complete example of validating a form and displaying the error messages back to the user. 

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
There are 50+ validators, but the below code example is for alpha validation. The field will only valid, if the entered value is in alphabets. see the complete code example on **[stackblitz](https://stackblitz.com/edit/rxweb-alpha-validator-angular-reactive-form?file=src%2Fapp%2Fuser-info%2Fadd%2Fuser-info-add.component.ts)**.
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from "@angular/forms"

import { RxwebValidators } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-user-info-add',
    templateUrl: './user-info-add.component.html'
})
export class UserInfoAddComponent implements OnInit {

    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
          firstName:['',[RxwebValidators.alpha()]]
        });
    }
}
```
## Decorator Based Validation
There are 50+ Decorator based model validation. The below code covers required field validation via decorator. You have set decorator on top of property, other things automatically managed by `RxFormBuilder`. see the complete working example on ***[stackblitz](https://stackblitz.com/edit/rxweb-required-validation-add-angular-reactive-form)***
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
