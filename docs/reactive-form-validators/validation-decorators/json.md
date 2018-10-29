---
title: json  
description: json validation decorator will allow user to enter the input only in proper Json format.
author: rxcontributorone

---
# When to use
Suppose you want to create a location based jsonInfo form and you have fields like locationJson, location, AddressJson, ContactJson and you want the user to enter only Json value i.e in key and value form. Here depending upon the requirement these scenarios may arise.
1. Apply json validation on LocationJson field  without any conditional expression.
2. Apply json validation based on matched condition in the form, like if the location is ‘India’ then the AddressJson value should be valid Json value.
3. Adding Custom Message on ContactJson Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how json validator fulfil the need.

# Basic Json Validation
First we need to create location model class define a property of LocationJson in the model to achieve the functional need of point 1
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\add\json-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\edit\json-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\add\json-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\edit\json-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `json-info-data.json` for getting data from the server

[!code-typescript[](\assets\examples\json\edit\json-info-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\add\json-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\edit\json-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=json Decorator for add Example)]
<app-json-add></app-json-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=json Decorator for edit Example)]
<app-json-edit></app-json-edit>

# DefaultConfig

Below options are not mandatory to use in the `@json()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression
Type :  `Function`  |  `string` 

Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\conditionalExpression\json-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\conditionalExpression\json-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\conditionalExpression\json-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=json decorator with conditionalExpression)]
<app-json-conditionalExpression></app-json-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\message\json-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\message\json-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\message\json-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=json decorator with custom message)]
<app-json-message></app-json-message>

# Complete Json Example

This Complete Json example which includes all the DefaultConfig properties will fulfil the requirement of scenarios 1, 2 and 3

[!TabGroup]
# [Example](#tab\completeexample)
<app-json-complete></app-json-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\complete\json-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\complete\json-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\complete\json-complete.component.html)]
***

# Dynamic Json Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-json-dynamic></app-json-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\dynamic\json-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\dynamic\json-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\json\dynamic\json-dynamic.component.html)]
***