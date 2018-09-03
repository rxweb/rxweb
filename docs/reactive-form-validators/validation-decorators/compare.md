---
title: Compare Validation in Angular Reactive Forms
description: Compare validation decorator will compare two inputs. If user enter unmatched value then the property will become invalid. To use the compare decorator on particular property.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a form in which you want to compare passwords which are entered by the user which contains fields like Password and Confirm Password Here depending upon the requirement these scenarios may arise.
1.	The Name of Password field on which comparison is done.
2.  The Custom Message on ConfirmPassword field.  
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how compare validator fulfil the need.

# Basic Compare Validation
First we need to create a User Model class and define property of Password and Confirm Password in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/compare/rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

# CompareConfig
Below options are not mandatory to use in the `@compare()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

 
## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.
[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.
[!code-typescript[](../../examples/reactive-form-validators/compare/complete-rxweb-compare-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

# Complete Compare Example

# Dynamic Compare Example








