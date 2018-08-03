---
title: Password Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/password
---
# password
Password validation decorator will allow only password to be entered. If user tries to enter any string rather than password pattern according for PasswordValidation parameters then the property will become invalid. To use the password decorator on particular property.
 
# [Basic validation on LoginInfo add form  ](#tab/basic-validation-on-LoginInfo-add-form)
let's create a LoginInfo add form with password validation. The form will allow only password in the `FormControl` of `newPassword`. 
Create LoginInfo data model and set the password decorator on `newPassword` property.
<header class="header-tab-title">app/LoginInfo/login-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts?highlight=5)]
Create LoginInfo add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `LoginInfo` data model in `ngOnInit` method.
<header class="header-tab-title">app/login-info/add/login-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/login-info/add/login-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/password/rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.html)]

<h3>LoginInfo Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-password-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on LoginInfo edit  form](#tab/basic-validation-on-LoginInfo-edit-form)
let's create a LoginInfo edit form with password validation. The form will allow only password in the `FormControl` of `newPassword`. 
Create LoginInfo data model and set the password decorator on `newPassword` property.
<header class="header-tab-title">app/LoginInfo/login-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/rxweb-password-validation-edit-angular-reactive-form/src/app/login-info/login-info.model.ts?highlight=5)]
Create LoginInfo edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<LoginInfo>(LoginInfo,loginInfo)`
<header class="header-tab-title">app/login-info/edit/login-info-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/rxweb-password-validation-edit-angular-reactive-form/src/app/login-info/edit/login-info-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/login-info/edit/login-info-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/password/rxweb-password-validation-edit-angular-reactive-form/src/app/login-info/edit/login-info-edit.component.html)]

<h3>LoginInfo Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-password-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# PasswordConfig 
message options are not mandatory to use in the `@password()` decorator but validation is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[validation](#validation) | Password Validation is used for parameters for password validation, In Password validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength. |

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">login-info.model.ts (LoginInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts#L7-L8)]

## validation 
Type :  `PasswordValidation` 

Password Validation is used for parameters for password validation, In Password validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.
 
<header class="header-title">login-info.model.ts (LoginInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts#L4-L5)]


# password Validation Complete Example
# [LoginInfo Model](#tab/complete-login-info)
<header class="header-tab-title">app/login-info/login-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts)]

# [Address Info Add Component](#tab/complete-login-info-add-component)
<header class="header-tab-title">app/login-info/add/login-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-login-info-add-html-component)
<header class="header-tab-title">app/login-info/add/login-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-password-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic password Validation Complete Example
# [LoginInfo Model](#tab/dynamic-login-info)
<header class="header-tab-title">app/login-info/login-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/dynamic-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts)]

# [Address Info Add Component](#tab/dynamic-login-info-add-component)
<header class="header-tab-title">app/login-info/add/login-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/password/dynamic-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-login-info-add-html-component)
<header class="header-tab-title">app/login-info/add/login-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/password/dynamic-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/add/login-info-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-password-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

<iframe src="http://gitlogin.azurewebsites.net/#!/issue/validator/password" width="100%" height="500">





