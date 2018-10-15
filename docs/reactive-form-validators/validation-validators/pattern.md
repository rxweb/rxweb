---
title: pattern 
description: Pattern validation validator will allow user to enter the input which match the predefined pattern value parameter.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains only Alphabet in Username.
2.	Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).
3.	Adding Custom Message on Zipcode Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how pattern validator fulfil the need.

# Basic Pattern Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\add\pattern-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\add\pattern-add.component.html?type=section)]

[!example(?title=pattern validator for add Example)]
<app-pattern-add-validator></app-pattern-add-validator>
 
# PatternConfig 
message,conditionalExpression options are not mandatory to use in the `RxwebValidators.pattern()` validator but pattern is mandatory. If required, then user can use these options accordingly:

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[conditionalExpression](#conditionalexpression) | Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[pattern](#pattern) | enter specific regex pattern |

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\message\pattern-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\message\pattern-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=pattern validator with custom message)]
<app-pattern-message-validator></app-pattern-message-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\conditionalExpression\pattern-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\conditionalExpression\pattern-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=pattern validator with conditionalExpression)]
<app-pattern-conditionalExpression-validator></app-pattern-conditionalExpression-validator>
 
## pattern 
Type :  `string` 

enter specific regex pattern

[!codeExample(?title=patternExample)]

 [!TabGroup(?showHideCondition="pattern")]
# [Component](#tab\patternComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\pattern\pattern-pattern.component.ts)]
# [Html](#tab\patternHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\pattern\pattern-pattern.component.html)]
***

[!example(?type=section&clickEventCode="pattern=!pattern"&title=pattern validator with pattern)]
<app-pattern-pattern-validator></app-pattern-pattern-validator>

# Complete pattern Example
[!TabGroup]
# [Example](#tab\completeExample)
<app-pattern-complete-validator></app-pattern-complete-validator>
# [Component](#tab\completeComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\complete\pattern-complete.component.ts)]
# [Html](#tab\completeHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\complete\pattern-complete.component.html)]
***

# Dynamic pattern Example
[!TabGroup]
# [Example](#tab\dynamicExample)
<app-pattern-dynamic-validator></app-pattern-dynamic-validator>
# [Component](#tab\dynamicComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\dynamic\pattern-dynamic.component.ts)]
# [Html](#tab\dynamicHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\pattern\dynamic\pattern-dynamic.component.html)]
***