---
title: different 
description: Different validation decorator will check  two values if they are different it will be valid,it is opposite of compare validator. if user tries to enter value which is same as field which is compared  the property will be invalid.
author: rxcontributorone

---

# When to use
Let's assume that you are creating a user form in which you want to compare firstname and username which are entered by the user which contains fields like firstname and username,password Here depending upon the requirement these scenarios may arise.
1.	The Name of username field on which comparison is done.
2.  The Custom Message on password field.  
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how different validator fulfil the need.

# Basic Different Validation
First we need to create a User Model class and define property of Password and Confirm Password in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\different\add\account-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\different\edit\account-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\different\add\different-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\different\edit\different-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\different\add\different-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\different\edit\different-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-different-add></app-different-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-different-edit></app-different-edit>

# DifferentConfig
Below options are not mandatory to use in the `@different()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\different\conditionalExpression\account-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\different\conditionalExpression\different-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\different\conditionalExpression\different-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=different decorator with conditionalExpression)]
<app-different-conditionalExpression></app-different-conditionalExpression>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!TabGroup(?showHideCondition="fieldName")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\different\fieldName\account-info.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\different\fieldName\different-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\different\fieldName\different-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=different decorator with fieldName)]
<app-different-fieldName></app-different-fieldName>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\different\message\account-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\different\message\different-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\different\message\different-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=different decorator with custom message)]
<app-different-message></app-different-message>

# Complete Different Example

This Complete Different example which includes all the DifferentConfig properties will fulfil the requirement of scenarios 1 and 2 

[!TabGroup]
# [Example](#tab\completeexample)
<app-different-complete></app-different-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\different\complete\account-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\different\complete\different-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\different\complete\different-complete.component.html)]
***
