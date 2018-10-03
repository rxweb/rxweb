---
title: GreaterThan Validation
description: Greater than validation decorator will check that input property is greater than related field input. If user tries to enter less than or equal to value then the property will become invalid. To use the greaterThan decorator on particular property.
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
First we need to create a User class and define a property of Age and VoterAge with the requirement of VoterAge must be greater than Age field in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\greaterThan\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\greaterThan\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\greaterThan\add\greater-than-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\greaterThan\edit\greater-than-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\greaterThan\add\greater-than-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\greaterThan\edit\greater-than-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-greaterThan-add></app-greaterThan-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-greaterThan-edit></app-greaterThan-edit>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@greaterThan()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpressions](#conditionalexpression) | Greater than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Greater than validation should be applied based on the `fieldName` for compare other field value 

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\greaterThan\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\greaterThan\fieldName\greater-than-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\greaterThan\fieldName\greater-than-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldNameShow=!fieldNameShow")]
<app-greaterThan-fieldName></app-greaterThan-fieldName>

## conditionalExpressions 
Type :  `Function`  |  `string` 

GreaterThan validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\greaterThan\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\greaterThan\conditionalExpressions\greater-than-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\greaterThan\conditionalExpressions\greater-than-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-greaterThan-conditionalExpressions></app-greaterThan-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\greaterThan\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\greaterThan\message\greater-than-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\greaterThan\message\greater-than-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-greaterThan-message></app-greaterThan-message>

# Complete greaterThan Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-greaterThan-complete></app-greaterThan-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\greaterThan\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\greaterThan\complete\greater-than-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\greaterThan\complete\greater-than-complete.component.html)]
***
