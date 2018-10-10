---
title: minNumber 
description: MinNumber validation decorator will allow only minimum number be entered upto value parameter, If user tries to enter any number that less then the value then the property will become invalid. 
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a ResultInfo form, which contains fields like Maths, Science, Statistics and you want the user to enter number which should not be less than a minimum number. Here depending upon the requirement these scenarios may arise.
1.	Allow number greater than 35 in Maths field.
2.	Apply minNumber validation based on matched condition in the form, like if the input of Maths is 50, then only the minNumber validation will be applied to Statistics field.
3.	Adding Custom Message on Science Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minNumber validator fulfil the need.

# Basic MinNumber Validation
First we need to create a ResultInfo class and define a property of Maths in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\minNumber\add\result-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\minNumber\edit\result-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\minNumber\add\min-number-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\minNumber\edit\min-number-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\minNumber\add\min-number-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\minNumber\edit\min-number-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=minNumber Decorator for add Example)]
<app-minNumber-add></app-minNumber-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=minNumber Decorator for edit Example)]
<app-minNumber-edit></app-minNumber-edit>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@minNumber()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\minNumber\conditionalExpression\result-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\minNumber\conditionalExpression\min-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\minNumber\conditionalExpression\min-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=minNumber decorator with conditionalExpression)]
<app-minNumber-conditionalExpression></app-minNumber-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\minNumber\message\result-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\minNumber\message\min-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\minNumber\message\min-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=minNumber decorator with custom message)]
<app-minNumber-message></app-minNumber-message>

## value 
Type :  `number` 

enter value which you want to restrict number in the property
[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\minNumber\value\result-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\minNumber\value\min-number-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\minNumber\value\min-number-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=minNumber decorator with value)]
<app-minNumber-value></app-minNumber-value>

# Complete minNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-minNumber-complete></app-minNumber-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\minNumber\complete\result-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\minNumber\complete\min-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\minNumber\complete\min-number-complete.component.html)]
***

# Dynamic minNumber Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-minNumber-dynamic></app-minNumber-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\minNumber\dynamic\result-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\minNumber\dynamic\min-number-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\minNumber\dynamic\min-number-dynamic.component.html)]
***