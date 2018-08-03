---
title: GreaterThan Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/greaterThan
---
# greaterThan
Greater than validation decorator will check that input property is greater than related field input. If user tries to enter less than or equal to value then the property will become invalid. To use the greaterThan decorator on particular property.
 
# [Basic validation on User add form  ](#tab/basic-validation-on-User-add-form)
let's create a user add form with greater than validation. The form will check for greater than in the `FormControl` of `age`. 
Create user data model and set the greaterThan decorator on `age` property.
<header class="header-tab-title">app/User/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]
Create user add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `User` data model in `ngOnInit` method.
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

<h3>User Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-greaterthan-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on User edit  form](#tab/basic-validation-on-User-edit-form)
let's create a user edit form with greater than validation. The form will check for greater than in the `FormControl` of `age`. 
Create user data model and set the greaterThan decorator on `age` property.
<header class="header-tab-title">app/User/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-edit-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]
Create user edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<User>(User,user)`
<header class="header-tab-title">app/user/edit/user-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-edit-angular-reactive-form/src/app/user/edit/user-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user/edit/user-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/greaterThan/rxweb-greaterThan-validation-edit-angular-reactive-form/src/app/user/edit/user-edit.component.html)]

<h3>User Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-greaterthan-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@greaterThan()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Greater than validation should be applied based on the `fieldName` for compare other field value
 
> Binding `fieldName` with `string` datatype.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 

Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# greaterThan Validation Complete Example
# [User Model](#tab/complete-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/complete-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/greaterThan/complete-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-greaterthan-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic greaterThan Validation Complete Example
# [User Model](#tab/dynamic-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/dynamic-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/dynamic-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/greaterThan/dynamic-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/greaterThan/dynamic-rxweb-greaterThan-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-greaterthan-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

<iframe src="http://gitlogin.azurewebsites.net/#!/issue/validator/greaterThan" width="100%" height="500">





