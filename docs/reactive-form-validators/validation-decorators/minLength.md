---
title: MinLength Validation in Angular Reactive Forms
description: MinLength validation decorator will allow only minimum length be entered upto value parameter. If user tries to enter any string that length exceed then the value then the property will become invalid. To use the minLength decorator on particular property.
author: rxcontributorone

---
# When to use
 Let’s assume that you are creating a Contact form, which contains fields like countryName, MobileNo,LandlineNo and you want the user to enter valid  Number which should be of the minimum specified length. Here depending upon the requirement these scenarios may arise.
1. 	Apply MinLength validation based on matched condition in the form, like if the CountryName is ‘India’ then the countryCode value  should be of the minimum specified length. .
2. Adding Custom Message on LandlineNo Field.
3. Adding value which you want to restrict number in the property. The Minimum length is '10'. 
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minLength validator fulfil the need.

# Basic MinLength Validation
First we need to create Contact model class define a property of CountryName in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

# MinLengthConfig 

message and conditional expression options are not mandatory to use in the `@minLength()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L13-L14)]

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L10-L11)]


## value 
Type :  `number` 
enter value which you want to restrict string length in the property.
[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L10-L11)]

# Complete MinLength Example

# Dynamic MinLength Example
