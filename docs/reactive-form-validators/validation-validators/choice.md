---
title: choice 
description: choice validation validator will check whether the value entered is matching the properties defined.
author: rxcontributorone

---
# When to use
Suppose you want to create a employee form in which you want employee to enter value of a particular choice which contains fields like department, shobbies and skills.Here the field is taken in the form of array and according to that the choice is applied on the property by applying minlength and maxLength. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter maximum three skills and minimum of one skill.
2.  Apply choice validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be maximum three and minimum one.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how choice validator fulfil the need.

# Basic choice Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\validators\choice\add\choice-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\choice\add\choice-add.component.html)]

<app-choice-add-validator></app-choice-add-validators>

# ChoiceConfig
Below options are not mandatory to use in the `RxwebValidators.choice()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[minLength](#minLength) | minLength  is to define a minLength of field which is in form of array |
|[maxLength](#maxLength) | maxLength is to define a maxLength of field which is in form of array |
|[conditionalExpression](#conditionalexpressions) | choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## minLength 
Type :  `number` 
minLength  is to define a minLength of field which is in form of array

[!codeExample(?title=minLengthExample)]

[!TabGroup(?showHideCondition="minLength")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\validators\choice\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\validators\choice\minLength\choice-min-length.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\validators\choice\minLength\choice-min-length.component.html)]
***
 
[!example(?type=section&clickEventCode="minLength=!minLength"&title=choice validator with minLength)]
<app-choice-minLength-validator></app-choice-minLength-validator>

## maxLength 
Type :  `number` 
maxLength number is for define a maxLength number of range

[!codeExample(?title=maxLengthExample)]

[!TabGroup(?showHideCondition="maxLength")]
# [Model](#tab\maxLengthModel)
[!code-typescript[](\assets\examples\validators\choice\maxLength\employee-info.model.ts)]
# [Component](#tab\maxLengthComponent)
[!code-typescript[](\assets\examples\validators\choice\maxLength\choice-max-number.component.ts)]
# [Html](#tab\maxLengthHtml)
[!code-typescript[](\assets\examples\validators\choice\maxLength\choice-max-number.component.html)]
***

[!example(?type=section&clickEventCode="maxLength=!maxLength"&title=choice validator with maxLength)]
<app-choice-maxLength-validator></app-choice-maxLength-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\choice\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\choice\conditionalExpression\choice-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\choice\conditionalExpression\choice-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=choice validator with conditionalExpression)]
<app-choice-conditionalExpression-validator></app-choice-conditionalExpression-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\choice\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\choice\message\choice-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\choice\message\choice-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=choice validator with custom message)]
<app-choice-message-validator></app-choice-message-validator>

# Complete choice Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-choice-complete></app-choice-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\choice\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\choice\complete\choice-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\choice\complete\choice-complete.component.html)]
***

# Dynamic choice Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-choice-dynamic></app-choice-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\choice\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\choice\dynamic\choice-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\choice\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\choice\dynamic\choice-dynamic.component.html)]
***