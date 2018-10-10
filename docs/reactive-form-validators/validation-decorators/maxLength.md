---
title: maxLength 
description: MaxLength validation decorator will allow only maximum length be entered upto value parameter. If user tries to enter any string that length exceed then the value then the property will become invalid. To use the maxLength decorator on particular property.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like FirstName, LastName, Username and you want the user to enter any string which should not exceed maximum length. Here depending upon the requirement these scenarios may arise.
1.	Allow string less than 16 characters in FirstName.
2.	Apply maxLength validation based on matched condition in the form, like if the FirstName is `john`, then only the maxLength validation will be applied to LastName field.
3.	Adding Custom Message on Username Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how maxLength validator fulfil the need.

# Basic MaxLength Validation
First we need to create a User class and define a property of FirstName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\maxLength\add\location.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\maxLength\edit\location.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\maxLength\add\max-length-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\maxLength\edit\max-length-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\maxLength\add\max-length-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\maxLength\edit\max-length-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-maxLength-add></app-maxLength-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-maxLength-edit></app-maxLength-edit>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxLength()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\maxLength\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\maxLength\conditionalExpression\max-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\maxLength\conditionalExpression\max-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=maxLength decorator with conditionalExpression)]
<app-maxLength-conditionalExpression></app-maxLength-conditionalExpression>
 
 ## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\maxLength\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\maxLength\message\max-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\maxLength\message\max-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=maxLength decorator with custom message)]
<app-maxLength-message></app-maxLength-message>

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\maxLength\value\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\maxLength\value\max-length-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\maxLength\value\max-length-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=maxLength decorator with value)]
<app-maxLength-value></app-maxLength-value>


# Complete maxlength Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-maxLength-complete></app-maxLength-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\maxLength\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\maxLength\complete\max-length-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\maxLength\complete\max-length-complete.component.html)]
***
