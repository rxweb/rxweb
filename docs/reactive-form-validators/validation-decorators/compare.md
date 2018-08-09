---
title: Compare Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/compare
---
# compare
Compare validation decorator will compare two inputs. If user enter unmatched value then the property will become invalid. To use the compare decorator on particular property.
 
# [Basic validation on User add form  ](#tab/basic-validation-on-User-add-form)
let's create a user add form with compare validation. The form will compare inputs `FormControl` of `confirmPassword` with `password`. 
Create user data model and set the compare decorator on `confirmPassword` property.
Create user data model and set the compare decorator on `confirmPassword` property.
Pass parameters in compare decorator where `fieldName` is `password` for matched input field.
<header class="header-tab-title">app/User/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]
Create user add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `User` data model in `ngOnInit` method.
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

<h3>User Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-compare-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on User edit  form](#tab/basic-validation-on-User-edit-form)
let's create a user edit form with compare validation. The form will compare inputs `FormControl` of `confirmPassword` with `password`. 
Create user data model and set the compare decorator on `confirmPassword` property.
Create user data model and set the compare decorator on `confirmPassword` property.
Pass parameters in compare decorator where `fieldName` is `password` for matched input field.
<header class="header-tab-title">app/User/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-edit-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]
Create user edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<User>(User,user)`
<header class="header-tab-title">app/user/edit/user-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-edit-angular-reactive-form/src/app/user/edit/user-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/user/edit/user-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-edit-angular-reactive-form/src/app/user/edit/user-edit.component.html)]

<h3>User Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-compare-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# CompareConfig 
Below options are use in the `@compare()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Current property is matched with the particular property. so we need to pass particular property name.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]


# compare Validation Complete Example
# [User Model](#tab/complete-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/complete-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-compare-validation-add-angular-reactive-form?embed=1&file=src/app/user/user.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic compare Validation Complete Example
# [User Model](#tab/dynamic-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/dynamic-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/dynamic-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/compare/dynamic-rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/compare/dynamic-rxweb-compare-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-compare-validation-add-angular-reactive-form?embed=1&file=src/app/user/user.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---





