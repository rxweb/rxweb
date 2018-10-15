---
title: maxNumber
description: MaxNumber validation validator will allow user to enter the input upto the maximum number value parameter.
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
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\add\max-number-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\add\max-number-add.component.html?type=section)]

[!example(?title=maxNumber validator for add Example)]
<app-maxNumber-add-validator></app-maxNumber-add-validator>


# NumberConfig 
message and conditional expression options are not mandatory to use in the `RxwebValidators.maxNumber()` validator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict number in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\conditionalExpression\max-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\conditionalExpression\max-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=maxNumber validator with conditionalExpression)]
<app-maxNumber-conditionalExpression-validator></app-maxNumber-conditionalExpression-validator>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\message\max-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\message\max-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=maxNumber validator with custom message)]
<app-maxNumber-message-validator></app-maxNumber-message-validator>

## value 
Type :  `number` 
enter value which you want to restrict number in the property.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="value")]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\value\max-number-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\value\max-number-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=maxNumber validator with value)]
<app-maxNumber-value-validator></app-maxNumber-value-validator>

# Complete MaxNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-maxNumber-complete-validator></app-maxNumber-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\complete\max-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\complete\max-number-complete.component.html)]
***

# Dynamic MaxNumber Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-maxNumber-dynamic-validator></app-maxNumber-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\dynamic\max-number-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\maxNumber\dynamic\max-number-dynamic.component.html)]
***