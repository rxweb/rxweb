---
title: alphaNumeric
description: Alpha Numeric validation validator will allow only alphabets and numbers to be entered, It will not allow any special character. 
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a Location form, which contains fields like AreaName, FlatAddress, PostalAddress, CityCode and you want the user to enter only alphabets and numbers. Here depending upon the requirement these scenarios may arise.
1.	Allow only alphabets and numbers in AreaName without space.
2.	Allowing WhiteSpace in FlatAddress.
3.	Apply alphaNumeric validation based on matched condition in the form, like if the AreaName is `Boston` then the CityCode value should be in alphabets and numbers.
4.	Adding Custom Message on PostalAddress Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how alphaNumeric validator fulfil the need.

# Basic AlphaNumeric Validation

We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\validators\alphaNumeric\add\alpha-numeric-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\alphaNumeric\add\alpha-numeric-add.component.html)]

<app-alphaNumeric-add-validator></app-alphaNumeric-add-validator>

# AlphaConfig 
Below options are not mandatory to use in the `RxwebValidators.alphaNumeric()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowwhitespace) | This will allow whitespace in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalexpressions) | AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.

[!codeExample(?title=allowWhiteSpaceExample)]

[!TabGroup(?showHideCondition="allowWhiteSpaceShow")]
# [Model](#tab\allowWhiteSpacemodel)
[!code-typescript[](\assets\examples\validators\alphaNumeric\allowWhiteSpace\location.model.ts)]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\validators\alphaNumeric\allowWhiteSpace\alpha-numeric-allow-white-space.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\validators\alphaNumeric\allowWhiteSpace\alpha-numeric-allow-white-space.component.html)]
***

[!example(?type=section&clickEventCode="allowWhiteSpaceShow=!allowWhiteSpaceShow"&title=alphaNumeric validator with allowWhiteSpace)]
<app-alphaNumeric-allowWhiteSpace-validator></app-alphaNumeric-allowWhiteSpace-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\alphaNumeric\conditionalExpression\location.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\alphaNumeric\conditionalExpression\alpha-numeric-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\alphaNumeric\conditionalExpression\alpha-numeric-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=alphaNumeric validator with conditionalExpression)]
<app-alphaNumeric-conditionalExpression-validator></app-alphaNumeric-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\alphaNumeric\message\location.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\alphaNumeric\message\alpha-numeric-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\alphaNumeric\message\alpha-numeric-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=alphaNumeric validator with custom message)]
<app-alphaNumeric-message-validator></app-alphaNumeric-message-validator>

# Complete AlphaNumeric Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-alphaNumeric-complete-validator></app-alphaNumeric-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\alphaNumeric\complete\location.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\alphaNumeric\complete\alpha-numeric-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\alphaNumeric\complete\alpha-numeric-complete.component.html)]
***

# Dynamic AlphaNumeric Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-alphaNumeric-dynamic-validator></app-alphaNumeric-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\alphaNumeric\dynamic\location.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\alphaNumeric\dynamic\alpha-numeric-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\alphaNumeric\dynamic\alpha-numeric-dynamic.component.html)]
***
