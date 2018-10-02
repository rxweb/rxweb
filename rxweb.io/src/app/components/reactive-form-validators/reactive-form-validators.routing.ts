import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const REACTIVE_FORM_VALIDATORS_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './alpha/alpha.module#AlphaModule',
},
 {
	path:'alphaNumeric',
	loadChildren: './alphaNumeric/alphaNumeric.module#AlphaNumericModule',
},
 {
	path:'contains',
	loadChildren: './contains/contains.module#ContainsModule',
},
 {
	path:'compare',
	loadChildren: './compare/compare.module#CompareModule',
},
 {
	path:'creditCard',
	loadChildren: './creditCard/creditCard.module#CreditCardModule',
},
 {
	path:'digit',
	loadChildren: './digit/digit.module#DigitModule',
},
 {
	path:'email',
	loadChildren: './email/email.module#EmailModule',
},
 {
	path:'greaterThan',
	loadChildren: './greaterThan/greaterThan.module#GreaterThanModule',
},
 {
	path:'greaterThanEqualTo',
	loadChildren: './greaterThanEqualTo/greaterThanEqualTo.module#GreaterThanEqualToModule',
},
 {
	path:'hexColor',
	loadChildren: './hexColor/hexColor.module#HexColorModule',
},
 {
	path:'json',
	loadChildren: './json/json.module#JsonModule',
},
 {
	path:'lessThan',
	loadChildren: './lessThan/lessThan.module#LessThanModule',
},
 {
	path:'lessThanEqualTo',
	loadChildren: './lessThanEqualTo/lessThanEqualTo.module#LessThanEqualToModule',
},
 {
	path:'lowerCase',
	loadChildren: './lowerCase/lowerCase.module#LowerCaseModule',
},
 {
	path:'maxLength',
	loadChildren: './maxLength/maxLength.module#MaxLengthModule',
},
 {
	path:'maxNumber',
	loadChildren: './maxNumber/maxNumber.module#MaxNumberModule',
},
 {
	path:'maxDate',
	loadChildren: './maxDate/maxDate.module#MaxDateModule',
},
 {
	path:'minDate',
	loadChildren: './minDate/minDate.module#MinDateModule',
},
 {
	path:'minLength',
	loadChildren: './minLength/minLength.module#MinLengthModule',
},
 {
	path:'minNumber',
	loadChildren: './minNumber/minNumber.module#MinNumberModule',
},
 {
	path:'password',
	loadChildren: './password/password.module#PasswordModule',
},
 {
	path:'pattern',
	loadChildren: './pattern/pattern.module#PatternModule',
},
 {
	path:'range',
	loadChildren: './range/range.module#RangeModule',
},
 {
	path:'required',
	loadChildren: './required/required.module#RequiredModule',
},
 {
	path:'time',
	loadChildren: './time/time.module#TimeModule',
},
 {
	path:'upperCase',
	loadChildren: './upperCase/upperCase.module#UpperCaseModule',
},
 {
	path:'url',
	loadChildren: './url/url.module#UrlModule',
},
 ];

export const REACTIVE_FORM_VALIDATORS_ROUTING: ModuleWithProviders = RouterModule.forChild(REACTIVE_FORM_VALIDATORS_ROUTES);
