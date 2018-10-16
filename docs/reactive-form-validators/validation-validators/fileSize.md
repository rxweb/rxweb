---
title: fileSize
description: fileSize validation validator allows user to enter the input which is in the proper file size format.
author: rxcontributortwo

---
# When to use
Let's assume you are creating a storageCapacity form, which contains fields like device, videoStorageSize, documentStorageSize and photographStorageSize and you want the user to enter input which is a proper size format. Here depending upon the requirement, these scenarios may arise..

1. Allow videoStorageSize which have proper file size format and adding Custom Message on videoStorageSize.
2. Apply documentStorageSize validation based on matched condition in the form, like if the device is 'SmartPhone', then the documentStorageSize must be a file size format (Used as a function).
3. Apply photographStorageSize validation based on matched condition in the form, like if the device is 'SmartPhone', then the photographStorageSize must be a file size format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how fileSize validator fulfil the need.

# Basic fileSize Validation

We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\add\file-size-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\add\file-size-add.component.html?type=section)]

[!example(?title=fileSize validator for add Example)]
<app-fileSize-add-validator></app-fileSize-add-validator>


# SizeConfig
Below options are not mandatory to use in the `RxwebValidators.fileSize()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[maxSize](#maxSize) | Maximum file size allowed to be entered. |
|[conditionalExpression](#conditionalExpression) | fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two p\arameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## maxSize
Type :  `number` 

maxSize parameter is the maximum file size allowed to be entered by the user.

[!TabGroup(?showHideCondition="maxSize")]
# [Component](#tab\maxSizeComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\maxSize\file-size-max-size.component.ts)]
# [Html](#tab\maxSizeHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\maxSize\file-size-max-size.component.html)]
***

[!example(?type=section&clickEventCode="maxSize=!maxSize"&title=fileSize validator with maxSize)]
<app-fileSize-maxSize-validator></app-fileSize-maxSize-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\conditionalExpression\file-size-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\conditionalExpression\file-size-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=fileSize validator with conditionalExpression)]
<app-fileSize-conditionalExpression-validator></app-fileSize-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\message\file-size-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\message\file-size-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=fileSize validator with custom message)]
<app-fileSize-message-validator></app-fileSize-message-validator>

# Complete fileSize Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-fileSize-complete-validator></app-fileSize-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\complete\file-size-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\complete\file-size-complete.component.html)]
***

# Dynamic fileSize Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-fileSize-dynamic-validator></app-fileSize-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\dynamic\file-size-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\fileSize\dynamic\file-size-dynamic.component.html)]
***
