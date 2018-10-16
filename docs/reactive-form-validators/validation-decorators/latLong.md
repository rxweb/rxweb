---
title: latLong
description: latLong validation decorator allows user to enter the input which is in the proper Latitude or longitude format.
author: rxcontributortwo

---
# When to use
Let's assume you are creating a country form, which contains fields like continent, firstCountry, secondCountry and thirdCountry and you want the user to enter input which is a proper Latitude or longitude format. Here depending upon the requirement, these scenarios may arise..

1. Allow firstCountry which have proper Latitude or longitude format and adding Custom Message on firstCountry.
2. Apply secondCountry validation based on matched condition in the form, like if the continent is 'Asia', then the secondCountry must be a Latitude or longitude format (Used as a function).
3. Apply thirdCountry validation based on matched condition in the form, like if the continent is 'Asia', then the thirdCountry must be a Latitude or longitude format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how latLong decorator fulfil the need.

# Basic latLong Validation
First we need to create a model and define a property of firstCountry in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\add\country.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\edit\country.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\add\lat-long-add.component.ts?type=section)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\edit\lat-long-edit.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\add\lat-long-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\edit\lat-long-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=latLong Decorator for add Example)]
<app-latLong-add></app-latLong-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=latLong Decorator for edit Example)]
<app-latLong-edit></app-latLong-edit>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@latLong()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\conditionalExpression\country.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\conditionalExpression\lat-long-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\conditionalExpression\lat-long-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=latLong decorator with conditionalExpression)]
<app-latLong-conditionalExpression></app-latLong-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\message\country.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\message\lat-long-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\message\lat-long-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=latLong decorator with custom message)]
<app-latLong-message></app-latLong-message>

# Complete latLong Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-latLong-complete></app-latLong-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\complete\country.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\complete\lat-long-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\complete\lat-long-complete.component.html)]
***

# Dynamic latLong Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-latLong-dynamic></app-latLong-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\dynamic\country.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\dynamic\lat-long-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latLong\dynamic\lat-long-dynamic.component.html)]
***
