---
title: factor 
description: factor validation decorator will allow user to enter factor of a number which is called dividend.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form in which you want user to enter factor of a particular value which contains fields like firstNumber, secondNumber, ThirdNumber and fourthNumber. Here depending upon the requirement these scenarios may arise.
1.  Apply factor validation on firstNumber field by setting  dividend property as 50 so the validation will allow only factors of 50
2.  Apply factor validation based on matched condition in the form, like if the firstNumber  is ‘25’ then the Fourthyear value should be factor.
3.  The Custom Message on ThirdNumber field.
4.  Apply factor validation based of dividend, dividend is the value for which factors are calculated.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how factor validator fulfil the need.

# Basic Factor Validation
First we need to create a User Model class and define property of firstNumber and secondNumber in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\add\factor-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\edit\factor-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\factor\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\add\factor-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\edit\factor-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=factor Decorator for add Example)]
<app-factor-add></app-factor-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=factor Decorator for edit Example)]
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

[!codeExample(?title=dividendExample)]

[!TabGroup(?showHideCondition="dividend")]
# [Model](#tab\dividendmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dividend\user.model.ts)]
# [Component](#tab\dividendComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dividend\factor-dividend.component.ts)]
# [Html](#tab\dividendHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dividend\factor-dividend.component.html)]
***

[!example(?type=section&clickEventCode="dividend=!dividend"&title=factor decorator with dividend)]
<app-factor-dividend></app-factor-dividend>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\fieldName\factor-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\fieldName\factor-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=factor decorator with fieldName)]
<app-factor-fieldName></app-factor-fieldName>

## conditionalExpression 
Type :  `Function`  |  `string` 

factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\conditionalExpression\factor-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\conditionalExpression\factor-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=factor decorator with conditionalExpression)]
<app-factor-conditionalExpression></app-factor-conditionalExpression>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\message\factor-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\message\factor-message.component.html)]
***
  
[!example(?type=section&clickEventCode="message=!message"&title=factor decorator with custom message)]
<app-factor-message></app-factor-message>

# Complete Factor Example

This Complete Factor example which includes all the FactorConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4

[!TabGroup]
# [Example](#tab\completeexample)
<app-factor-complete></app-factor-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\complete\factor-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\complete\factor-complete.component.html)]
***

# Dynamic Factor Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-factor-dynamic></app-factor-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dynamic\factor-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\factor\dynamic\factor-dynamic.component.html)]
***
