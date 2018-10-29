---
title: greaterThanEqualTo 
description: Greater than equal to validation validator will check that input property is greater than or equal to the related field input.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form and you have fields like Age, VoterAge, OtherAge and you want user to enter Age such that VoterAge,OtherAge should be greater than or equal to Age Here depending upon the requirement these scenarios may arise.
1. Specify Age as fieldName such that greaterThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply greaterThanEqualTo validation based on matched condition in the form, like if the Age is ‘18’ then the VoterAge,OtherAge value should be Greater than or equal to 18.
3. Adding Custom Message on OtherAge Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how greaterThanEqualTo validator fulfil the need.

# Basic GreaterThanEqualTo Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\add\greater-than-equal-to-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\add\greater-than-equal-to-add.component.html?type=section)]

[!example(?title=greaterThanEqualTo validator for add Example)]
<app-greaterThanEqualTo-add-validator></app-greaterThanEqualTo-add-validator>

# RelationalOperatorConfig

Below options are not mandatory to use in the `RxwebValidators.greaterThanEqualTo()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 
Greater than Equal to validation should be applied based on the `fieldName` for compare other field value 

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.html)]
***
[!example(?type=section&clickEventCode="fieldNameShow=!fieldNameShow"&title=greaterThanEqualTo validator with fieldName)]
<app-greaterThanEqualTo-fieldName-validator></app-greaterThanEqualTo-fieldName-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 
Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\conditionalExpression\greater-than-equal-to-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\conditionalExpression\greater-than-equal-to-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=greaterThanEqualTo validator with conditionalExpression)]
<app-greaterThanEqualTo-conditionalExpression-validator></app-greaterThanEqualTo-conditionalExpression-validator>

## message 
Type :  `string`
To override the global configuration message and show the custom message on particular control property. 

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\message\greater-than-equal-to-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\message\greater-than-equal-to-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=greaterThanEqualTo validator with custom message)]
<app-greaterThanEqualTo-message-validator></app-greaterThanEqualTo-message-validator>

# Complete greaterThanEqualTo Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-greaterThanEqualTo-complete-validator></app-greaterThanEqualTo-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.html)]
***

# Dynamic greaterThanEqualTo Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-greaterThanEqualTo-dynamic-validator></app-greaterThanEqualTo-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\dynamic\greater-than-equal-to-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\greaterThanEqualTo\dynamic\greater-than-equal-to-dynamic.component.html)]
***