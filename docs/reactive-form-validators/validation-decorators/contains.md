---
title: Contains Validation in Angular Reactive Forms
description: Contains validation decorator will check that value is in the input. It will not allow to enter input that not contains value. If user tries to do so the property will become invalid. To use the contains decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like EmailAddress, RecoveryEmailAddress, OtherEmailAddress and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains the predefined value in EmailAddress.
2.	Apply contains validation based on matched condition in the form, like if the EmailAddress is `abc@gmail.com`, then only the the contains validation must be applied to RecoveryEmailAddress value.
3.	Adding Custom Message on OtherEmailAddress Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how contains validator fulfil the need.

# Basic Contains Validation
First we need to create a User class and define a property of EmailAddress in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/contains/rxweb-contains-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

# ContainsConfig 
conditionalExpression and message options are not mandatory but value is mandatory to use in the `@contains()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | This is substring value. |
|[conditionalExpression](#conditionalexpression) | Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value 
Type :  `string` 

This is substring value.

[!code-typescript[](../../examples/reactive-form-validators/contains/complete-rxweb-contains-validation-add-angular-reactive-form/src/app/user/user.model.ts#L4-L5)]

## conditionalExpression 
Type :  `Function`  |  `string` 

Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!code-typescript[](../../examples/reactive-form-validators/contains/complete-rxweb-contains-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]

# contains Validation Complete Example
---
# Dynamic contains Validation Complete Example
---





