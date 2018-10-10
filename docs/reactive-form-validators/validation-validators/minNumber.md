---
title: minNumber 
description: MinNumber validation validator will allow only minimum number be entered upto value parameter, If user tries to enter any number that less then the value then the property will become invalid. 
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
We need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.


[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\add\min-number-add.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\add\min-number-add.component.html)]

<app-minNumber-add-validator></app-minNumber-add-validator>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `RxwebValidators.minNumber()` validator but value is mandatory. If needed then use the below options.

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
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\conditionalExpression\result-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\conditionalExpression\min-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\conditionalExpression\min-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=minNumber validator with conditionalExpression)]
<app-minNumber-conditionalExpression-validator></app-minNumber-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\message\result-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\message\min-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\message\min-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=minNumber validator with custom message)]
<app-minNumber-message-validator></app-minNumber-message-validator>

## value 
Type :  `number` 

enter value which you want to restrict number in the property
[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\value\result-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\value\min-number-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\value\min-number-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=minNumber validator with value)]
<app-minNumber-value-validator></app-minNumber-value-validator>

# Complete minNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-minNumber-complete-validator></app-minNumber-complete-validator>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\complete\result-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\complete\min-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\reactive-form-validators\validators\minNumber\complete\min-number-complete.component.html)]
***
