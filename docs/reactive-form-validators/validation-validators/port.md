---
title: port
description: port validation validator allows user to enter the input which is in the proper port format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a websiteInfo form, which contains fields like browser, educationalWebsitePort, entertainmentWebsitePort and shoppingWebsitePort and you want the user to enter input which is a proper port number. Here depending upon the requirement, these scenarios may arise..
1. Allow educationalWebsitePort which have proper port format and adding Custom Message on educationalWebsitePort.
2. Apply port validation on entertainmentWebsitePort field based on matched condition in the form, like if the browser is 'Chrome', then the      entertainmentWebsitePort must be a port number (Used as a function).
3. Apply port validation on shoppingWebsitePort field based on matched condition in the form, like if the browser is 'Chrome', then the shoppingWebsitePort must be a port number (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how port validator fulfil the need.

# Basic port Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\add\port-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\add\port-add.component.html?type=section)]

[!example(?title=port validator for add Example)]
<app-port-add-validator></app-port-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.port()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | port validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

port validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\conditionalExpression\port-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\conditionalExpression\port-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=port validator with conditionalExpression)]
<app-port-conditionalExpression-validator></app-port-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\message\port-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\message\port-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=port validator with custom message)]
<app-port-message-validator></app-port-message-validator>

# Complete Port Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-port-complete-validator></app-port-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\complete\port-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\complete\port-complete.component.html)]
***

# Dynamic Port Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-port-dynamic-validator></app-port-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\dynamic\port-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\port\dynamic\port-dynamic.component.html)]
***
