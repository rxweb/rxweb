---
title: MaxLength Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/maxLength
---
# maxLength
MaxLength validation decorator will allow only maximum length be entered upto value parameter. If user tries to enter any string that length exceed then the value then the property will become invalid. To use the maxLength decorator on particular property.
 
# [Basic validation on Location add form  ](#tab/basic-validation-on-Location-add-form)
let's create a user add form with maxLength validation. The form will allow only maximum length upto value parameter in the `FormControl` of `firstName`. 
Create user data model and set the maxLength decorator on `firstName` property.
<header class="header-tab-title">app/Location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-add-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]
Create user add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `User` data model in `ngOnInit` method.
<header class="header-tab-title">app/location/add/location-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-add-angular-reactive-form/src/app/location/add/location-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/location/add/location-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-add-angular-reactive-form/src/app/location/add/location-add.component.html)]

<h3>Location Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-maxlength-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on Location edit  form](#tab/basic-validation-on-Location-edit-form)
let's create a user edit form with maxLength validation. The form will allow only maximum length upto value parameter in the `FormControl` of `firstName`. 
Create user data model and set the maxLength decorator on `firstName` property.
<header class="header-tab-title">app/Location/location.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-edit-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]
Create user edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<Location>(Location,location)`
<header class="header-tab-title">app/location/edit/location-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-edit-angular-reactive-form/src/app/location/edit/location-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/location/edit/location-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxLength/rxweb-maxLength-validation-edit-angular-reactive-form/src/app/location/edit/location-edit.component.html)]

<h3>Location Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-maxlength-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxLength()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# maxLength Validation Complete Example
# [User Model](#tab/complete-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/complete-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxLength/complete-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-maxlength-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic maxLength Validation Complete Example
# [User Model](#tab/dynamic-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/dynamic-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/dynamic-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxLength/dynamic-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxLength/dynamic-rxweb-maxLength-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-maxlength-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

<iframe src="http://gitlogin.azurewebsites.net/#!/issue/validator/maxLength" width="100%" height="500">





