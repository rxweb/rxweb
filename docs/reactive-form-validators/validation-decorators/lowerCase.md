---
title: LowerCase Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/lowerCase
---
# lowerCase
lowerCase validation decorator will allow only lowercase to be entered. If user tries to enter any case except lower then the property will become invalid. To use the lowercase decorator on particular property.
 
# [Basic validation on UserInfo add form  ](#tab/basic-validation-on-UserInfo-add-form)
let's create a user add form with lowerCase validation. The form will allow only lowerCase in the `FormControl` of `userName`. 
Create user data model and set the lowercase decorator on `userName` property.
<header class="header-tab-title">app/UserInfo/user-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user-info/user-info.model.ts?highlight=5)]
Create user add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `User` data model in `ngOnInit` method.
<header class="header-tab-title">app/user-info/add/user-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user-info/add/user-info-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user-info/add/user-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user-info/add/user-info-add.component.html)]

<h3>UserInfo Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-lowercase-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on UserInfo edit  form](#tab/basic-validation-on-UserInfo-edit-form)
let's create a user edit form with lowerCase validation. The form will allow only lowerCase in the `FormControl` of `userName`. 
Create user data model and set the lowercase decorator on `userName` property.
<header class="header-tab-title">app/UserInfo/user-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-edit-angular-reactive-form/src/app/user-info/user-info.model.ts?highlight=5)]
Create user edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<UserInfo>(UserInfo,userInfo)`
<header class="header-tab-title">app/user-info/edit/user-info-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-edit-angular-reactive-form/src/app/user-info/edit/user-info-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user-info/edit/user-info-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/lowerCase/rxweb-lowerCase-validation-edit-angular-reactive-form/src/app/user-info/edit/user-info-edit.component.html)]

<h3>UserInfo Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-lowercase-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# MessageConfig 
Below options are not mandatory to use in the `@lowerCase()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# lowerCase Validation Complete Example
# [User Model](#tab/complete-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/complete-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/lowerCase/complete-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-lowercase-validation-add-angular-reactive-form?embed=1&file=src/app/user/user.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic lowerCase Validation Complete Example
# [User Model](#tab/dynamic-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/dynamic-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/dynamic-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/lowerCase/dynamic-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/lowerCase/dynamic-rxweb-lowerCase-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-lowercase-validation-add-angular-reactive-form?embed=1&file=src/app/user/user.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---





