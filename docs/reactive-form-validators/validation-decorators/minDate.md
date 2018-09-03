---
title: MinDate Validation in Angular Reactive Forms
description: Minimum Date validation decorator will allow only minimum date be entered upto value parameter. If user tries to enter any date that less then the value then the property will become invalid. To use the minDate decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like Username, BirthDate, RegistrationDate and you want the user to enter date which must be greater rhan a minimum date. Here depending upon the requirement these scenarios may arise.
1.	Allow date greater than `30/07/2018 ` in RegistrationDate.
2.	Apply maxLength validation based on matched condition in the form, like if the UserName is `john`, then only the minDate validation will be applied to BirthDate field (i.e., BirthDate must be greater than `30/07/2018 `).
3.	Adding Custom Message on RegistrationDate Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minDate validator fulfil the need.

# Basic MinDate Validation
First we need to create a User class and define a property of RegistrationDate in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/minDate/rxweb-minDate-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
 
# MinDateConfig 
message and conditional expression options are not mandatory to use in the `@minDate()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Min Date validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict date in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Date validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!code-typescript[](../../examples/reactive-form-validators/minDate/complete-rxweb-minDate-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]

## value 
Type :  `Date` 

enter value which you want to restrict number in the property

[!code-typescript[](../../examples/reactive-form-validators/minDate/complete-rxweb-minDate-validation-add-angular-reactive-form/src/app/user/user.model.ts#L4-L8)]


# minDate Validation Complete Example

# Dynamic minDate Validation Complete Example
