---
title: UpperCase Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/upperCase
---
# upperCase
Upper Case validation decorator will allow only uppercase to be entered. If user tries to enter any string except uppercase then the property will become invalid. To use the uppercase decorator on particular property.
 
# [Basic validation on Location add form  ](#tab/basic-validation-on-Location-add-form)
let's create a location add form with uppercase validation. The form will allow only uppercase in the `FormControl` of `countryName`. 
Create location data model and set the uppercase decorator on `countryName` property.
<header class="header-tab-title">app/Location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]
Create location add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `Location` data model in `ngOnInit` method.
<header class="header-tab-title">app/location/add/location-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/location/add/location-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.html)]

<h3>Location Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-uppercase-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on Location edit  form](#tab/basic-validation-on-Location-edit-form)
let's create a location edit form with uppercase validation. The form will allow only uppercase in the `FormControl` of `countryName`. 
Create location data model and set the uppercase decorator on `countryName` property.
<header class="header-tab-title">app/Location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-edit-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]
Create location edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<Location>(Location,location)`
<header class="header-tab-title">app/location/edit/location-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-edit-angular-reactive-form/src/app/location/edit/location-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/location/edit/location-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-edit-angular-reactive-form/src/app/location/edit/location-edit.component.html)]

<h3>Location Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-uppercase-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# MessageConfig 
Below options are not mandatory to use in the `@upperCase()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">location.model.ts (Location class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">location.model.ts (Location class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">location.model.ts (Location class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts#L10-L11)]


# upperCase Validation Complete Example
# [Location Model](#tab/complete-location)
<header class="header-tab-title">app/location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts)]

# [Address Info Add Component](#tab/complete-location-add-component)
<header class="header-tab-title">app/location/add/location-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-location-add-html-component)
<header class="header-tab-title">app/location/add/location-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-uppercase-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic upperCase Validation Complete Example
# [Location Model](#tab/dynamic-location)
<header class="header-tab-title">app/location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/dynamic-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts)]

# [Address Info Add Component](#tab/dynamic-location-add-component)
<header class="header-tab-title">app/location/add/location-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/upperCase/dynamic-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-location-add-html-component)
<header class="header-tab-title">app/location/add/location-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/upperCase/dynamic-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/add/location-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-uppercase-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---





