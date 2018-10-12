---
title: maxLength 
description: MaxLength validation validator will allow user to enter the input upto the maximum length value parameter.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like FirstName, LastName, Username and you want the user to enter any string which should not exceed maximum length. Here depending upon the requirement these scenarios may arise.
1.	Allow string less than 16 characters in FirstName.
2.	Apply maxLength validation based on matched condition in the form, like if the FirstName is `john`, then only the maxLength validation will be applied to LastName field.
3.	Adding Custom Message on Username Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how maxLength validator fulfil the need.

# Basic MaxLength Validation
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\add\max-length-add.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\add\max-length-add.component.html?type=section)]

[!example(?title=maxLength validator for add Example)]
<app-maxLength-add-validator></app-maxLength-add-validator>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `RxwebValidators.maxLength()` validator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\conditionalExpression\max-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\conditionalExpression\max-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=maxLength validator with conditionalExpression)]
<app-maxLength-conditionalExpression-validator></app-maxLength-conditionalExpression-validator>
 
 ## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\message\max-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\message\max-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=maxLength validator with custom message)]
<app-maxLength-message-validator></app-maxLength-message-validator>

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="valueShow")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\value\max-length-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\value\max-length-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=maxLength validator with value)]
<app-maxLength-value-validator></app-maxLength-value-validator>

# Complete maxLength Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-maxLength-complete-validator></app-maxLength-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\complete\max-length-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\complete\max-length-complete.component.html)]
***

# Dynamic maxLength Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-maxLength-dynamic-validator></app-maxLength-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\dynamic\max-length-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxLength\dynamic\max-length-dynamic.component.html)]
***