import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const VALIDATION_VALIDATORS_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './alpha/alpha-validators.module#AlphaValidatorsModule',
},
 {
	path:'alphaNumeric',
	loadChildren: './alphaNumeric/alphaNumeric-validators.module#AlphaNumericValidatorsModule',
},
 {
	path:'ascii',
	loadChildren: './ascii/ascii-validators.module#AsciiValidatorsModule',
},
 {
	path:'compare',
	loadChildren: './compare/compare-validators.module#CompareValidatorsModule',
},
 {
	path:'contains',
	loadChildren: './contains/contains-validators.module#ContainsValidatorsModule',
},
 {
	path:'creditCard',
	loadChildren: './creditCard/creditCard-validators.module#CreditCardValidatorsModule',
},
 {
	path:'dataUri',
	loadChildren: './dataUri/dataUri-validators.module#DataUriValidatorsModule',
},
 {
	path:'different',
	loadChildren: './different/different-validators.module#DifferentValidatorsModule',
},
 {
	path:'digit',
	loadChildren: './digit/digit-validators.module#DigitValidatorsModule',
},
 {
	path:'email',
	loadChildren: './email/email-validators.module#EmailValidatorsModule',
},
 {
	path:'endsWith',
	loadChildren: './endsWith/endsWith-validators.module#EndsWithValidatorsModule',
},
 {
	path:'even',
	loadChildren: './even/even-validators.module#EvenValidatorsModule',
},
 {
	path:'factor',
	loadChildren: './factor/factor-validators.module#FactorValidatorsModule',
},
 {
	path:'greaterThanEqualTo',
	loadChildren: './greaterThanEqualTo/greaterThanEqualTo-validators.module#GreaterThanEqualToValidatorsModule',
},
 {
	path:'greaterThan',
	loadChildren: './greaterThan/greaterThan-validators.module#GreaterThanValidatorsModule',
},
 {
	path:'hexColor',
	loadChildren: './hexColor/hexColor-validators.module#HexColorValidatorsModule',
},
 {
	path:'json',
	loadChildren: './json/json-validators.module#JsonValidatorsModule',
},
 {
	path:'latitude',
	loadChildren: './latitude/latitude-validators.module#LatitudeValidatorsModule',
},
 {
	path:'latLong',
	loadChildren: './latLong/latLong-validators.module#LatLongValidatorsModule',
},
 {
	path:'leapYear',
	loadChildren: './leapYear/leapYear-validators.module#LeapYearValidatorsModule',
},
 {
	path:'lessThanEqualTo',
	loadChildren: './lessThanEqualTo/lessThanEqualTo-validators.module#LessThanEqualToValidatorsModule',
},
 {
	path:'lessThan',
	loadChildren: './lessThan/lessThan-validators.module#LessThanValidatorsModule',
},
 {
	path:'longitude',
	loadChildren: './longitude/longitude-validators.module#LongitudeValidatorsModule',
},
 {
	path:'lowerCase',
	loadChildren: './lowerCase/lowerCase-validators.module#LowerCaseValidatorsModule',
},
 {
	path:'mac',
	loadChildren: './mac/mac-validators.module#MacValidatorsModule',
},
 {
	path:'maxDate',
	loadChildren: './maxDate/maxDate-validators.module#MaxDateValidatorsModule',
},
 {
	path:'maxLength',
	loadChildren: './maxLength/maxLength-validators.module#MaxLengthValidatorsModule',
},
 {
	path:'maxNumber',
	loadChildren: './maxNumber/maxNumber-validators.module#MaxNumberValidatorsModule',
},
 {
	path:'minDate',
	loadChildren: './minDate/minDate-validators.module#MinDateValidatorsModule',
},
 {
	path:'minLength',
	loadChildren: './minLength/minLength-validators.module#MinLengthValidatorsModule',
},
 {
	path:'minNumber',
	loadChildren: './minNumber/minNumber-validators.module#MinNumberValidatorsModule',
},
 {
	path:'numeric',
	loadChildren: './numeric/numeric-validators.module#NumericValidatorsModule',
},
 {
	path:'odd',
	loadChildren: './odd/odd-validators.module#OddValidatorsModule',
},
 {
	path:'password',
	loadChildren: './password/password-validators.module#PasswordValidatorsModule',
},
 {
	path:'pattern',
	loadChildren: './pattern/pattern-validators.module#PatternValidatorsModule',
},
 {
	path:'port',
	loadChildren: './port/port-validators.module#PortValidatorsModule',
},
 {
	path:'primeNumber',
	loadChildren: './primeNumber/primeNumber-validators.module#PrimeNumberValidatorsModule',
},
 {
	path:'range',
	loadChildren: './range/range-validators.module#RangeValidatorsModule',
},
 {
	path:'required',
	loadChildren: './required/required-validators.module#RequiredValidatorsModule',
},
 {
	path:'fileSize',
	loadChildren: './fileSize/fileSize-validators.module#FileSizeValidatorsModule',
},
 {
	path:'startsWith',
	loadChildren: './startsWith/startsWith-validators.module#StartsWithValidatorsModule',
},
 {
	path:'time',
	loadChildren: './time/time-validators.module#TimeValidatorsModule',
},
 {
	path:'upperCase',
	loadChildren: './upperCase/upperCase-validators.module#UpperCaseValidatorsModule',
},
 {
	path:'url',
	loadChildren: './url/url-validators.module#UrlValidatorsModule',
},
 ];

export const VALIDATION_VALIDATORS_ROUTING: ModuleWithProviders = RouterModule.forChild(VALIDATION_VALIDATORS_ROUTES);
