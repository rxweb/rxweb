import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const FORM_VALIDATION_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './validators/alpha/alpha.module#AlphaModule',
},
{
	path:'alphaNumeric',
	loadChildren: './validators/alphaNumeric/alpha-numeric.module#AlphaNumericModule',
},
{
	path:'ascii',
	loadChildren: './validators/ascii/ascii.module#AsciiModule',
},
{
	path:'compare',
	loadChildren: './validators/compare/compare.module#CompareModule',
},
{
	path:'contains',
	loadChildren: './validators/contains/contains.module#ContainsModule',
},
{
	path:'creditCard',
	loadChildren: './validators/creditCard/credit-card.module#CreditCardModule',
},
{
	path:'dataUri',
	loadChildren: './validators/dataUri/data-uri.module#DataUriModule',
},
{
	path:'different',
	loadChildren: './validators/different/different.module#DifferentModule',
},
{
	path:'digit',
	loadChildren: './validators/digit/digit.module#DigitModule',
},
{
	path:'email',
	loadChildren: './validators/email/email.module#EmailModule',
},
{
	path:'endsWith',
	loadChildren: './validators/endsWith/ends-with.module#EndsWithModule',
},
{
	path:'even',
	loadChildren: './validators/even/even.module#EvenModule',
},
{
	path:'factor',
	loadChildren: './validators/factor/factor.module#FactorModule',
},
{
	path:'greaterThanEqualTo',
	loadChildren: './validators/greaterThanEqualTo/greater-than-equal-to.module#GreaterThanEqualToModule',
},
{
	path:'greaterThan',
	loadChildren: './validators/greaterThan/greater-than.module#GreaterThanModule',
},
{
	path:'hexColor',
	loadChildren: './validators/hexColor/hex-color.module#HexColorModule',
},
{
	path:'json',
	loadChildren: './validators/json/json.module#JsonModule',
},
{
	path:'latitude',
	loadChildren: './validators/latitude/latitude.module#LatitudeModule',
},
{
	path:'latLong',
	loadChildren: './validators/latLong/lat-long.module#LatLongModule',
},
{
	path:'leapYear',
	loadChildren: './validators/leapYear/leap-year.module#LeapYearModule',
},
{
	path:'lessThanEqualTo',
	loadChildren: './validators/lessThanEqualTo/less-than-equal-to.module#LessThanEqualToModule',
},
{
	path:'lessThan',
	loadChildren: './validators/lessThan/less-than.module#LessThanModule',
},
{
	path:'longitude',
	loadChildren: './validators/longitude/longitude.module#LongitudeModule',
},
{
	path:'lowerCase',
	loadChildren: './validators/lowerCase/lower-case.module#LowerCaseModule',
},
{
	path:'mac',
	loadChildren: './validators/mac/mac.module#MacModule',
},
{
	path:'maxDate',
	loadChildren: './validators/maxDate/max-date.module#MaxDateModule',
},
{
	path:'maxLength',
	loadChildren: './validators/maxLength/max-length.module#MaxLengthModule',
},
{
	path:'maxNumber',
	loadChildren: './validators/maxNumber/max-number.module#MaxNumberModule',
},
{
	path:'minDate',
	loadChildren: './validators/minDate/min-date.module#MinDateModule',
},
{
	path:'minLength',
	loadChildren: './validators/minLength/min-length.module#MinLengthModule',
},
{
	path:'minNumber',
	loadChildren: './validators/minNumber/min-number.module#MinNumberModule',
},
{
	path:'numeric',
	loadChildren: './validators/numeric/numeric.module#NumericModule',
},
{
	path:'odd',
	loadChildren: './validators/odd/odd.module#OddModule',
},
{
	path:'password',
	loadChildren: './validators/password/password.module#PasswordModule',
},
{
	path:'pattern',
	loadChildren: './validators/pattern/pattern.module#PatternModule',
},
{
	path:'port',
	loadChildren: './validators/port/port.module#PortModule',
},
{
	path:'primeNumber',
	loadChildren: './validators/primeNumber/prime-number.module#PrimeNumberModule',
},
{
	path:'range',
	loadChildren: './validators/range/range.module#RangeModule',
},
{
	path:'required',
	loadChildren: './validators/required/required.module#RequiredModule',
},
{
	path:'fileSize',
	loadChildren: './validators/fileSize/file-size.module#FileSizeModule',
},
{
	path:'startsWith',
	loadChildren: './validators/startsWith/starts-with.module#StartsWithModule',
},
{
	path:'time',
	loadChildren: './validators/time/time.module#TimeModule',
},
{
	path:'upperCase',
	loadChildren: './validators/upperCase/upper-case.module#UpperCaseModule',
},
{
	path:'url',
	loadChildren: './validators/url/url.module#UrlModule',
},
];
export const FORM_VALIDATION_ROUTING: ModuleWithProviders = RouterModule.forChild(FORM_VALIDATION_ROUTES);