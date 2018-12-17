import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const FORM_VALIDATION_ROUTES: Routes = [
{
	path:'alpha',
	loadChildren: './alpha/alpha.module#AlphaModule',
},
{
	path:'alphaNumeric',
	loadChildren: './alphaNumeric/alpha-numeric.module#AlphaNumericModule',
},
{
	path:'ascii',
	loadChildren: './ascii/ascii.module#AsciiModule',
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
	loadChildren: './creditCard/credit-card.module#CreditCardModule',
},
{
	path:'dataUri',
	loadChildren: './dataUri/data-uri.module#DataUriModule',
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
	path:'endsWith',
	loadChildren: './endsWith/ends-with.module#EndsWithModule',
},
{
	path:'even',
	loadChildren: './even/even.module#EvenModule',
},
{
	path:'extension',
	loadChildren: './extension/extension.module#ExtensionModule',
},
{
	path:'factor',
	loadChildren: './factor/factor.module#FactorModule',
},
{
	path:'fileSize',
	loadChildren: './fileSize/file-size.module#FileSizeModule',
},
{
	path:'file',
	loadChildren: './file/file.module#FileModule',
},
{
	path:'greaterThanEqualTo',
	loadChildren: './greaterThanEqualTo/greater-than-equal-to.module#GreaterThanEqualToModule',
},
{
	path:'greaterThan',
	loadChildren: './greaterThan/greater-than.module#GreaterThanModule',
},
{
	path:'hexColor',
	loadChildren: './hexColor/hex-color.module#HexColorModule',
},
{
	path:'image',
	loadChildren: './image/image.module#ImageModule',
},
{
	path:'json',
	loadChildren: './json/json.module#JsonModule',
},
{
	path:'latitude',
	loadChildren: './latitude/latitude.module#LatitudeModule',
},
{
	path:'latLong',
	loadChildren: './latLong/lat-long.module#LatLongModule',
},
{
	path:'leapYear',
	loadChildren: './leapYear/leap-year.module#LeapYearModule',
},
{
	path:'lessThanEqualTo',
	loadChildren: './lessThanEqualTo/less-than-equal-to.module#LessThanEqualToModule',
},
{
	path:'lessThan',
	loadChildren: './lessThan/less-than.module#LessThanModule',
},
{
	path:'longitude',
	loadChildren: './longitude/longitude.module#LongitudeModule',
},
{
	path:'lowerCase',
	loadChildren: './lowerCase/lower-case.module#LowerCaseModule',
},
{
	path:'mac',
	loadChildren: './mac/mac.module#MacModule',
},
{
	path:'maxDate',
	loadChildren: './maxDate/max-date.module#MaxDateModule',
},
{
	path:'maxLength',
	loadChildren: './maxLength/max-length.module#MaxLengthModule',
},
{
	path:'maxNumber',
	loadChildren: './maxNumber/max-number.module#MaxNumberModule',
},
{
	path:'minDate',
	loadChildren: './minDate/min-date.module#MinDateModule',
},
{
	path:'minLength',
	loadChildren: './minLength/min-length.module#MinLengthModule',
},
{
	path:'minNumber',
	loadChildren: './minNumber/min-number.module#MinNumberModule',
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
	path:'port',
	loadChildren: './port/port.module#PortModule',
},
{
	path:'primeNumber',
	loadChildren: './primeNumber/prime-number.module#PrimeNumberModule',
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
	path:'fileSize',
	loadChildren: './fileSize/file-size.module#FileSizeModule',
},
{
	path:'startsWith',
	loadChildren: './startsWith/starts-with.module#StartsWithModule',
},
{
	path:'time',
	loadChildren: './time/time.module#TimeModule',
},
{
	path:'upperCase',
	loadChildren: './upperCase/upper-case.module#UpperCaseModule',
},
{
	path:'url',
	loadChildren: './url/url.module#UrlModule',
},
];
export const FORM_VALIDATION_ROUTING: ModuleWithProviders = RouterModule.forChild(FORM_VALIDATION_ROUTES);