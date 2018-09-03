---
title: Digit Validation in Angular Reactive Forms
description: Digit validation decorator will allow only digits to be entered. It will not allow any alphabets or special character. If user tries to do so the property will become invalid. To use the digit decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like Age, PhoneNumber, MobileNumberand you want the user to enter only numbers. Here depending upon the requirement these scenarios may arise.
1.	Allow only numbers in Age.
2.	Apply digit validation based on matched condition in the form, like if the Age is greater than equal to 25 then only the digit validation will be applied to the PhoneNumber value.
3.	Adding Custom Message on MobileNumber Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.
 
Let’s see how digit validator fulfil the need.

# Basix digit Validation
First we need to create a User class and define a property of Age in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/digit/rxweb-digit-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

# DigitConfig 
Below options are not mandatory to use in the `@digit()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!code-typescript[](../../examples/reactive-form-validators/digit/complete-rxweb-digit-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# digit Validation Complete Example
# Dynamic digit Validation Complete Example
