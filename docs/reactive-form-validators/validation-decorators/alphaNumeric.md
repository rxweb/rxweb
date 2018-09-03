---
title: AlphaNumeric Validation in Angular Reactive Forms
description: Alpha Numeric validation decorator will allow only alphabets and numbers to be entered. It will not allow any special character. If user tries to do so the property will become invalid. To use the alphaNumeric decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a Location form, which contains fields like AreaName, FlatAddress, PostalAddress, CityCode and you want the user to enter only alphabets and numbers. Here depending upon the requirement these scenarios may arise.
1.	Allow only alphabets and numbers in AreaName without space.
2.	Allowing WhiteSpace in FlatAddress.
3.	Apply alphaNumeric validation based on matched condition in the form, like if the AreaName is `Boston` then the CityCode value should be in alphabets and numbers.
4.	Adding Custom Message on PostalAddress Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how alphaNumeric validator fulfil the need.

# Basic AlphaNumeric Validation
First we need to create a Location class and define a property of AreaName in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/alphaNumeric/rxweb-alphaNumeric-validation-add-angular-reactive-form/src/app/location/location.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

# AlphaNumericConfig 
Below options are not mandatory to use in the `@alphaNumeric()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowwhitespace) | This will allow whitespace in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalexpression) | AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.

[!code-typescript[](../../examples/reactive-form-validators/alphaNumeric/complete-rxweb-alphaNumeric-validation-add-angular-reactive-form/src/app/location/location.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 

AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/alphaNumeric/complete-rxweb-alphaNumeric-validation-add-angular-reactive-form/src/app/location/location.model.ts#L10-L11)]


# alphaNumeric Validation Complete Example
--- 
# Dynamic alphaNumeric Validation Complete Example
---





