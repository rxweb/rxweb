---
title: MinLength Validation 
description: MinLength validation decorator will allow only minimum length be entered upto value parameter. If user tries to enter any string that length exceed then the value then the property will become invalid. To use the minLength decorator on particular property.
author: rxcontributorone

---
# When to use
 Let’s assume that you are creating a Contact form, which contains fields like countryName, MobileNo,LandlineNo and you want the user to enter valid  Number which should be of the minimum specified length. Here depending upon the requirement these scenarios may arise.
1. 	Apply MinLength validation based on matched condition in the form, like if the CountryName is ‘India’ then the countryCode value  should be of the minimum specified length. .
2. Adding Custom Message on LandlineNo Field.
3. Adding value which you want to restrict number in the property. The Minimum length is '10'. 
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how minLength validator fulfil the need.

# Basic MinLength Validation
First we need to create Contact model class define a property of CountryName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\minLength\add\contact.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\minLength\edit\contact.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

Next, we need to write html code.
[!code-typescript[](\assets\examples\minLength\add\min-length-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\minLength\edit\min-length-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-minLength-add></app-minLength-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-minLength-edit></app-minLength-edit>

# NumberConfig 

message and conditional expression options are not mandatory to use in the `@minLength()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 
Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\minLength\conditionalExpressions\contact.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\minLength\conditionalExpressions\min-length-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\minLength\conditionalExpressions\min-length-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-minLength-conditionalExpressions></app-minLength-conditionalExpressions>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\minLength\message\contact.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\minLength\message\min-length-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\minLength\message\min-length-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-minLength-message></app-minLength-message>

## value 
Type :  `number` 
enter value which you want to restrict string length in the property.

[!TabGroup(?showHideCondition="value")]
# [Model](#tab\valueModel)
[!code-typescript[](\assets\examples\minLength\value\contact.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\minLength\value\min-length-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\minLength\value\min-length-value.component.html)]
***

[!example(?type=section&clickEventCode="value=!value")]
<app-minLength-value></app-minLength-value>

# Complete MinLength Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-minLength-complete></app-minLength-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\minLength\complete\contact.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\minLength\complete\max-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\minLength\complete\min-length-complete.component.html)]
***
