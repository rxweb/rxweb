---
title: digit Validation
description: Digit validation decorator will allow only digits to be entered. It will not allow any alphabets or special character. If user tries to do so the property will become invalid. To use the digit decorator on particular property.
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
First we need to create a User class and define a property of Age in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\digit\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\digit\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\digit\add\digit-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\digit\edit\digit-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\digit\add\digit-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\digit\edit\digit-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-digit-add></app-digit-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-digit-edit></app-digit-edit>

# DigitConfig 
Below options are not mandatory to use in the `@digit()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpressions](#conditionalexpressions) | Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpressions 
Type :  `Function`  |  `string` 

Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\digit\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\digit\conditionalExpressions\digit-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\digit\conditionalExpressions\digit-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions"&title=digit decorator with conditionalExpression)]
<app-digit-conditionalExpressions></app-digit-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\digit\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\digit\message\digit-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\digit\message\digit-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=digit decorator with custom message)]
<app-digit-message></app-digit-message>

# Complete digit Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-digit-complete></app-digit-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\digit\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\digit\complete\digit-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\digit\complete\digit-complete.component.html)]
***
