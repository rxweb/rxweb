---
title: mac
description: mac validation validator will check whether the value entered is in proper format of mac address.
author: rxcontributorone

---

# When to use
Let's assume that you are creating a  form in which you want user to enter mac address  which contains fields like device,macAddress,systemMacAddress. Here depending upon the requirement these scenarios may arise.
1.	The macAddress on which validation is checked.
2.  Apply mac validation based on matched condition in the form, like if the device  is ‘Laptop’ then the macAddress value should be in proper format.
3.  The Custom Message on systemMacAddress field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how mac validator fulfil the need.

# Basic mac Validation
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\add\mac-add.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\add\mac-add.component.html?type=section)]

[!example(?title=mac validator for add Example)]
<app-mac-add-validator></app-mac-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.mac()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | mac validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

mac validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\conditionalExpression\mac-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\conditionalExpression\mac-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=mac validator with conditionalExpression)]
<app-mac-conditionalExpression-validator></app-mac-conditionalExpression-validator>


## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\message\mac-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\message\mac-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=mac validator with custom message)]
<app-mac-message-validator></app-mac-message-validator>

# Complete mac Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-mac-complete-validator></app-mac-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\complete\mac-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\complete\mac-complete.component.html)]
***

# Dynamic mac Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-mac-dynamic-validator></app-mac-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\dynamic\mac-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\mac\dynamic\mac-dynamic.component.html)]
***