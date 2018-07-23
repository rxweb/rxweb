---
title: Alpha Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/alpha
---
# alpha
Alpha validation decorator will allow only alphabets to be entered. It will not allow any number or special character. If user tries to do so the property will become invalid. To use the alpha decorator on particular property.
 
# [Basic validation on Country add form  ](#tab/basic-validation-on-Country-add-form)
let's create a country add form with alpha validation. The form will allow only alphabets in the `FormControl` of `countryName`. 
Create country data model and set the alpha decorator on `countryName` property.
<header class="header-tab-title">app/Country/country.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-add-angular-reactive-form/src/app/country/country.model.ts?highlight=5)]
Create country add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `Country` data model in `ngOnInit` method.
<header class="header-tab-title">app/country/add/country-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-add-angular-reactive-form/src/app/country/add/country-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/country/add/country-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-add-angular-reactive-form/src/app/country/add/country-add.component.html)]

<h3>Country Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-alpha-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on Country edit  form](#tab/basic-validation-on-Country-edit-form)
<header class="header-tab-title">app/Country/country.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-edit-angular-reactive-form/src/app/country/country.model.ts?highlight=5)]
<header class="header-tab-title">app/country/edit/country-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-edit-angular-reactive-form/src/app/country/edit/country-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/country/edit/country-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/alpha/rxweb-alpha-validation-edit-angular-reactive-form/src/app/country/edit/country-edit.component.html)]

<h3>Country Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-alpha-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# AlphaConfig 
Below options are not mandatory to use in the `@alpha()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowWhiteSpace) | This will allow whitespace in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalExpression) | Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.
 
<header class="header-title">address-info.model.ts (AddressInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts#L10-L11)]

## conditionalExpression 
Type :  `Function`  |  `string` 

Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">address-info.model.ts (AddressInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">address-info.model.ts (AddressInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">address-info.model.ts (AddressInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts#L13-L14)]


# alpha Validation Complete Example
# [AddressInfo Model](#tab/complete-address-info)
<header class="header-tab-title">app/address-info/address-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts)]

# [Address Info Add Component](#tab/complete-address-info-add-component)
<header class="header-tab-title">app/address-info/add/address-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/add/address-info-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-address-info-add-html-component)
<header class="header-tab-title">app/address-info/add/address-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/alpha/complete-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/add/address-info-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-alpha-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic Alpha Validation Complete Example
# [AddressInfo Model](#tab/dynamic-address-info)
<header class="header-tab-title">app/address-info/address-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/dynamic-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/address-info.model.ts)]

# [Address Info Add Component](#tab/dynamic-address-info-add-component)
<header class="header-tab-title">app/address-info/add/address-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/alpha/dynamic-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/add/address-info-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-address-info-add-html-component)
<header class="header-tab-title">app/address-info/add/address-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/alpha/dynamic-rxweb-alpha-validation-add-angular-reactive-form/src/app/address-info/add/address-info-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-alpha-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






