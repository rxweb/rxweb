---
title: minLength 
description: MinLength validation decorator will allow user to enter the input length matching the minimum length value parameter.
author: rxcontributorone

---
# When to use
Suppose you want to create a Contact form, which contains fields like countryName, MobileNo, LandlineNo and you want the user to enter valid  Number which should be of the minimum specified length. Here depending upon the requirement these scenarios may arise.
1. Apply MinLength validation based on matched condition in the form, like if the CountryName is ‘India’ then the countryCode value  should be of the minimum specified length. .
2. Adding Custom Message on LandlineNo Field.
3. Adding value which you want to restrict number in the property. The Minimum length is '10'. 
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minLength validator fulfil the need.

# Basic MinLength Validation
First we need to create Contact model class define a property of CountryName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\add\contact.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\edit\contact.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\add\min-length-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\edit\min-length-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `contact-data.json` for getting data from the server

[!code-typescript[](\assets\examples\minLength\edit\contact-data.json?condition="tab_1=='basicedit'"&type=section)]


Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\add\min-length-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\edit\min-length-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=minLength Decorator for add Example)]
<app-minLength-add></app-minLength-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=minLength Decorator for edit Example)]
<app-minLength-edit></app-minLength-edit>

# NumberConfig 

message and conditional expression options are not mandatory to use in the `@minLength()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\conditionalExpression\contact.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\conditionalExpression\min-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\conditionalExpression\min-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=minLength decorator with conditionalExpression)]
<app-minLength-conditionalExpression></app-minLength-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\message\contact.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\message\min-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\message\min-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=minLength decorator with custom message)]
<app-minLength-message></app-minLength-message>

## value 
Type :  `number` 
enter value which you want to restrict string length in the property.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="value")]
# [Model](#tab\valueModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\value\contact.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\value\min-length-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\value\min-length-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value"&title=minLength decorator with value)]
<app-minLength-value></app-minLength-value>

# Complete MinLength Example

This Complete MinLength example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-minLength-complete></app-minLength-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\complete\contact.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\complete\max-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\complete\min-length-complete.component.html)]
***

# Dynamic MinLength Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-minLength-dynamic></app-minLength-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\dynamic\contact.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\dynamic\max-number-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\minLength\dynamic\min-length-dynamic.component.html)]
***