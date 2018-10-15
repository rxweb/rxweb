---
title: contains  
description: Contains validation validator will check that value is in the input, It will not allow to enter input that not contains the predefined value.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like EmailAddress, RecoveryEmailAddress, OtherEmailAddress and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains the predefined value in EmailAddress.
2.	Apply contains validation based on matched condition in the form, like if the EmailAddress is `abc@gmail.com`, then only the the contains validation must be applied to RecoveryEmailAddress value.
3.	Adding Custom Message on OtherEmailAddress Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how contains validator fulfil the need.

# Basic Contains Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\validators\contains\add\contains-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\contains\add\contains-add.component.html)]

<app-contains-add-validator></app-contains-add-validator>

# ContainsConfig 
conditionalExpression and message options are not mandatory but value is mandatory to use in the `RxwebValidators.contains()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | This is substring value. |
|[conditionalExpression](#conditionalexpressions) | Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value 
Type :  `string` 

This is substring value.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\valuemodel)
[!code-typescript[](\assets\examples\validators\contains\value\user.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\validators\contains\value\contains-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\validators\contains\value\contains-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=contains validator with value)]
<app-contains-value-validator></app-contains-value-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\contains\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\contains\conditionalExpression\contains-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\contains\conditionalExpression\contains-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=contains validator with conditionalExpression)]
<app-contains-conditionalExpression-validator></app-contains-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\contains\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\contains\message\contains-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\contains\message\contains-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=contains validator with custom message)]
<app-contains-message-validator></app-contains-message-validator>

# Complete Contains Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-contains-complete-validator></app-contains-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\contains\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\contains\complete\contains-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\contains\complete\contains-complete.component.html)]
***

# Dynamic Contains Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-contains-dynamic-validator></app-contains-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\contains\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\contains\dynamic\contains-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\contains\dynamic\contains-dynamic.component.html)]
***