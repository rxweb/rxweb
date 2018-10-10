---
title: factor 
description: factor validation decorator will check whether the value entered is factor of the particular value,if user tries to enter value which is not factor of the value  the property will be invalid.
author: rxcontributorone

---

# When to use
Let's assume that you are creating a user form in which you want user to enter factor of a particular value which contains fields like firstNumber,secondNumber,ThirdNumber and fourthNumber. Here depending upon the requirement these scenarios may arise.
1.	The Name of secondNumber field on which comparison is done.
2.  Apply factor validation based on matched condition in the form, like if the firstNumber  is ‘25’ then the Fourthyear value should be factor.
3.  The Custom Message on ThirdNumber field.
4.   Apply factor validation based of dividend, dividend is the value for which factors are calculated.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how factor validator fulfil the need.

# Basic Factor Validation
First we need to create a User Model class and define property of firstNumber and secondNumber in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\factor\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\factor\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\factor\add\factor-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\factor\edit\factor-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\factor\add\factor-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\factor\edit\factor-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-factor-add></app-factor-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-factor-edit></app-factor-edit>

# FactorConfig
Below options are not mandatory to use in the `@factor()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[dividend](#dividend) | Dividend is the value for which factors are calculated. |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[conditionalExpression](#conditionalexpressions) | factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## dividend 
Type :  `string` 
 Dividend is the value for which factors are calculated.

[!TabGroup(?showHideCondition="dividend")]
# [Model](#tab\dividendmodel)
[!code-typescript[](\assets\examples\factor\dividend\user.model.ts)]
# [Component](#tab\dividendComponent)
[!code-typescript[](\assets\examples\factor\dividend\factor-dividend.component.ts)]
# [Html](#tab\dividendHtml)
[!code-typescript[](\assets\examples\factor\dividend\factor-dividend.component.html)]
***

[!example(?type=section&clickEventCode="dividend=!dividend"&title=factor decorator with dividend)]
<app-factor-dividend></app-factor-dividend>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!TabGroup(?showHideCondition="fieldName")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\factor\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\factor\fieldName\factor-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\factor\fieldName\factor-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=factor decorator with fieldName)]
<app-factor-fieldName></app-factor-fieldName>

## conditionalExpression 
Type :  `Function`  |  `string` 

factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\factor\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\factor\conditionalExpression\factor-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\factor\conditionalExpression\factor-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=factor decorator with conditionalExpression)]
<app-factor-conditionalExpression></app-factor-conditionalExpression>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\factor\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\factor\message\factor-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\factor\message\factor-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=factor decorator with custom message)]
<app-factor-message></app-factor-message>

# Complete Factor Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-factor-complete></app-factor-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\factor\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\factor\complete\factor-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\factor\complete\factor-complete.component.html)]
***
