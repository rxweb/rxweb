---
title : oneOf 
description : oneof validation decorator will check whether the user has entered any one of the given inputs. if user tries to enter value which is more  then the given value  property will be invalid. to use the oneof decorator on particular property.
author : rxcontributorone

---

# When to use
Let's assume that you are creating a employee form in which you want employee to enter any one value of a particular value which contains fields like department,hobbies and skills.Here the field is taken in the form of array and according to that the choice is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter skills based upon matchvalues.
2.  Apply oneof validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how anyof validator fulfil the need.

# Basic oneof Validation
First we need to create a employee Model class and define property of hobbies in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\oneof\add\employee-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\oneof\edit\employee-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\oneof\add\oneof-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\oneof\edit\oneof-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\oneof\add\oneof-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\oneof\edit\oneof-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-oneof-add></app-oneof-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-oneof-edit></app-oneof-edit>

# ArrayConfig
Below options are not mandatory to use in the `@oneof()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[matchValue](#matchValue) | matchValue is the value based on which the value is matched for validation. According to it all the values in the array should be matched |
|[conditionalExpression](#conditionalexpressions) | oneof validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## matchValue 
Type :  `any[]` 

matchValue is the value based on which the value is matched for validation. According to it all the values in the array should be matched

[!TabGroup(?showHideCondition="matchValue")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\oneof\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\oneof\minLength\oneof-match-value.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\oneof\minLength\oneof-match-value.component.html)]
***

[!example(?type=section&clickEventCode="matchValue=!matchValue"&title=anyOf decorator with matchValue)]
<app-oneof-matchValue></app-oneof-matchValue>

## conditionalExpression 
Type :  `Function`  |  `string` 

oneof validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\oneof\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\oneof\conditionalExpression\oneof-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\oneof\conditionalExpression\oneof-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=anyOf decorator with conditionalExpression)]
<app-oneof-conditionalExpression></app-oneof-conditionalExpression>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\oneof\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\oneof\message\oneof-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\oneof\message\oneof-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=anyOf decorator with custom message)]
<app-oneof-message></app-oneof-message>

# Complete oneof Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-oneof-complete></app-oneof-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\oneof\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\oneof\complete\oneof-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\oneof\complete\oneof-complete.component.html)]
***