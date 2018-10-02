---
title: Json Validation 
description: json validation decorator will allow only Json to be entered. If user tries to enter any string except json then the property will become invalid. To use the json decorator on particular property.
author: rxcontributorone

---
# When to use
Let's assume that you are creating location form and you have fields like locationJson,location,AddressJson,ContactJson and you want the user to enter only Json value i.e in key and value form. Here depending upon the requirement these scenarios may arise.
1. Adding LocationJson without any conditional expression.
1. 	Apply json validation based on matched condition in the form, like if the location is ‘India’ then the AddressJson value should be valid Json value.
2. Adding Custom Message on ContactJson Field.
3. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

# Basic Json Validation
First we need to create location model class define a property of LocationJson in the model to achieve the functional need of point 1
[!code-typescript[](\assets\examples\json\add\json-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\json\edit\json-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\json\add\json-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\json\edit\json-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\json\add\json-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\json\edit\json-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-json-add></app-json-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-json-edit></app-json-edit>

# DefaultConfig

Below options are not mandatory to use in the `@json()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\json\conditionalExpressions\json-info.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\json\conditionalExpressions\json-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\json\conditionalExpressions\json-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-greaterthanequalto-conditionalExpressions></app-greaterthanequalto-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\json\message\json-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\json\message\json-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\json\message\json-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-json-message></app-json-message>

# Complete Json Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-json-complete></app-json-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\json\complete\json-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\json\complete\json-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\json\complete\json-complete.component.html)]
***
