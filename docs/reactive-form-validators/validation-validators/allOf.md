---
title: allOf 
description: allOf validation validator will check whether the user has entered all of the values of given field, if user does not enter all the values of the given field
author: rxcontributorone

---
# When to use
Let's assume that you are creating a employee form in which contains fields like department,hobbies and skills.You want employee to enter all value of a particular field, here the field is taken in the form of array and according to that the choice is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter skills based upon matchvalues.
2.  Apply allOf validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how allOf validator fulfil the need.

# Basic allOf Validation

We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\validators\allOf\add\allOf-add.component.ts)]

***

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\allOf\add\allOf-add.component.html)]

<app-allOf-add-validator></app-allOf-add-validator>

# ArrayConfig
Below options are not mandatory to use in the `RxwebValidators.allof()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[matchValue](#matchValue) | matchValue is the array based on which the value is matched for validation. According to it all the values in the array should be matched |
|[conditionalExpression](#conditionalexpressions) | allOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## matchValue 
Type :  `any[]` 

matchValue is the array based on which the value is matched for validation. According to it all the values in the array should be matched

[!codeExample(?title=matchValueExample)]

[!TabGroup(?showHideCondition="matchValue")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\validators\allOf\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\validators\allOf\minLength\allOf-match-value.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\validators\allOf\minLength\allOf-match-value.component.html)]
***

[!example(?type=section&clickEventCode="matchValue=!matchValue"&title=allOf validator with matchValue)]
<app-allOf-matchValue-validator></app-allOf-matchValue-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

allOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\validators\\allOf\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\\allOf\conditionalExpression\allOf-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\\allOf\conditionalExpression\allOf-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=allOf validator with conditionalExpression)]
<app-allOf-conditionalExpression-validator></app-allOf-conditionalExpression-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\validators\\allOf\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\\allOf\message\allOf-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\\allOf\message\allOf-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=allOf validator with custom message)]
<app-allOf-message-validator></app-allOf-message-validator>

# Complete allOf Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-allOf-complete-validator></app-allOf-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\validators\allOf\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\allOf\complete\allOf-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\allOf\complete\allOf-complete.component.html)]
***

# Dynamic allOf Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-allOf-dynamic-validator></app-allOf-dynamic-validator>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\validators\allOf\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\allOf\dynamic\allOf-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\allOf\dynamic\allOf-dynamic.component.html)]
***