---
title: endsWith
description: endsWith validation decorator allows user to enter the input which ends with perticular value
author: rxcontributortwo

---
# When to use
Let's assume you are creating a user form, which contains fields like userId, name, profession and taskId and you want the user to enter input which ends with a perticular value. Here depending upon the requirement, these scenarios may arise..

1. Allow userId which ends with '#'
2. Allow name which ends with 'A' and adding Custom Message on name.
3. Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the profession must ends with 'R' (Used as a string datatype).
4. Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the taskId must ends with '1' (Used as a function).
5. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how endsWith decorator fulfil the need.

# Basic endsWith Validation
First we need to create a User model and define a property of userId in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\add\ends-with-add.component.ts?type=section)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\edit\ends-with-edit.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\add\ends-with-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\edit\ends-with-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=endsWith Decorator for add Example)]
<app-endsWith-add></app-endsWith-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=endsWith Decorator for edit Example)]
<app-endsWith-edit></app-endsWith-edit>

# DefaultConfig
message and conditionalExpression are not mandatory to use in the `@endsWith()` decorator. If needed then use the below options.

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
# [Model](#tab\valuemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\value\user.model.ts)]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\value\ends-with-value.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\value\ends-with-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=endsWith decorator with value)]
<app-endsWith-value></app-endsWith-value>

## conditionalExpression 
Type :  `Function`  |  `string` 

endsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\conditionalExpression\ends-with-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\conditionalExpression\ends-with-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=endsWith decorator with conditionalExpression)]
<app-endsWith-conditionalExpression></app-endsWith-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\message\ends-with-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\message\ends-with-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=endsWith decorator with custom message)]
<app-endsWith-message></app-endsWith-message>

# Complete endsWith Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-endsWith-complete></app-endsWith-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\complete\ends-with-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\complete\ends-with-complete.component.html)]
***

# Dynamic endsWith Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-endsWith-dynamic></app-endsWith-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\dynamic\ends-with-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\endsWith\dynamic\ends-with-dynamic.component.html)]
***