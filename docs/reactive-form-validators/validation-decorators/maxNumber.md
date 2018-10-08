---
title: maxNumber Validation
description: MaxNumber validation decorator will allow only maximum number be entered upto value parameter. If user tries to enter any number that greater then the value then the property will become invalid. To use the maxNumber decorator on particular property.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a Subject-detail form, which contains fields like subjectCode, maximumMarks, PassingMarks and you want the user to enter valid  Number which does not exceed the Maximum number. Here depending upon the requirement these scenarios may arise.
1.	Adding field of PassingMarks without any conditional expression.
2.	Apply MaxNumber validation based on matched condition in the form, like if the subjectCode is ‘8CS5A’ then the maximumMarks value should be enter valid  Number which does not exceed the Maximum number .
3.	Adding Custom Message on PassingMarks Field.
4.	Adding value which you want to restrict number in the property. The maximum number is '100s'. 
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how maxNumber validator fulfil the need.

# Basic MaxNumber Validation
First we need to create subject-detail model class define a property of PassingMarks in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\maxNumber\add\subject-details.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\maxNumber\edit\subject-details.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\maxNumber\add\max-number-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\maxNumber\edit\max-number-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\maxNumber\add\max-number-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\maxNumber\edit\max-number-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-maxNumber-add></app-maxNumber-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-maxNumber-edit></app-maxNumber-edit>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxNumber()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\maxNumber\conditionalExpression\subject-details.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\maxNumber\conditionalExpression\max-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\maxNumber\conditionalExpression\max-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=maxNumber decorator with conditionalExpression)]
<app-maxNumber-conditionalExpression></app-maxNumber-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\maxNumber\message\subject-details.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\maxNumber\message\max-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\maxNumber\message\max-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=maxNumber decorator with custom message)]
<app-maxNumber-message></app-maxNumber-message>

## value 
Type :  `number` 
enter value which you want to restrict number in the property.

[!TabGroup(?showHideCondition="value")]
# [Model](#tab\valueModel)
[!code-typescript[](\assets\examples\maxNumber\value\subject-details.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\maxNumber\value\max-number-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\maxNumber\value\max-number-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=maxNumber decorator with value)]
<app-maxNumber-value></app-maxNumber-value>

# Complete MaxNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-maxNumber-complete></app-maxNumber-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\maxNumber\complete\subject-details.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\maxNumber\complete\max-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\maxNumber\complete\max-number-complete.component.html)]
***
