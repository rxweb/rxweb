---
title: numeric
description: numeric validation decorator will check whether the value entered is a valid number or not, if user tries to enter value which is not a proper numeric value it will be invalid.
author: rxcontributorone

---

# When to use
Let’s assume that you are creating a user form, which contains fields like DataType, integerNumber,integerNumber and you want the user to enter only numeric value depending on validation of the property. Here depending upon the requirement these scenarios may arise.
1.  Allow only positive numbers in integerNumber.
2.  Allow only Negative numbers in integerNumber.
3.  Allow decimal value in integerNumber  
4.	Apply numeric validation based on matched condition in the form, like if the dataType  is ‘Integer’ then the number value should be Integer number.
5.	Adding Custom Message on Negative value Field.
6.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how Numeric validator fulfil the need.

# Basic numeric Validation
Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\numeric\add\numeric-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\numeric\add\numeric-add.component.html)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=numeric Decorator for add Example)]
<app-numeric-add></app-numeric-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=numeric Decorator for edit Example)]
<app-numeric-edit></app-numeric-edit>

# NumericConfig
Below options are not mandatory to use in the `@numeric()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[acceptValue](#acceptValue) | To apply validation based on checking positive or negative value or both. |
|[allowDecimal](#allowDecimal) | This will allow decimal in particular control property.The default value is `false`. |
|[conditionalExpression](#conditionalexpressions) | Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## acceptValue 
Type :  `NumericValueType` 

To apply validation based on checking positive or negative value or both.

[!TabGroup(?showHideCondition="acceptValue")]
# [Model](#tab\acceptValuemodel)
[!code-typescript[](\assets\examples\numeric\acceptValue\user.model.ts)]
# [Component](#tab\acceptValueComponent)
[!code-typescript[](\assets\examples\numeric\acceptValue\numeric-acceptValue.component.ts)]
# [Html](#tab\acceptValueHtml)
[!code-typescript[](\assets\examples\numeric\acceptValue\numeric-acceptValue.component.html)]
***

[!example(?type=section&clickEventCode="acceptValue=!acceptValue"&title=numeric decorator depending upon acceptValue")]
<app-numeric-acceptValue></app-numeric-acceptValue>

## allowDecimal 
Type :  `boolean` 

This will allow decimal in particular control property.The default value is `false`.

[!TabGroup(?showHideCondition="allowDecimal")]
# [Model](#tab\allowDecimalmodel)
[!code-typescript[](\assets\examples\numeric\allowDecimal\user.model.ts)]
# [Component](#tab\allowDecimalComponent)
[!code-typescript[](\assets\examples\numeric\allowDecimal\numeric-allow-decimal.component.ts)]
# [Html](#tab\allowDecimalHtml)
[!code-typescript[](\assets\examples\numeric\allowDecimal\numeric-allow-decimal.component.html)]
***

[!example(?type=section&clickEventCode="allowDecimal=!allowDecimal"&title=alpha decorator with allowDecimal)]
<app-numeric-allowDecimal></app-numeric-allowDecimal>

## conditionalExpression 
Type :  `Function`  |  `string` 

Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\numeric\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\numeric\conditionalExpression\numeric-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\numeric\conditionalExpression\numeric-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=numeric decorator with conditionalExpression)]
<app-numeric-conditionalExpression></app-numeric-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\numeric\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\numeric\message\numeric-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\numeric\message\numeric-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=numeric decorator with custom message)]
<app-numeric-message></app-numeric-message>

# Complete numeric Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-numeric-complete></app-numeric-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\numeric\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\numeric\complete\numeric-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\numeric\complete\numeric-complete.component.html)]
***

# Dynamic numeric Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-numeric-dynamic></app-numeric-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\numeric\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\numeric\dynamic\numeric-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\numeric\dynamic\numeric-dynamic.component.html)]
***