---
title: maxLength 
description: MaxLength validation decorator will allow user to enter the input upto the maximum length value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like FirstName, LastName, Username and you want the user to enter any string which should not exceed maximum length. Here depending upon the requirement these scenarios may arise.
1.	Allow string less than 16 characters in FirstName.
2.	Apply maxLength validation based on matched condition in the form, like if the FirstName is `john`, then only the maxLength validation will be applied to LastName field.
3.	Adding Custom Message on Username Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how maxLength validator fulfil the need.

# Basic MaxLength Validation
First we need to create a User class and define a property of FirstName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\add\location.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\edit\location.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\add\max-length-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\edit\max-length-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `location-data.json` for getting data from the server

[!code-typescript[](\assets\examples\maxLength\edit\location-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\add\max-length-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\edit\max-length-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=maxLength Decorator for add Example)]
<app-maxLength-add></app-maxLength-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=maxLength Decorator for edit Example)]
<app-maxLength-edit></app-maxLength-edit>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@maxLength()` decorator but value is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

MaxLength validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\conditionalExpression\max-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\conditionalExpression\max-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=maxLength decorator with conditionalExpression)]
<app-maxLength-conditionalExpression></app-maxLength-conditionalExpression>
 
 ## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\message\max-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\message\max-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=maxLength decorator with custom message)]
<app-maxLength-message></app-maxLength-message>

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
[!codeExample(?title=valueExample)]
 
[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\value\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\value\max-length-value.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\value\max-length-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=maxLength decorator with value)]
<app-maxLength-value></app-maxLength-value>


# Complete maxLength Example

This Complete maxLength example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2, 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-maxLength-complete></app-maxLength-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\complete\max-length-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\complete\max-length-complete.component.html)]
***

# Dynamic maxLength Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-maxLength-dynamic></app-maxLength-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\dynamic\max-length-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\maxLength\dynamic\max-length-dynamic.component.html)]
***