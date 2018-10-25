---
title: longitude
description: longitude validation decorator allows user to enter the input which is in the proper longitude format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLongitude, secondCountryLongitude and thirdCountryLongitude and you want the user to enter input which is a proper longitude format. Here depending upon the requirement, these scenarios may arise..
1. Allow firstCountryLongitude which have proper longitude format and adding Custom Message on firstCountryLongitude.
2. Apply longitude validation on secondCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLongitude must be a longitude format (Used as a function).
3. Apply longitude validation on thirdCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLongitude must be a longitude format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how longitude decorator fulfil the need.

# Basic longitude Validation
First we need to create a model and define a property of firstCountryLongitude in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\add\country.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\edit\country.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\add\longitude-add.component.ts?type=section)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\edit\longitude-edit.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\add\longitude-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\edit\longitude-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=longitude Decorator for add Example)]
<app-longitude-add></app-longitude-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=longitude Decorator for edit Example)]
<app-longitude-edit></app-longitude-edit>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@longitude()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\conditionalExpression\country.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\conditionalExpression\longitude-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\conditionalExpression\longitude-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=longitude decorator with conditionalExpression)]
<app-longitude-conditionalExpression></app-longitude-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\message\country.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\message\longitude-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\message\longitude-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=longitude decorator with custom message)]
<app-longitude-message></app-longitude-message>

# Complete longitude Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-longitude-complete></app-longitude-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\complete\country.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\complete\longitude-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\complete\longitude-complete.component.html)]
***

# Dynamic longitude Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-longitude-dynamic></app-longitude-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\dynamic\country.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\dynamic\longitude-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\longitude\dynamic\longitude-dynamic.component.html)]
***