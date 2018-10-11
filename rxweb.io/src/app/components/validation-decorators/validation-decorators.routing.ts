import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const VALIDATION_DECORATORS_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './alpha/alpha.module#AlphaModule',
},
 {
	path:'alphaNumeric',
	loadChildren: './alphaNumeric/alphaNumeric.module#AlphaNumericModule',
},
 {
	path:'compare',
	loadChildren: './compare/compare.module#CompareModule',
},
 {
	path:'contains',
	loadChildren: './contains/contains.module#ContainsModule',
},
 {
	path:'creditCard',
	loadChildren: './creditCard/creditCard.module#CreditCardModule',
},
 {
	path:'different',
	loadChildren: './different/different.module#DifferentModule',
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
	path:'even',
	loadChildren: './even/even.module#EvenModule',
},
 {
	path:'factor',
	loadChildren: './factor/factor.module#FactorModule',
},
 {
	path:'greaterThanEqualTo',
	loadChildren: './greaterThanEqualTo/greaterThanEqualTo.module#GreaterThanEqualToModule',
},
 {
	path:'greaterThan',
	loadChildren: './greaterThan/greaterThan.module#GreaterThanModule',
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
	path:'leapYear',
	loadChildren: './leapYear/leapYear.module#LeapYearModule',
},
 {
	path:'lessThanEqualTo',
	loadChildren: './lessThanEqualTo/lessThanEqualTo.module#LessThanEqualToModule',
},
 {
	path:'lessThan',
	loadChildren: './lessThan/lessThan.module#LessThanModule',
},
 {
	path:'lowerCase',
	loadChildren: './lowerCase/lowerCase.module#LowerCaseModule',
},
 {
	path:'mac',
	loadChildren: './mac/mac.module#MacModule',
},
 {
	path:'maxDate',
	loadChildren: './maxDate/maxDate.module#MaxDateModule',
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
	path:'numeric',
	loadChildren: './numeric/numeric.module#NumericModule',
},
 {
	path:'odd',
	loadChildren: './odd/odd.module#OddModule',
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

export const VALIDATION_DECORATORS_ROUTING: ModuleWithProviders = RouterModule.forChild(VALIDATION_DECORATORS_ROUTES);
