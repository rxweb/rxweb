---
title: latLong
description: latLong validation validator allows user to enter the input which is in the proper Latitude or longitude format.
author: rxcontributortwo

---
# When to use
Let's assume you are creating a country form, which contains fields like continent, firstCountry, secondCountry and thirdCountry and you want the user to enter input which is a proper Latitude or longitude format. Here depending upon the requirement, these scenarios may arise..

1. Allow firstCountry which have proper Latitude or longitude format and adding Custom Message on firstCountry.
2. Apply secondCountry validation based on matched condition in the form, like if the continent is 'Asia', then the secondCountry must be a Latitude or longitude format (Used as a function).
3. Apply thirdCountry validation based on matched condition in the form, like if the continent is 'Asia', then the thirdCountry must be a Latitude or longitude format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how latLong validator fulfil the need.

# Basic latLong Validation

We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\add\lat-long-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\add\lat-long-add.component.html?type=section)]

[!example(?title=latLong validator for add Example)]
<app-latLong-add-validator></app-latLong-add-validator>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `RxwebValidators.latLong()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\conditionalExpression\lat-long-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\conditionalExpression\lat-long-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=latLong validator with conditionalExpression)]
<app-latLong-conditionalExpression-validator></app-latLong-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\message\lat-long-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\message\lat-long-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=latLong validator with custom message)]
<app-latLong-message-validator></app-latLong-message-validator>

# Complete latLong Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-latLong-complete-validator></app-latLong-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\complete\lat-long-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\complete\lat-long-complete.component.html)]
***

# Dynamic latLong Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-latLong-dynamic-validator></app-latLong-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\dynamic\lat-long-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\latLong\dynamic\lat-long-dynamic.component.html)]
***
