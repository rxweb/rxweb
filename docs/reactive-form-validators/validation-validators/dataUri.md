---
title: dataUri
description: dataUri validation validator allows user to enter the input which is in the proper data URI format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like scheme, AudioDataUri, VideoDataUri and ImageDataUri and you want the user to enter input which is a proper data URI format. depending on the requirements, these scenarios may arise..
1. Allow the user to enter valid dataUri in the field of AudioDataUri with custom error message.
2. Apply validation on VideoDataUri  field based on matched condition in the form, like if the scheme is 'DataUri', then the VideoDataUri must be a data URI format (Used as a function).
3. Apply validation on ImageDataUri based on matched condition in the form, like if the scheme is 'DataUri', then the ImageDataUri must be a data URI format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how dataUri validator fulfil the need.

# Basic dataUri Validation

We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\add\data-uri-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\add\data-uri-add.component.html?type=section)]

[!example(?title=dataUri validator for add Example)]
<app-dataUri-add-validator></app-dataUri-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.dataUri()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | dataUri validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

dataUri validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\conditionalExpression\data-uri-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\conditionalExpression\data-uri-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=dataUri decorator with conditionalExpression)]
<app-dataUri-conditionalExpression-validator></app-dataUri-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\message\data-uri-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\message\data-uri-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=dataUri decorator with custom message)]
<app-dataUri-message-validator></app-dataUri-message-validator>

# Complete dataUri Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-dataUri-complete-validator></app-dataUri-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\complete\data-uri-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\complete\data-uri-complete.component.html)]
***

# Dynamic dataUri Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-dataUri-dynamic-validator></app-dataUri-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\dynamic\data-uri-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\dataUri\dynamic\data-uri-dynamic.component.html)]
***
