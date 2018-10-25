---
title: startsWith
description: startsWith validation validator allows user to enter the input which starts with perticular value
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like userId, name, profession and taskId and you want the user to enter input which starts with a perticular value. Here depending upon the requirement, these scenarios may arise..
1. Apply validation on name field in which you want the user to enter value which starts with ‘j’.
2. Apply startsWith validation based on matched condition in the form, like if the name is 'John', then the profession must starts with 'Senior ' (Used as a function).
3. Apply startsWith validation based on matched condition in the form, like if the name is 'John', then the taskId must starts with '#' (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how StartsWith validator fulfil the need.

# Basic StartsWith Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\add\starts-with-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\add\starts-with-add.component.html?type=section)]

[!example(?title=startsWith validator for add Example)]
<app-startsWith-add-validator></app-startsWith-add-validator>


# DefaultConfig
message and conditionalExpression are not mandatory to use in the `RxwebValidators.startsWith()` validator. If needed then use the below options.

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
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\value\starts-with-value.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\value\starts-with-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=startsWith validator with value)]
<app-startsWith-value-validator></app-startsWith-value-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

StartsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\conditionalExpression\starts-with-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\conditionalExpression\starts-with-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=startsWith validator with conditionalExpression)]
<app-startsWith-conditionalExpression-validator></app-startsWith-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\message\starts-with-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\message\starts-with-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=startsWith validator with custom message)]
<app-startsWith-message-validator></app-startsWith-message-validator>

# Complete StartsWith Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-startsWith-complete-validator></app-startsWith-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\complete\starts-with-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\complete\starts-with-complete.component.html)]
***

# Dynamic StartsWith Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-startsWith-dynamic-validator></app-startsWith-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\dynamic\starts-with-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\startsWith\dynamic\starts-with-dynamic.component.html)]
***
