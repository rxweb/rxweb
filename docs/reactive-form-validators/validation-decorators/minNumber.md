---
title: MinNumber Validation in Angular Reactive Forms
description: MinNumber validation decorator will allow only minimum number be entered upto value parameter. If user tries to enter any number that less then the value then the property will become invalid. To use the minNumber decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a ResultInfo form, which contains fields like Maths, Science, Statistics and you want the user to enter number which should not be less than a minimum number. Here depending upon the requirement these scenarios may arise.
1.	Allow number greater than 35 in Maths field.
2.	Apply minNumber validation based on matched condition in the form, like if the input of Maths is 50, then only the minNumber validation will be applied to Statistics field.
3.	Adding Custom Message on Science Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minNumber validator fulfil the need.

# Basic MinNumber Validation
First we need to create a ResultInfo class and define a property of Maths in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/minNumber/rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

# MinNumberConfig 
message and conditional expression options are not mandatory to use in the `@minNumber()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L7-L8)]

## value 
Type :  `number` 

enter value which you want to restrict number in the property
 
[!code-typescript[](../../examples/reactive-form-validators/minNumber/complete-rxweb-minNumber-validation-add-angular-reactive-form/src/app/result-info/result-info.model.ts#L7-L8)]


# minNumber Validation Complete Example

# Dynamic minNumber Validation Complete Example
