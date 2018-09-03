---
title: Required Validation in Angular Reactive Forms
description: Required validation decorator will check that value is entered or not in the property. If user not enter any value then the property will become invalid. To use the required decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like FirstName, LastName, Username and you want the user to must enter anything in that field. That field can not be empty. Here depending upon the requirement these scenarios may arise.
1. Make the FirstName a required field without any condition.
1.	Apply required validation based on matched condition in the form, like if the FirstName is `John`, then only the required validation will be applied to LastName field.
2.	Adding Custom Message on Username Field.
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how required validator fulfil the need.

# Basic Required Validation
First we need to create a User class and define a property of FirstName in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/required/rxweb-required-validation-add-angular-reactive-form/src/app/user-info/user-info.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
 
# RequiredConfig 
Below options are not mandatory to use in the `@required()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Required validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Required validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/required/complete-rxweb-required-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# required Validation Complete Example

# Dynamic required Validation Complete Example
