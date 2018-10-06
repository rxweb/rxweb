---
title : allof validation
description : allof validation decorator will check whether the user has entered all of the given field. if user does not enter all the values of the given field, property will be invalid. to use the allof decorator on particular property.
author : rxcontributorone

---

# When to use
Let's assume that you are creating a employee form in  which contains fields like department,hobbies and skills.you want employee to enter all value of a particular field Here the field is taken in the form of array and according to that the choice is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
1.	The skills field in which you want the user to enter skills based upon matchvalues.
2.  Apply allof validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.
3.  The Custom Message on Hobbies field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how allof validator fulfil the need.

# Basic allof Validation
First we need to create a employee Model class and define property of hobbies in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\allof\add\employee-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\allof\edit\employee-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\allof\add\allof-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\allof\edit\allof-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\allof\add\allof-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\allof\edit\allof-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-allof-add></app-allof-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-allof-edit></app-allof-edit>


# ArrayConfig
Below options are not mandatory to use in the `@allof()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[matchValue](#matchValue) | matchValue is the value based on which the value is matched for validation. According to it all the values in the array should be matched |
|[conditionalExpressions](#conditionalexpressions) | allof validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## matchValue 
Type :  `any[]` 

matchValue is the value based on which the value is matched for validation. According to it all the values in the array should be matched

[!TabGroup(?showHideCondition="matchValue")]
# [Model](#tab\minLengthModel)
[!code-typescript[](\assets\examples\allof\minLength\employee-info.model.ts)]
# [Component](#tab\minLengthComponent)
[!code-typescript[](\assets\examples\allof\minLength\allof-match-value.component.ts)]
# [Html](#tab\minLengthHtml)
[!code-typescript[](\assets\examples\allof\minLength\allof-match-value.component.html)]
***

[!example(?type=section&clickEventCode="matchValue=!matchValue")]
<app-allof-matchValue></app-allof-matchValue>

## conditionalExpressions 
Type :  `Function`  |  `string` 

allof validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function.
 
 [!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\allof\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\allof\conditionalExpressions\allof-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\allof\conditionalExpressions\allof-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-allof-conditionalExpressions></app-allof-conditionalExpressions>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\allof\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\allof\message\allof-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\allof\message\allof-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-allof-message></app-allof-message>

# Complete allof Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-allof-complete></app-allof-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\allof\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\allof\complete\allof-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\allof\complete\allof-complete.component.html)]
***