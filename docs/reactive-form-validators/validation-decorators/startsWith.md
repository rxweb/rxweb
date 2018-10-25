---
title: startsWith
description: startsWith validation decorator allows user to enter the input which starts with particular value.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like userId, name, profession and taskId and you want the user to enter input which starts with a perticular value. Here depending upon the requirement, these scenarios may arise..
1. Apply validation on name field in which you want the user to enter value which starts with ‘j’.
2. Apply startsWith validation based on matched condition in the form, like if the name is 'John', then the profession must starts with 'Senior ' (Used as a function).
3. Apply startsWith validation based on matched condition in the form, like if the name is 'John', then the taskId must starts with '#' (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how StartsWith decorator fulfil the need.

# Basic StartsWith Validation
First we need to create a User model and define a property of name in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\add\starts-with-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\edit\starts-with-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\startsWith\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\add\starts-with-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\edit\starts-with-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=startsWith Decorator for add Example)]
<app-startsWith-add></app-startsWith-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=startsWith Decorator for edit Example)]
<app-startsWith-edit></app-startsWith-edit>

# DefaultConfig
message and conditionalExpression are not mandatory to use in the `@startsWith()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | The `value` from which the input should starts with. |
|[conditionalExpression](#conditionalExpression) | startsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value
Type: `string`

The `value` from which the input should starts with.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="value")]
# [Model](#tab\valuemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\value\user.model.ts)]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\value\starts-with-value.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\value\starts-with-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=startsWith decorator with value)]
<app-startsWith-value></app-startsWith-value>

## conditionalExpression 
Type :  `Function`  |  `string` 

StartsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\conditionalExpression\starts-with-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\conditionalExpression\starts-with-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=startsWith decorator with conditionalExpression)]
<app-startsWith-conditionalExpression></app-startsWith-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\message\starts-with-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\message\starts-with-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=startsWith decorator with custom message)]
<app-startsWith-message></app-startsWith-message>

# Complete StartsWith Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-startsWith-complete></app-startsWith-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\complete\starts-with-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\complete\starts-with-complete.component.html)]
***

# Dynamic StartsWith Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-startsWith-dynamic></app-startsWith-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\dynamic\starts-with-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\startsWith\dynamic\starts-with-dynamic.component.html)]
***
