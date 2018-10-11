---
title: odd
description: Odd validation validator will check whether the value entered is an odd number or not.
author: rxcontributorone

---

# When to use
Let’s assume that you are creating a user form, which contains fields like Number, Type, OddNumber and you want the user to enter only odd numbers Here depending upon the requirement these scenarios may arise.
1.	Allow only oddnumbers in OddNumber .
2.	Apply Odd validation based on matched condition in the form, like if the type  is ‘Odd’ then the number value should be odd number.
3.	Adding Custom Message on OddNumber Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how Odd validator fulfil the need.

# Basic Odd Validation
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\validators\odd\add\odd-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\odd\add\odd-add.component.html)]

<app-odd-add-validator></app-odd-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.odd()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Odd  validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Odd validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\odd\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\odd\conditionalExpression\odd-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\odd\conditionalExpression\odd-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=odd validator with conditionalExpression)]
<app-odd-conditionalExpression-validator></app-odd-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\odd\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\odd\message\odd-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\odd\message\odd-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=odd validator with custom message)]
<app-odd-message-validator></app-odd-message-validator>

# Complete Odd Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-odd-complete-validator></app-odd-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\odd\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\odd\complete\odd-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\odd\complete\odd-complete.component.html)]
***

# Dynamic Odd Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-odd-dynamic-validator></app-odd-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\odd\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\odd\dynamic\odd-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\odd\dynamic\odd-dynamic.component.html)]
***