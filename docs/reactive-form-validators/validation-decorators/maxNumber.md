---
title: MaxNumber Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/maxNumber
---
# maxNumber
MaxNumber validation decorator will allow only maximum number be entered upto value parameter. If user tries to enter any number that greater then the value then the property will become invalid. To use the maxNumber decorator on particular property.
 
# [Basic validation on SubjectDetails add form  ](#tab/basic-validation-on-SubjectDetails-add-form)
let's create a subjectdetails add form with maxNumber validation. The form will allow only maximum number upto value parameter in the `FormControl` of `subjectCode`. 
Create SubjectDetails data model and set the maxNumber decorator on `subjectCode` property.
<header class="header-tab-title">app/SubjectDetails/subject-details.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts?highlight=5)]
Create subject details add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `SubjectDetails` data model in `ngOnInit` method.
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.html)]

<h3>SubjectDetails Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-maxNumber-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on SubjectDetails edit  form](#tab/basic-validation-on-SubjectDetails-edit-form)
<header class="header-tab-title">app/SubjectDetails/subject-details.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-edit-angular-reactive-form/src/app/subject-details/subject-details.model.ts?highlight=5)]
<header class="header-tab-title">app/subject-details/edit/subject-details-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-edit-angular-reactive-form/src/app/subject-details/edit/subject-details-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/subject-details/edit/subject-details-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxNumber/rxweb-maxNumber-validation-edit-angular-reactive-form/src/app/subject-details/edit/subject-details-edit.component.html)]

<h3>SubjectDetails Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-maxNumber-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxNumber()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">subject-details.model.ts (SubjectDetails class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">subject-details.model.ts (SubjectDetails class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">subject-details.model.ts (SubjectDetails class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts#L10-L11)]

## value 
Type :  `number` 

enter value which you want to restrict number in the property
 
<header class="header-title">subject-details.model.ts (SubjectDetails class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts#L10-L11)]


# maxNumber Validation Complete Example
# [SubjectDetails Model](#tab/complete-subject-details)
<header class="header-tab-title">app/subject-details/subject-details.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts)]

# [Address Info Add Component](#tab/complete-subject-details-add-component)
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-subject-details-add-html-component)
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxNumber/complete-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-maxNumber-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic Alpha Validation Complete Example
# [SubjectDetails Model](#tab/dynamic-subject-details)
<header class="header-tab-title">app/subject-details/subject-details.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/dynamic-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/subject-details.model.ts)]

# [Address Info Add Component](#tab/dynamic-subject-details-add-component)
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/maxNumber/dynamic-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-subject-details-add-html-component)
<header class="header-tab-title">app/subject-details/add/subject-details-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/maxNumber/dynamic-rxweb-maxNumber-validation-add-angular-reactive-form/src/app/subject-details/add/subject-details-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-maxNumber-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






