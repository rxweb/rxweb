---
title: digit
description: Digit validation validator will allow only digits to be entered, It will not allow any alphabets or special character.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like Age, PhoneNumber, MobileNumber and you want the user to enter only numbers. Here depending upon the requirement these scenarios may arise.
1.	Allow only numbers in Age.
2.	Apply digit validation based on matched condition in the form, like if the Age is greater than equal to 25 then only the digit validation will be applied to the PhoneNumber value.
3.	Adding Custom Message on MobileNumber Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.
 
Let’s see how digit validator fulfil the need.

# Basic digit Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\validators\digit\add\digit-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\digit\add\digit-add.component.html?type=section)]

[!example(?title=digit validator for add Example)]
<app-digit-add-validator></app-digit-add-validator>

# DigitConfig 
Below options are not mandatory to use in the `RxwebValidators.digit()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\digit\conditionalExpression\digit-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\digit\conditionalExpression\digit-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=digit validator with conditionalExpression)]
<app-digit-conditionalExpression-validator></app-digit-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\digit\message\digit-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\digit\message\digit-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=digit validator with custom message)]
<app-digit-message-validator></app-digit-message-validator>

# Complete digit Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-digit-complete-validator></app-digit-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\digit\complete\digit-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\digit\complete\digit-complete.component.html)]
***

# Dynamic digit Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-digit-dynamic-validator></app-digit-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\digit\dynamic\digit-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\digit\dynamic\digit-dynamic.component.html)]
***