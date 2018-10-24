---
title: primeNumber
description: primeNumber validation validator allows user to enter only the prime number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a numberInfo form, which contains fields like numberType, firstNumber, secondNumber and thirdNumber and you want the user to enter input which is a prime number. Here depending upon the requirement, these scenarios may arise..
1. Allow firstNumber which have proper primeNumber format and adding Custom Message on firstNumber.
2. Apply validation on secondNumber field based on matched condition in the form, like if the numberType is 'Prime', then the secondNumber must be a primeNumber (Used as a function).
3. Apply validation on thirdNumber field based on matched condition in the form, like if the numberType is 'Prime', then the thirdNumber must be a primeNumber (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application

Let's see how primeNumber validator fulfil the need.

# Basic primeNumber Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\add\prime-number-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\add\prime-number-add.component.html?type=section)]

[!example(?title=primeNumber validator for add Example)]
<app-primeNumber-add-validator></app-primeNumber-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.primeNumber()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\conditionalExpression\prime-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\conditionalExpression\prime-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=primeNumber validator with conditionalExpression)]
<app-primeNumber-conditionalExpression-validator></app-primeNumber-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\message\prime-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\message\prime-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=primeNumber validator with custom message)]
<app-primeNumber-message-validator></app-primeNumber-message-validator>

# Complete primeNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-primeNumber-complete-validator></app-primeNumber-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\complete\prime-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\complete\prime-number-complete.component.html)]
***

# Dynamic primeNumber Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-primeNumber-dynamic-validator></app-primeNumber-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\dynamic\prime-number-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\primeNumber\dynamic\prime-number-dynamic.component.html)]
***
