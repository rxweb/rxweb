---
title: endsWith
description: endsWith validation validators allows user to enter the input which ends with perticular value
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like name, profession and taskId and you want the user to enter input which ends with a particular value. Here depending upon the requirement, these scenarios may arise..
1. Apply validation on name field in which you want the user to enter value which ends with ‘m’.
2. Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the profession must ends with 'R' (Used as a string datatype).
3. Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the taskId must ends with '1' (Used as a function).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how endsWith validator fulfil the need.

# Basic endsWith Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\add\ends-with-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\add\ends-with-add.component.html?type=section)]

[!example(?title=endsWith validator for add Example)]
<app-endsWith-add-validator></app-endsWith-add-validator>

# DefaultConfig
message and conditionalExpression are not mandatory to use in the `RxwebValidators.endsWith()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | The `value` from which the input should ends with. |
|[conditionalExpression](#conditionalExpression) | endsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value
Type: `string`

The `value` from which the input should ends with.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="value")]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\value\ends-with-value.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\value\ends-with-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=endsWith validators with value)]
<app-endsWith-value-validator></app-endsWith-value-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

endsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\conditionalExpression\ends-with-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\conditionalExpression\ends-with-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=endsWith validators with conditionalExpression)]
<app-endsWith-conditionalExpression-validator></app-endsWith-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\message\ends-with-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\message\ends-with-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=endsWith validators with custom message)]
<app-endsWith-message-validator></app-endsWith-message-validator>

# Complete endsWith Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-endsWith-complete-validator></app-endsWith-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\complete\ends-with-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\complete\ends-with-complete.component.html)]
***

# Dynamic endsWith Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-endsWith-dynamic-validator></app-endsWith-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\dynamic\ends-with-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\endsWith\dynamic\ends-with-dynamic.component.html)]
***
