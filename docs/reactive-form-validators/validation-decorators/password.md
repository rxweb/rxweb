---
title: Password Validation in Angular Reactive Forms
description: Password validation decorator will allow only password to be entered. If user tries to enter any string rather than password pattern according for PasswordValidation parameters then the property will become invalid. To use the password decorator on particular property.
author: rxcontributorone

---
# When to use
 Let’s assume that you are creating a User form, which contains fields like EntryPlace,EntryTime,TotalTimeOut,ExitTime and you want the user to enter valid time. Here depending upon the requirement these scenarios may arise.	
1. Adding Custom Message on password Field.
2. Apply validation in Password validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.
3. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

# Basic password Validation
First we need to create LoginInfo model class define a property of password in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/password/rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

# PasswordConfig 
message options are not mandatory to use in the `@password()` decorator but validation is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[validation](#validation) | Password Validation is used for parameters for password validation, In Password validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength. |

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.
[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts#L7-L8)]

## validation 
Type :  `PasswordValidation`
Password Validation is used for parameters for password validation, In Password validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.

[!code-typescript[](../../examples/reactive-form-validators/password/complete-rxweb-password-validation-add-angular-reactive-form/src/app/login-info/login-info.model.ts#L4-L5)]

# Complete password Example

# Dynamic password Example



