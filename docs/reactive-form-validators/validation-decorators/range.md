---
title: Range Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/range
---
# range
Range validation decorator will allow only in specify range will be entered. If EmployeeInfo tries to enter any value without in range then the property will become invalid. To use the range decorator on particular property.
 
# [Basic validation on EmployeeInfo add form  ](#tab/basic-validation-on-EmployeeInfo-add-form)
let's create a EmployeeInfo add form with range validation. The form will allow to enter value in range in the `FormControl` of `age`. 
Create Employee Info data model and set the range decorator on `age` property.
<header class="header-tab-title">app/EmployeeInfo/employee-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts?highlight=5)]
Create EmployeeInfo add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `EmployeeInfo` data model in `ngOnInit` method.
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/range/rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.html)]

<h3>EmployeeInfo Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-range-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on EmployeeInfo edit  form](#tab/basic-validation-on-EmployeeInfo-edit-form)
let's create a EmployeeInfo  edit form with range validation. The form will allow to enter value in range in the `FormControl` of `age`. 
Create Employee Info data model and set the range decorator on `age` property.
<header class="header-tab-title">app/EmployeeInfo/employee-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/rxweb-range-validation-edit-angular-reactive-form/src/app/employee-info/employee-info.model.ts?highlight=5)]
Create EmployeeInfo edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<EmployeeInfo>(EmployeeInfo,employeeInfo)`
<header class="header-tab-title">app/employee-info/edit/employee-info-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/rxweb-range-validation-edit-angular-reactive-form/src/app/employee-info/edit/employee-info-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/employee-info/edit/employee-info-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/range/rxweb-range-validation-edit-angular-reactive-form/src/app/employee-info/edit/employee-info-edit.component.html)]

<h3>EmployeeInfo Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-range-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# RangeConfig 
conditionalExpression and message options are not mandatory to use in the `@range()` decorator but the minimum number and maximum number is mandatory parameter. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[minimumNumber](#minimumNumber) | Minimum number is for define a minimum number of range |
|[maximumNumber](#maximumNumber) | Maximum number is for define a maximum number of range |

## conditionalExpression 
Type :  `Function`  |  `string` 

Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">employee-info.model.ts (EmployeeInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">employee-info.model.ts (EmployeeInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">employee-info.model.ts (EmployeeInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]

## minimumNumber 
Type :  `string` 

Minimum number is for define a minimum number of range
 
<header class="header-title">employee-info.model.ts (EmployeeInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]

## maximumNumber 
Type :  `string` 

Maximum number is for define a maximum number of range
 
<header class="header-title">employee-info.model.ts (EmployeeInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]


# range Validation Complete Example
# [EmployeeInfo Model](#tab/complete-employee-info)
<header class="header-tab-title">app/employee-info/employee-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts)]

# [Address Info Add Component](#tab/complete-employee-info-add-component)
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-employee-info-add-html-component)
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-range-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic range Validation Complete Example
# [EmployeeInfo Model](#tab/dynamic-employee-info)
<header class="header-tab-title">app/employee-info/employee-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/dynamic-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts)]

# [Address Info Add Component](#tab/dynamic-employee-info-add-component)
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/range/dynamic-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-employee-info-add-html-component)
<header class="header-tab-title">app/employee-info/add/employee-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/range/dynamic-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/add/employee-info-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-range-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






