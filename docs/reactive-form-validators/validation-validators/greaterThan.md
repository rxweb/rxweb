---
title: greaterThan
description: Greater than validation validator will check that input property is greater than related field input.
author: rxcontributortwo

---
#  When to use
Let’s assume that you are creating a User form, which contains fields like Age, VoterAge, OtherAge and you want the user to enter the numbers which are greater than a related field. Here depending upon the requirement these scenarios may arise.
1.	Allow numbers which are greater than a perticular field like in VoterAge.
2.	Apply greaterThan validation based on matched condition in the form, like if the Age is greater than    17, then only the greater than validation will be applied to VoterAge field.
3.	Adding Custom Message on OtherAge Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how greaterThan validator fulfil the need.

# Basic GreaterThan Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\validators\greaterThan\add\greater-than-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\greaterThan\add\greater-than-add.component.html)]

<app-greaterThan-add-validator></app-greaterThan-add-validator>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `RxwebValidators.greaterThan()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpressions) | Greater than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Greater than validation should be applied based on the `fieldName` for compare other field value 

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\validators\greaterThan\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\validators\greaterThan\fieldName\greater-than-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\validators\greaterThan\fieldName\greater-than-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldNameShow=!fieldNameShow"&title=greaterThan validator with fieldName)]
<app-greaterThan-fieldName-validator></app-greaterThan-fieldName-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

GreaterThan validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\greaterThan\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\greaterThan\conditionalExpression\greater-than-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\greaterThan\conditionalExpression\greater-than-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=greaterThan validator with conditionalExpression)]
<app-greaterThan-conditionalExpression-validator></app-greaterThan-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\greaterThan\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\greaterThan\message\greater-than-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\greaterThan\message\greater-than-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=greaterThan validator with custom message)]
<app-greaterThan-message-validator></app-greaterThan-message-validator>

# Complete greaterThan Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-greaterThan-complete-validator></app-greaterThan-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\greaterThan\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\greaterThan\complete\greater-than-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\greaterThan\complete\greater-than-complete.component.html)]
***

# Dynamic greaterThan Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-greaterThan-dynamic-validator></app-greaterThan-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\greaterThan\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\greaterThan\dynamic\greater-than-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\greaterThan\dynamic\greater-than-dynamic.component.html)]
***