---
title: MinNumber Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/minNumber
---
# minNumber
MinNumber validation decorator will allow only minimum number be entered upto value parameter. If user tries to enter any number that less then the value then the property will become invalid. To use the minNumber decorator on particular property.
 
# [Basic validation on ResultInfo add form  ](#tab/basic-validation-on-ResultInfo-add-form)
let's create a ResultInfo add form with minNumber validation. The form will allow only minimum number of the value parameter in the `FormControl` of `maths`. 
Create ResultInfo data model and set the minNumber decorator on `maths` property.
<header class="header-tab-title">app/ResultInfo/result-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts?highlight=5)]
Create ResultInfo add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `ResultInfo` data model in `ngOnInit` method.
<header class="header-tab-title">app/result-info/add/result-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/result-info/add/result-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.html)]

<h3>ResultInfo Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-minnumber-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on ResultInfo edit  form](#tab/basic-validation-on-ResultInfo-edit-form)
let's create a ResultInfo edit form with minNumber validation. The form will allow only minimum number of the value parameter in the `FormControl` of `maths`. 
Create country data model and set the minNumber decorator on `maths` property.
<header class="header-tab-title">app/ResultInfo/result-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-edit-angular-reactive-form/src/app/result-info/result-info.model.ts?highlight=5)]
Create ResultInfo edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<ResultInfo>(ResultInfo,resultInfo)`
<header class="header-tab-title">app/result-info/edit/result-info-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-edit-angular-reactive-form/src/app/result-info/edit/result-info-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/result-info/edit/result-info-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-edit-angular-reactive-form/src/app/result-info/edit/result-info-edit.component.html)]

<h3>ResultInfo Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-minnumber-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@minNumber()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">result-info.model.ts (ResultInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L10-L11)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">result-info.model.ts (ResultInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L10-L11)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">result-info.model.ts (ResultInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L7-L8)]

## value 
Type :  `number` 

enter value which you want to restrict number in the property
 
<header class="header-title">result-info.model.ts (ResultInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L7-L8)]


# minNumber Validation Complete Example
# [ResultInfo Model](#tab/complete-result-info)
<header class="header-tab-title">app/result-info/result-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts)]

# [Address Info Add Component](#tab/complete-result-info-add-component)
<header class="header-tab-title">app/result-info/add/result-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-result-info-add-html-component)
<header class="header-tab-title">app/result-info/add/result-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-minnumber-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic minNumber Validation Complete Example
# [ResultInfo Model](#tab/dynamic-result-info)
<header class="header-tab-title">app/result-info/result-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/dynamic-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts)]

# [Address Info Add Component](#tab/dynamic-result-info-add-component)
<header class="header-tab-title">app/result-info/add/result-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minNumber/dynamic-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-result-info-add-html-component)
<header class="header-tab-title">app/result-info/add/result-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minNumber/dynamic-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/add/result-info-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-minnumber-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






