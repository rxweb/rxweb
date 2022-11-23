
[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![dependencies Status](https://david-dm.org/rxweb/rxweb/status.svg)](https://david-dm.org/rxweb/rxweb)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)


<h3>RxWeb</h3>
The most powerful and well-factored validation framework for VUE and React based enterprise application.

For More Information on ***[rxweb](https://docs.rxweb.io/vue/home)***

# Prerequisites
This only works in TypeScript Language Supported Project.

## Table of Contents

* [Installation](#installation)
* [Form Validation](#form-validation)
* [Contributing](#contributing)
* [Need Help](#need-help) 
* [Feature Request](#feature-request)
* [License](#license)

## Installation
```bash
$ npm install @rxweb/reactive-forms
```


## Global Configuration
Before applying the validation on the model, you have set few one thing globally. Write the below code at starting point of the application. 
```js
// For VUE Projects
ReactiveFormConfig.clientLib = ClientLibrary.Vue;

// For React Projects
ReactiveFormConfig.clientLib = ClientLibrary.React;

```
## Form Validation 
Pure model driven decorator based validation.

  
2. [alpha](#alpha)   
3. [alphaNumeric](#alphanumeric)   
4. [ascii](#ascii) 
6. [compare](#compare)
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
18. [greaterThanEqualTo](#greaterthanequalto)   
19. [greaterThan](#greaterthan)
20. [hexColor](#hexcolor)   
21. [json](#json)  
22. [latitude](#latitude) 
23. [latLong](#latlong) 
24. [leapYear](#leapyear)  
25. [lessThanEqualTo](#lessthanequalto)   
26. [lessThan](#lessthan)   
27. [longitude](#longitude)
28. [lowerCase](#lowercase) 
29. [mac](#mac) 
30. [maxDate](#maxdate) 
31. [maxLength](#maxlength)  
32. [maxNumber](#maxnumber)
33. [minDate](#mindate) 
34. [minLength](#minlength) 
35. [minNumber](#minnumber)     
36. [numeric](#numeric) 
37. [odd](#odd)   
38. [password](#password)
39. [pattern](#pattern)   
40. [port](#port) 
41. [primeNumber](#primenumber)
42. [range](#range)   
43. [required](#required)  
44. [startsWith](#startswith)
45. [upperCase](#uppercase)   
46. [url](#url)   
___
## alpha   
Alpha validation will allow only alphabets to be entered. It will not allow any digit or special character.
> Model
```js
	@alpha() 
	countryName: string;	
```  

> Component
```html
        <input id="name" class="form-control" v-model="countryFormGroup.props.countryName" type="text" name="name" />
        <small class="form-text text-danger">{{countryFormGroup.controls.countryName.errorMessage}}<br/></small>	
```
```js
@Component
export default class CountryComponent extends Vue {
 countryFormGroup: IFormGroup<Country>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.countryFormGroup = this.formBuilder.formGroup(Country) as IFormGroup<Country>;
   }
}
```
___
## alphaNumeric
Alpha Numeric validation will allow only alphabets and numbers to be entered, It will not allow any special character. 
> Model
```js
	@alphaNumeric() 
	areaName: string;	
```  

> Component
```html
        <input id="name" class="form-control" v-model="countryFormGroup.props.areaName" type="text" name="name" />
        <small class="form-text text-danger">{{countryFormGroup.controls.areaName.errorMessage}}<br/></small>	
```
```js
@Component
export default class CountryComponent extends Vue {
 countryFormGroup: IFormGroup<Country>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.countryFormGroup = this.formBuilder.formGroup(Country) as IFormGroup<Country>;
   }
}
```
___
## ascii
ascii validation decorator allows user to enter the input which is in the proper ascii format.
> Model
```js
	@ascii() 
	specialCharAsciiCode: string;
```  

> Component
```html
        <input id="name" class="form-control" v-model="userFormGroup.props.specialCharAsciiCode" type="text" name="name" />
        <small class="form-text text-danger">{{userFormGroup.controls.specialCharAsciiCode.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___

## compare
Compare validation will compare two inputs whether they are same or not.
> Reactive Form Validation
 > Model
```js
	@prop()
	password: string;

	@compare({fieldName:'password' }) 
	confirmPassword: string;
```  

> Component
```html

        <input id="name" class="form-control" v-model="userFormGroup.props.password" type="text" name="name" />
        <small class="form-text text-danger">{{userFormGroup.controls.password.errorMessage}}<br/></small>	
       
        <input id="name" class="form-control" v-model="userFormGroup.props.confirmPassword" type="text" name="name" />
        <small class="form-text text-danger">{{userFormGroup.controls.confirmPassword.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## contains
Contains validation will check that value is in the input, It will not allow to enter input that not contains the predefined value.
> Model
```js
	@contains({value:'@gmail.com' }) 
	emailAddress: string;
```  

> Component
```html
       <input id="name" class="form-control" v-model="userFormGroup.props.emailAddress" type="text" name="name" />
       <small class="form-text text-danger">{{userFormGroup.controls.emailAddress.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## creditCard
creditCard validation will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.
 > Model
```js
	@prop()
 	cardType: string;

	@creditCard({fieldName:'cardType' }) 
	creditCardNumber: string;
```  

> Component
```html
       <input id="name" class="form-control" v-model="userFormGroup.props.creditCardNumber" type="text" name="name" />
       <small class="form-text text-danger">{{userFormGroup.controls.creditCardNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## dataUri
dataUri validation  allows user to enter the input which is a valid data Uri.
> Model
```js
	@dataUri
	videoDataUri: string;
```  

> Component
```html
       <input id="name" class="form-control" v-model="userFormGroup.props.emailAddress" type="text" name="name" />
       <small class="form-text text-danger">{{userFormGroup.controls.emailAddress.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
___
## different
different validation decorator will check two inputs whether they are different or not. It is just opposite of different decorator.
> Model
```js
	@prop()
	firstName: string;

	@different({fieldName:'firstName' }) 
	lastName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="accountInfoFormGroup.props.lastName" type="text" name="name" />
	<small class="form-text text-muted">Both field must be different<br/></small>
    <small class="form-text text-danger">{{accountInfoFormGroup.controls.lastName.errorMessage}}<br/></small>	
```
```js
@Component
export default class DifferentAddComponent extends Vue {
 accountInfoFormGroup: IFormGroup<AccountInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.accountInfoFormGroup = this.formBuilder.formGroup(AccountInfo) as IFormGroup<AccountInfo>;
   }
}
```

___
## digit
Digit validation will allow only digits to be entered, It will not allow any alphabets or special character.
> Model
```js
	@digit() 
	age: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.age" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.age.errorMessage}}<br/></small>	
```
```js
@Component
export default class DigitAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
___
## email
email validation decorator will only allow user to enter input which is in the correct email format.
> Model
```js
	@email() 
	email: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.email" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.email.errorMessage}}<br/></small>	
```
```js
@Component
export default class EmailAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## endsWith
endsWith validation allows user to enter the input which ends with particular value.
> Model
```js
	@endsWith({value:'t' }) 
	name: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.name" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.name.errorMessage}}<br/></small>	
```
```js
@Component
export default class EndsWithAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## even
even validation decorator will check whether the value entered by user is an even number or not.
> Model
```js
	@even() 
	evenNumber: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.evenNumber" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.evenNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class EvenAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## extension
extension validation allows user to enter the input which is in the proper extension format.
> Model
```js
	@extension({extensions:['jpg','bmp'] }) 
	profilePicture: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userInfoFormGroup.props.profilePicture" type="text" name="name" />
    <small class="form-text text-danger">{{userInfoFormGroup.controls.profilePicture.errorMessage}}<br/></small>	
```
```js
@Component
export default class ExtensionAddComponent extends Vue {
 userInfoFormGroup: IFormGroup<UserInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userInfoFormGroup = this.formBuilder.formGroup(UserInfo) as IFormGroup<UserInfo>;
   }
}
```
## extension
extension validation allows user to enter the input which is in the proper extension format.
> Model
```js
	@extension({extensions:['jpg','bmp'] }) 
	profilePicture: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userInfoFormGroup.props.profilePicture" type="text" name="name" />
    <small class="form-text text-danger">{{userInfoFormGroup.controls.profilePicture.errorMessage}}<br/></small>	
```
```js
@Component
export default class ExtensionAddComponent extends Vue {
 userInfoFormGroup: IFormGroup<UserInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userInfoFormGroup = this.formBuilder.formGroup(UserInfo) as IFormGroup<UserInfo>;
   }
}
```
## factor
factor validation will allow user to enter factor of a number which is called dividend.
> Model
```js
	@factor({dividend:50 }) 
	firstNumber: Number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.firstNumber" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.firstNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class FactorAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## greaterThanEqualTo 
Greater than equal to validation decorator will check that input property is greater than or equal to the related field input.
> Model
```js
	@greaterThanEqualTo({fieldName:'age' }) 
	voterAge: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.voterAge" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.voterAge.errorMessage}}<br/></small>	
```
```js
@Component
export default class GreaterThanEqualToAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```

## greaterThan
Greater than validation decorator will check that input property is greater than to the related field input.
> Model
```js
	@greaterThan({fieldName:'age' }) 
	voterAge: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.voterAge" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.voterAge.errorMessage}}<br/></small>	
```
```js
@Component
export default class GreaterThanAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## hexColor 
hexColor validation decorator will allow user to enter only the input in proper Hex Color format.
> Model
```js
	@hexColor() 
	color: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.color" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.color.errorMessage}}<br/></small>	
```
```js
@Component
export default class HexColorAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## json
json validation will allow user to enter the input only in proper Json format. 

> Model
```js
	@json() 
	locationJson: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="jsonInfoFormGroup.props.locationJson" type="text" name="name" />
    <small class="form-text text-danger">{{jsonInfoFormGroup.controls.locationJson.errorMessage}}<br/></small>	
```
```js
@Component
export default class JsonAddComponent extends Vue {
 jsonInfoFormGroup: IFormGroup<JsonInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.jsonInfoFormGroup = this.formBuilder.formGroup(JsonInfo) as IFormGroup<JsonInfo>;
   }
}
```
## latitude 
latitude validation allows user to enter value which is valid latitude. 

> Model
```js
	@latitude() 
	firstCountryLatitude: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="numberInfoFormGroup.props.firstCountryLatitude" type="text" name="name" />
    <small class="form-text text-danger">{{numberInfoFormGroup.controls.firstCountryLatitude.errorMessage}}<br/>              </small>	
```
```js
@Component
export default class LatitudeAddComponent extends Vue {
 numberInfoFormGroup: IFormGroup<NumberInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.numberInfoFormGroup = this.formBuilder.formGroup(NumberInfo) as IFormGroup<NumberInfo>;
   }
}
```
## LeapYear
leapyear validation will check whether the value entered is a leap year or not.  

> Model
```js
	@leapYear() 
	birthYear: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.birthYear" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.birthYear.errorMessage}}<br/></small>	
```
```js
@Component
export default class LeapYearAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## latLong
latLong validation decorator allows user to enter the input which is valid Latitude or longitude.

> Model
```js
	@latLong() 
	firstCountry: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="countryFormGroup.props.firstCountry" type="text" name="name" />
    <small class="form-text text-danger">{{countryFormGroup.controls.firstCountry.errorMessage}}<br/></small>	
```
```js
@Component
export default class LatLongAddComponent extends Vue {
 countryFormGroup: IFormGroup<Country>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.countryFormGroup = this.formBuilder.formGroup(Country) as IFormGroup<Country>;
   }
}
```
## lessThanEqualTo
Less than equal to validation will allow the user to enter only that value which is less than oe equal to the value in the pre defined field.

> Model
```js
	@lessThanEqualTo({fieldName:'totalMarks' }) 
	marks: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.marks" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.marks.errorMessage}}<br/></small>	
```
```js
@Component
export default class LessThanEqualToAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```

## lessThan
less than validation decorator will allow the user to enter only that value which is less than the value in the pre defined field.

> Model
```js
	@lessThan({fieldName:'marks' }) 
	passingMarks: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.passingMarks" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.passingMarks.errorMessage}}<br/></small>	
```
```js
@Component
export default class LessThanAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```

## longitude 
longitude validation allows user to enter the input which is in the proper longitude format.

> Model
```js
	@longitude() 
	firstCountryLongitude: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="numberInfoFormGroup.props.firstCountryLongitude" type="text" name="name" />
    <small class="form-text text-danger">{{numberInfoFormGroup.controls.firstCountryLongitude.errorMessage}}<br/></small>	
```
```js
@Component
export default class LongitudeAddComponent extends Vue {
 numberInfoFormGroup: IFormGroup<NumberInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.numberInfoFormGroup = this.formBuilder.formGroup(NumberInfo) as IFormGroup<NumberInfo>;
   }
}
```
## lowercase 
lowerCase validation will allow user to enter only the lowercase alphabets.

> Model
```js
	@lowerCase() 
	username: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userInfoFormGroup.props.username" type="text" name="name" />
    <small class="form-text text-danger">{{userInfoFormGroup.controls.username.errorMessage}}<br/></small>	
```
```js
@Component
export default class LowerCaseAddComponent extends Vue {
 userInfoFormGroup: IFormGroup<UserInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userInfoFormGroup = this.formBuilder.formGroup(UserInfo) as IFormGroup<UserInfo>;
   }
}
```
## mac 
mac validation decorator will check whether the value entered is a valid mac address.

> Model
```js
	@mac() 
	systemMacAddress: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="macAddressInfoFormGroup.props.systemMacAddress" type="text" name="name" />
	<small class="form-text text-danger">{{macAddressInfoFormGroup.controls.systemMacAddress.errorMessage}}<br/></small>	
```
```js
@Component
export default class MacAddComponent extends Vue {
 macAddressInfoFormGroup: IFormGroup<MacAddressInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.macAddressInfoFormGroup = this.formBuilder.formGroup(MacAddressInfo) as IFormGroup<MacAddressInfo>;
   }
}
```
## maxDate 
maxDate validation decorator will allow user to enter the date less than the maxDate value parameter.

> Model
```js
	@maxDate({value:'07/30/2018' }) 
	registrationDate: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.registrationDate" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.registrationDate.errorMessage}}<br/></small>	
```
```js
@Component
export default class MaxDateAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## maxLength 
MaxLength validation will allow user to enter the input upto the maximum length value parameter.

> Model
```js
	@maxLength({value:10 }) 
	firstName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="locationFormGroup.props.firstName" type="text" name="name" />
    <small class="form-text text-danger">{{locationFormGroup.controls.firstName.errorMessage}}<br/></small>	
```
```js
@Component
export default class MaxLengthAddComponent extends Vue {
 locationFormGroup: IFormGroup<Location>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.locationFormGroup = this.formBuilder.formGroup(Location) as IFormGroup<Location>;
   }
}
```

## maxLength 
MaxLength validation will allow user to enter the input upto the maximum length value parameter.

> Model
```js
	@maxLength({value:10 }) 
	firstName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="locationFormGroup.props.firstName" type="text" name="name" />
    <small class="form-text text-danger">{{locationFormGroup.controls.firstName.errorMessage}}<br/></small>	
```
```js
@Component
export default class MaxLengthAddComponent extends Vue {
 locationFormGroup: IFormGroup<Location>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.locationFormGroup = this.formBuilder.formGroup(Location) as IFormGroup<Location>;
   }
}
```

## maxNumber 
MaxNumber validation will allow user to enter the input upto the maximum number value parameter.

> Model
```js
	@maxNumber({value:50 }) 
	passingMarks: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="subjectDetailsFormGroup.props.passingMarks" type="text" name="name" />
    <small class="form-text text-danger">{{subjectDetailsFormGroup.controls.passingMarks.errorMessage}}<br/></small>	
```
```js
@Component
export default class MaxNumberAddComponent extends Vue {
 subjectDetailsFormGroup: IFormGroup<SubjectDetails>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.subjectDetailsFormGroup = this.formBuilder.formGroup(SubjectDetails) as IFormGroup<SubjectDetails>;
   }
}
```
## minDate 
Minimum Date validation will allow user to enter date greater the minimum date value parameter.

> Model
```js
	@minDate({value:'07/30/2018' }) 
	registrationDate: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.registrationDate" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.registrationDate.errorMessage}}<br/></small>	
```
```js
@Component
export default class MinDateAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
## minLength 
minLength validation decorator will allow user to enter the input length matching the minimum length value parameter.

> Model
```js
	@minLength({value:3 }) 
	countryName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="contactFormGroup.props.countryName" type="text" name="name" />
    <small class="form-text text-danger">{{contactFormGroup.controls.countryName.errorMessage}}<br/></small>	
```
```js
@Component
export default class MinLengthAddComponent extends Vue {
 contactFormGroup: IFormGroup<Contact>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.contactFormGroup = this.formBuilder.formGroup(Contact) as IFormGroup<Contact>;
   }
}
```
## minNumber 
minNumber validation decorator will allow user to enter the input greater than the minimum number value parameter.

> Model
```js
	@minNumber({value:35 }) 
	maths: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="resultInfoFormGroup.props.maths" type="text" name="name" />
    <small class="form-text text-danger">{{resultInfoFormGroup.controls.maths.errorMessage}}<br/></small>	
```
```js
@Component
export default class MinNumberAddComponent extends Vue {
 resultInfoFormGroup: IFormGroup<ResultInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.resultInfoFormGroup = this.formBuilder.formGroup(ResultInfo) as IFormGroup<ResultInfo>;
   }
}
```
## numeric 
numeric validation will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.

> Model
```js
	@numeric({acceptValue:NumericValueType.PositiveNumber  ,allowDecimal:false }) 
	integerNumber: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userInfoFormGroup.props.integerNumber" type="text" name="name" />
    <small class="form-text text-danger">{{userInfoFormGroup.controls.integerNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class NumericAddComponent extends Vue {
 userInfoFormGroup: IFormGroup<UserInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userInfoFormGroup = this.formBuilder.formGroup(UserInfo) as IFormGroup<UserInfo>;
   }
}
```

## odd 
Odd validation will check whether the value entered is an odd number or not.

> Model
```js
	@odd() 
	oddNumber: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.oddNumber" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.oddNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class OddAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}

```

## pattern 
pattern validation decorator will allow user to enter the input which match the predefined pattern value parameter.

> Model
```js
	@pattern({expression:{'onlyAlpha': /^[A-Za-z]+$/} }) 
	userName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.userName" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.userName.errorMessage}}<br/></small>	
```
```js
@Component
export default class PatternAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}

```
## password 
password validation decorator will allow user to enter only the input according to correct password validation format.

> Model
```js
	@password({validation:{maxLength: 10,minLength: 5,digit: true,specialCharacter: true} }) 
	password: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="loginInfoFormGroup.props.password" type="text" name="name" />
    <small class="form-text text-danger">{{loginInfoFormGroup.controls.password.errorMessage}}<br/></small>	
```
```js
@Component
export default class PasswordAddComponent extends Vue {
 loginInfoFormGroup: IFormGroup<LoginInfo>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.loginInfoFormGroup = this.formBuilder.formGroup(LoginInfo) as IFormGroup<LoginInfo>;
   }
}

```


## port  
port validation decorator allows user to enter the input which is a valid port number.

> Model
```js
	@port() 
	educationalWebsitePort: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.educationalWebsitePort" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.educationalWebsitePort.errorMessage}}<br/></small>	
```
```js
@Component
export default class PortAddComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() {
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}

```


## primeNumber
primeNumber validation allows user to enter only prime number.

> Model
```js
	@primeNumber 
	firstNumber: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.firstNumber" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.firstNumber.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```

## range
> Model
```js
	@range(minimumNumber:18, maximumNumber:60) 
	age: number;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.age" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.age.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___

## required
Required validation will check that the user has entered the value in the property or not.
> Model
```js
	@required() 
	countryName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.countryName" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.countryName.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
____
## startsWith
startsWith validation allows user to enter the input which starts with particular value.
> Model
```js
	@startsWith('n') 
	countryName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.countryName" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.countryName.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
____
## upperCase
UpperCase validation will allow user to enter the alphabets only in the upperCase format. 
> Model
```js
	@upperCase() 
	countryName: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.countryName" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.countryName.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```
___
## url
Url validation will check that value entered in the property is in the correct url format or not.
> Model
```js
	@url() 
	adminWebsiteUrl: string;
```  

> Component
```html
	<input id="name" class="form-control" v-model="userFormGroup.props.adminWebsiteUrl" type="text" name="name" />
    <small class="form-text text-danger">{{userFormGroup.controls.adminWebsiteUrl.errorMessage}}<br/></small>	
```
```js
@Component
export default class UserComponent extends Vue {
 userFormGroup: IFormGroup<User>;

 formBuilder: RxFormBuilder = new RxFormBuilder();

  constructor() 
    super();
    this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
   }
}
```

___


## Contributing
If you are thinking to make rxweb framework better, that's truly great. You can contribute from a single character to core architectural work or significant documentation  all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are dont feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches.

Check out the <a href="https://rxweb.io/community/where_to_start_contributing">docs</a> on how you can put your precious efforts on the rxweb framework and contribute in the respective area.

## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT

