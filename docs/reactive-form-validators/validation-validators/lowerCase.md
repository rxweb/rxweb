---
title: lowerCase 
description: lowerCase validation validator will allow user to enter only the lowercase alphabets.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like Username, FirstName, LastName and you want the user to enter any string only in lowercase. Here depending upon the requirement these scenarios may arise.
1.	Allow only lowercase alphabets in Username.
2.	Apply lowerCase validation based on matched condition in the form, like if the Username is `jonathan.feldman`, then only the lowerCase validation will be applied to FirstName field.
3.	Adding Custom Message on LastName Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how lowerCase validator fulfil the need.

# Basic LowerCase Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\validators\lowerCase\add\lower-case-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\lowerCase\add\lower-case-add.component.html)]

<app-lowerCase-add-validator></app-lowerCase-add-validator>

# MessageConfig 
Below options are not mandatory to use in the `RxwebValidators.lowerCase()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\lowerCase\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\lowerCase\conditionalExpression\lower-case-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\lowerCase\conditionalExpression\lower-case-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=lowerCase validator with conditionalExpression)]
<app-lowerCase-conditionalExpression-validator></app-lowerCase-conditionalExpression-validator>
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\lowerCase\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\lowerCase\message\lower-case-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\lowerCase\message\lower-case-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=lowerCase validator with custom message)]
<app-lowerCase-message-validator></app-lowerCase-message-validator>

# Complete lowercase Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-lowerCase-complete-validator></app-lowerCase-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\lowerCase\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\lowerCase\complete\lower-case-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\lowerCase\complete\lower-case-complete.component.html)]
***

# Dynamic lowercase Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-lowerCase-dynamic-validator></app-lowerCase-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\lowerCase\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\lowerCase\dynamic\lower-case-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\lowerCase\dynamic\lower-case-dynamic.component.html)]
***