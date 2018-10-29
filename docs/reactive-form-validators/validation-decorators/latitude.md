---
title: latitude
description: latitude validation decorator allows user to enter value which is valid latitude.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLatitude, secondCountryLatitude and thirdCountryLatitude and you want the user to enter input which is a proper latitude format. Here depending upon the requirement, these scenarios may arise..
1. Apply validation on firstCountryLatitude field and add Custom Message on it.
2. Apply latitude validation on secondCountryLatitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLatitude must be a latitude format (Used as a function).
3. Apply latitude validation on thirdCountryLatitude field  based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLatitude must be a latitude format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how latitude decorator fulfil the need.

# Basic latitude Validation
First we need to create a model and define a property of firstCountryLatitude in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\add\country.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\edit\country.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\add\latitude-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\edit\latitude-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `number-info-data.json` for getting data from the server

[!code-typescript[](\assets\examples\latitude\edit\number-info-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\add\latitude-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\edit\latitude-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=latitude Decorator for add Example)]
<app-latitude-add></app-latitude-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=latitude Decorator for edit Example)]
<app-latitude-edit></app-latitude-edit>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@latitude()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | latitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

latitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\conditionalExpression\country.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\conditionalExpression\latitude-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\conditionalExpression\latitude-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=latitude decorator with conditionalExpression)]
<app-latitude-conditionalExpression></app-latitude-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\message\country.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\message\latitude-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\message\latitude-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=latitude decorator with custom message)]
<app-latitude-message></app-latitude-message>

# Complete latitude Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-latitude-complete></app-latitude-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\complete\country.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\complete\latitude-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\complete\latitude-complete.component.html)]
***

# Dynamic latitude Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-latitude-dynamic></app-latitude-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\dynamic\country.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\dynamic\latitude-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\latitude\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorator\latitude\dynamic\latitude-dynamic.component.html)]
***