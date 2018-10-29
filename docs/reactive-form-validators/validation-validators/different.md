---
title: different 
description: Different validation validator will check two inputs whether they are different or not. It is just opposite of compare validator.
author: rxcontributorone

---

# When to use
Suppose you want to create a user form in which you want to compare firstname and LastName which are entered by the user which contains fields like firstname and lastname, password Here depending upon the requirement these scenarios may arise.
1. The Name of firstName field on which comparison is done.
2. The Custom Message on password field.
3. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how different validator fulfil the need.

# Basic Different Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\add\different-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\add\different-add.component.html?type=section)]

[!example(?title=different validator for add Example)]
<app-different-add-validator></app-different-add-validator>

# DifferentConfig
Below options are not mandatory to use in the `RxwebValidators.different()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\conditionalExpression\different-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\conditionalExpression\different-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=different validator with conditionalExpression)]
<app-different-conditionalExpression-validator></app-different-conditionalExpression-validator>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\fieldName\different-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\fieldName\different-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=different validator with fieldName)]
<app-different-fieldName-validator></app-different-fieldName-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\message\different-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\message\different-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=different validator with custom message)]
<app-different-message-validator></app-different-message-validator>

# Complete Different Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-different-complete-validator></app-different-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\complete\different-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\complete\different-complete.component.html)]
***

# Dynamic Different Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-different-dynamic-validator></app-different-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\dynamic\different-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\different\dynamic\different-dynamic.component.html)]
***