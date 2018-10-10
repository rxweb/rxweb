---
title: choice 
description: choice validation decorator will check whether the value entered is in proper choice of property defined . if user tries to enter value which is not proper choice then the property will be invalid. to use the choice decorator on particular property.
author: rxcontributorone

---

# When to use
Let's assume that you are creating a employee form in which you want employee to enter value of a particular choice which contains fields like department,hobbies and skills.Here the field is taken in the form of array and according to that the choice is applied on the property by applying minlength and maxLength. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter maximum three skills and minimum of one skill.
2.  Apply choice validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be maximum three and minimum one.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how choice validator fulfil the need.

# Basic choice Validation
First we need to create a employee Model class and define property of hobbies in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\choice\add\employee-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\choice\edit\employee-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\choice\add\choice-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\choice\edit\choice-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\choice\add\choice-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\choice\edit\choice-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-choice-add></app-choice-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-choice-edit></app-choice-edit>

# ChoiceConfig
Below options are not mandatory to use in the `@choice()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[minLength](#minLength) | minLength  is to define a minLength of field which is in form of array |
|[maxLength](#maxLength) | maxLength is to define a maxLength of field which is in form of array |
|[conditionalExpression](#conditionalexpressions) | choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## minLength 
Type :  `number` 
minLength  is to define a minLength of field which is in form of array

[!TabGroup(?showHideCondition="minLength")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\choice\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\choice\minLength\choice-min-length.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\choice\minLength\choice-min-length.component.html)]
***

[!example(?type=section&clickEventCode="minLength=!minLength"&title=choice decorator with minLength)]
<app-choice-minLength></app-choice-minLength>

## maxLength 
Type :  `number` 
maxLength number is for define a maxLength number of range

[!TabGroup(?showHideCondition="maxLength")]
# [Model](#tab\maxLengthModel)
[!code-typescript[](\assets\examples\choice\maxLength\employee-info.model.ts)]
# [Component](#tab\maxLengthComponent)
[!code-typescript[](\assets\examples\choice\maxLength\choice-max-number.component.ts)]
# [Html](#tab\maxLengthHtml)
[!code-typescript[](\assets\examples\choice\maxLength\choice-max-number.component.html)]
***

[!example(?type=section&clickEventCode="maxLength=!maxLength"&title=choice decorator with maxLength)]
<app-choice-maxLength></app-choice-maxLength>

## conditionalExpression 
Type :  `Function`  |  `string` 

choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\choice\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\choice\conditionalExpression\choice-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\choice\conditionalExpression\choice-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=choice decorator with conditionalExpression)]
<app-choice-conditionalExpression></app-choice-conditionalExpression>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\choice\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\choice\message\choice-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\choice\message\choice-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=choice decorator with custom message)]
<app-choice-message></app-choice-message>

# Complete choice Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-choice-complete></app-choice-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\choice\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\choice\complete\choice-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\choice\complete\choice-complete.component.html)]
***

