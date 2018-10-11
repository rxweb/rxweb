---
title: json  
description: json validation validator will allow user to enter the input only in proper Json format.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a location based jsonInfo form and you have fields like locationJson,location,AddressJson,ContactJson and you want the user to enter only Json value i.e in key and value form. Here depending upon the requirement these scenarios may arise.
1. Adding LocationJson without any conditional expression.
2. 	Apply json validation based on matched condition in the form, like if the location is ‘India’ then the AddressJson value should be valid Json value.
3. Adding Custom Message on ContactJson Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how json validator fulfil the need.

# Basic Json Validation
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 


[!code-typescript[](\assets\examples\validators\json\add\json-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\json\add\json-add.component.html)]

<app-json-add-validator-validator></app-json-add-validator>

# DefaultConfig

Below options are not mandatory to use in the `RxwebValidators.json()` validator. If needed then use the below options.

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
[!code-typescript[](\assets\examples\validators\json\conditionalExpression\json-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\json\conditionalExpression\json-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\json\conditionalExpression\json-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=json validator with conditionalExpression)]
<app-json-conditionalExpression-validator></app-json-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\json\message\json-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\json\message\json-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\json\message\json-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=json validator with custom message)]
<app-json-message-validator></app-json-message-validator>

# Complete Json Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-json-complete-validator></app-json-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\json\complete\json-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\json\complete\json-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\json\complete\json-complete.component.html)]
***

# Dynamic Json Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-json-dynamic-validator></app-json-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\json\dynamic\json-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\json\dynamic\json-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\json\dynamic\json-dynamic.component.html)]
***