---
title: UpperCase Validation in Angular Reactive Forms
description: Upper Case validation decorator will allow only uppercase to be entered. If user tries to enter any string except uppercase then the property will become invalid. To use the uppercase decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a Location form, which contains fields like CountryName, StateName, CityName and you want the user to must enter string only in the Upper case. Here depending upon the requirement these scenarios may arise.
1. Apply upperCase validation in the CountryName without any condition.
1.	Apply upperCase validation based on matched condition in the form, like if the CountryName is `INDIA`, then only the upperCase validation will be applied to StateName field.
2.	Adding Custom Message on CityName Field.
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how upperCase validator fulfil the need.

# Basic UpperCase Validation
First we need to create a Location class and define a property of CountryName in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/upperCase/rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
 
# UpperCaseConfig 
Below options are not mandatory to use in the `@upperCase()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Uppercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Uppercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/upperCase/complete-rxweb-upperCase-validation-add-angular-reactive-form/src/app/location/location.model.ts#L10-L11)]

# upperCase Validation Complete Example
# Dynamic upperCase Validation Complete Example
