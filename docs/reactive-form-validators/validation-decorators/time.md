---
title: Time Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/time
---
# time
time validation decorator will allow only time format to be entered. If user tries to enter any string except json then the property will become invalid. To use the json decorator on particular property.
 
# [Basic validation on AttandanceDetail add form  ](#tab/basic-validation-on-AttandanceDetail-add-form)
let's create a attandance detail add form with time validation. The form will allow only time in the `FormControl` of `entryPlace`. 
Create AttandanceDetail data model and set the `time` decorator on `entryPlace` property.
<header class="header-tab-title">app/AttandanceDetail/attandance-detail.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts?highlight=5)]
Create AttandanceDetail add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `AttandanceDetail` data model in `ngOnInit` method.
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/time/rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.html)]

<h3>AttandanceDetail Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-time-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on AttandanceDetail edit  form](#tab/basic-validation-on-AttandanceDetail-edit-form)
<header class="header-tab-title">app/AttandanceDetail/attandance-detail.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/rxweb-time-validation-edit-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts?highlight=5)]
<header class="header-tab-title">app/attandance-detail/edit/attandance-detail-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/rxweb-time-validation-edit-angular-reactive-form/src/app/attandance-detail/edit/attandance-detail-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/attandance-detail/edit/attandance-detail-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/time/rxweb-time-validation-edit-angular-reactive-form/src/app/attandance-detail/edit/attandance-detail-edit.component.html)]

<h3>AttandanceDetail Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-time-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# TimeConfig 
Below options are not mandatory to use in the `@time()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[allowSeconds](#allowSeconds) | If you are allowed seconds in time format then you need to put this as true. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">attandance-detail.model.ts (AttandanceDetail class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">attandance-detail.model.ts (AttandanceDetail class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L7-L8)]

## allowSeconds 
Type :  `boolean` 

If you are allowed seconds in time format then you need to put this as true.
 
<header class="header-title">attandance-detail.model.ts (AttandanceDetail class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L10-L11)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">attandance-detail.model.ts (AttandanceDetail class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L13-L14)]


# time Validation Complete Example
# [AttandanceDetail Model](#tab/complete-attandance-detail)
<header class="header-tab-title">app/attandance-detail/attandance-detail.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts)]

# [Address Info Add Component](#tab/complete-attandance-detail-add-component)
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-attandance-detail-add-html-component)
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-time-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic Alpha Validation Complete Example
# [AttandanceDetail Model](#tab/dynamic-attandance-detail)
<header class="header-tab-title">app/attandance-detail/attandance-detail.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/dynamic-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts)]

# [Address Info Add Component](#tab/dynamic-attandance-detail-add-component)
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/time/dynamic-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-attandance-detail-add-html-component)
<header class="header-tab-title">app/attandance-detail/add/attandance-detail-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/time/dynamic-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/add/attandance-detail-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-time-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






