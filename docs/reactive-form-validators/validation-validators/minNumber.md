---
title: minNumber 
description: MinNumber validation validator will allow user to enter the input greater than the minimum number value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a ResultInfo form, which contains fields like Maths, Science, Statistics and you want the user to enter number which should not be less than a minimum number. Here depending upon the requirement these scenarios may arise.
1.	Allow number greater than 35 in Maths field.
2.	Apply minNumber validation based on matched condition in the form, like if the input of Maths is 50, then only the minNumber validation will be applied to Statistics field.
3.	Adding Custom Message on Science Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minNumber validator fulfil the need.

# Basic MinNumber Validation
We need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\add\min-number-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\add\min-number-add.component.html?type=section)]


[!example(?title=minNumber validator for add Example)]
<app-minNumber-add-validator></app-minNumber-add-validator>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `RxwebValidators.minNumber()` validator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\conditionalExpression\min-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\conditionalExpression\min-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=minNumber validator with conditionalExpression)]
<app-minNumber-conditionalExpression-validator></app-minNumber-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\message\min-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\message\min-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=minNumber validator with custom message)]
<app-minNumber-message-validator></app-minNumber-message-validator>

## value 
Type :  `number` 

enter value which you want to restrict number in the property

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="valueShow")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\value\min-number-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\value\min-number-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=minNumber validator with value)]
<app-minNumber-value-validator></app-minNumber-value-validator>

# Complete minNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-minNumber-complete-validator></app-minNumber-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\complete\min-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\complete\min-number-complete.component.html)]
***

# Dynamic minNumber Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-minNumber-dynamic-validator></app-minNumber-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\dynamic\min-number-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\minNumber\dynamic\min-number-dynamic.component.html)]
***