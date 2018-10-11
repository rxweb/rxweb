---
title: lessThanEqualTo
description: Less than equal to validation validator will check that input property is less than equal to value, If user tries to enter greater than value then the property will become invalid. 
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you have fields like TotalMarks,ObtainedMarks,OtherMarks and you want user to enter ObtainedMarks,OtherMarks such that they should be less than or equal to TotalMarks Here depending upon the requirement these scenarios may arise
1. Specify TotalMarks as fieldName such that LessThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply LessThanEqualTo validation based on matched condition in the form, like if the TotalMarks is ‘100’ then the ObtainedMarks,OtherMarks value should be less than or equal to 100.
3. Adding Custom Message on OtherMarks Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how lessThanEqualTo validator fulfil the need.

# Basic LessThanEqualTo Validation
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\validators\lessThanEqualTo\add\less-than-equal-to-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\add\less-than-equal-to-add.component.html)]

<app-lessThanEqualTo-add-validator></app-lessThanEqualTo-add-validator>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `RxwebValidators.lessThanEqualTo()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Less than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpressions) | Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## fieldName 
Type :  `string` 
Less than Equal to validation should be applied based on the `fieldName` for compare other field value. 

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\fieldName\less-than-equal-to-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\fieldName\less-than-equal-to-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=lessThanEqualTo validator with fieldName)]
<app-lessThanEqualTo-fieldName-validator>></app-lessThanEqualTo-fieldName-validator>>

## conditionalExpression 
Type :  `Function`  |  `string` 
Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. 

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\conditionalExpression\less-than-equal-to-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\conditionalExpression\less-than-equal-to-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=lessThanEqualTo validator with conditionalExpression)]
<app-lessThanEqualTo-conditionalExpression-validator>></app-lessThanEqualTo-conditionalExpression-validator>>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\message\less-than-equal-to-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\message\less-than-equal-to-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=lessThanEqualTo validator with custom message)]
<app-lessThanEqualTo-message-validator>></app-lessThanEqualTo-message-validator>>

# Complete lessThanEqualTo Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-lessThanEqualTo-complete-validator></app-lessThanEqualTo-complete-validator>>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\complete\less-than-equal-to-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\complete\less-than-equal-to-complete.component.html)]
***

# Dynamic lessThanEqualTo Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-lessThanEqualTo-dynamic-validator></app-lessThanEqualTo-dynamic-validator>>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\dynamic\less-than-equal-to-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\lessThanEqualTo\dynamic\less-than-equal-to-dynamic.component.html)]
***