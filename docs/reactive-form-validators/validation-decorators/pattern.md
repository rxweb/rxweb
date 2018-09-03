---
title: Pattern Validation in Angular Reactive Forms
description: Pattern validation decorator will allow only match input as pattern to be entered. If user tries to enter any string which is not matched pattern then the property will become invalid. To use the pattern decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains only Alphabet in Username.
2.	Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).
3.	Adding Custom Message on Zipcode Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how pattern validator fulfil the need.

# Basic Contains Validation
First we need to create a User class and define a property of UserName in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/pattern/rxweb-pattern-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
 
# PatternConfig 
message,conditionalExpression options are not mandatory to use in the `@pattern()` decorator but pattern is mandatory. If required, then user can use these options accordingly:

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[conditionalExpression](#conditionalexpression) | Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[pattern](#pattern) | enter specific regex pattern |

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/pattern/complete-rxweb-pattern-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
## pattern 
Type :  `string` 

enter specific regex pattern
 
[!code-typescript[](../../examples/reactive-form-validators/pattern/complete-rxweb-pattern-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]


# pattern Validation Complete Example
# Dynamic pattern Validation Complete Example
