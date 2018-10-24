---
title: lessThan
description: Less than validation validator will allow the user to enter only that value which is less than the value in the pre defined field.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like ObtainedMarks, PassingMarks, OtherMarks and you want the user to enter the numbers which are less than a related field. Here depending upon the requirement these scenarios may arise.
1.	Allow numbers which are less than a perticular field like in PassingMarks.
2.	Apply lessThan validation based on matched condition in the form, like if the ObtainedMarks is less than 35, then only the greater than validation will be applied to PassingMarks field.
3.	Adding Custom Message on OtherMarks Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how lessThan validator fulfil the need.

# Basic LessThan Validation
We need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\add\less-than-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\add\less-than-add.component.html?type=section)]

[!example(?title=lessThan validator for add Example)]
<app-lessThan-add-validator></app-lessThan-add-validator>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `RxwebValidators.lessThan()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Less than validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Less than validation should be applied based on the `fieldName` for compare other field value

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\fieldName\less-than-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\fieldName\less-than-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldNameShow=!fieldNameShow"&title=lessThan validator with fieldName)]
<app-lessThan-fieldName-validator></app-lessThan-fieldName-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\conditionalExpression\less-than-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\conditionalExpression\less-than-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=lessThan validator with conditionalExpression)]
<app-lessThan-conditionalExpression-validator></app-lessThan-conditionalExpression-validator>
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
 [!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\message\less-than-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\message\less-than-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=lessThan validator with custom message)]
<app-lessThan-message-validator></app-lessThan-message-validator>

# Complete lessThan Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-lessThan-complete-validator></app-lessThan-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\complete\less-than-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\complete\less-than-complete.component.html)]
***

# Dynamic lessThan Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-lessThan-dynamic-validator></app-lessThan-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\dynamic\less-than-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\lessThan\dynamic\less-than-dynamic.component.html)]
***