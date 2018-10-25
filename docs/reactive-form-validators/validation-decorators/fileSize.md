---
title: fileSize
description: fileSize validation decorator allows user to enter the input which is in the proper file size format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a storageCapacity form, which contains fields like device, videoStorageSize, documentStorageSize and photographStorageSize and you want the user to enter input which is a proper size format. Here depending upon the requirement, these scenarios may arise..

1. Allow videoStorageSize which have proper size format and adding Custom Message on videoStorageSize.
2. Apply validation on documentStorageSize field based on matched condition in the form, like if the device is 'SmartPhone', then the documentStorageSize must be a size format (Used as a function).
3. Apply validation on photographStorageSize field based on matched condition in the form, like if the device is 'SmartPhone', then the photographStorageSize must be a size format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how fileSize decorator fulfil the need.
 
# Basic fileSize Validation
First we need to create a storageCapacity model and define a property of videoStorageSize in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\add\storage-capacity.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\edit\storage-capacity.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\add\file-size-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\edit\file-size-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\add\file-size-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\edit\file-size-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=fileSize Decorator for add Example)]
<app-fileSize-add></app-fileSize-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=fileSize Decorator for edit Example)]
<app-fileSize-edit></app-fileSize-edit>

# SizeConfig
message and conditionalExpression are not mandatory to use in the `@fileSize()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[maxSize](#maxSize) | Maximum file size allowed to be entered. |
|[conditionalExpression](#conditionalExpression) | fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two p\arameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## maxSize
Type :  `number` 

maxSize parameter is the maximum file size allowed to be entered by the user.

[!TabGroup(?showHideCondition="maxSize")]
# [Model](#tab\maxSizeModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\maxSize\storage-capacity.model.ts)]
# [Component](#tab\maxSizeComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\maxSize\file-size-max-size.component.ts)]
# [Html](#tab\maxSizeHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\maxSize\file-size-max-size.component.html)]
***

[!example(?type=section&clickEventCode="maxSize=!maxSize"&title=fileSize decorator with maxSize)]
<app-fileSize-maxSize></app-fileSize-maxSize>

## conditionalExpression 
Type :  `Function`  |  `string` 

fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\conditionalExpression\storage-capacity.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\conditionalExpression\file-size-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\conditionalExpression\file-size-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=fileSize decorator with conditionalExpression)]
<app-fileSize-conditionalExpression></app-fileSize-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\message\storage-capacity.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\message\file-size-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\message\file-size-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=fileSize decorator with custom message)]
<app-fileSize-message></app-fileSize-message>

# Complete fileSize Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-fileSize-complete></app-fileSize-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\complete\storage-capacity.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\complete\file-size-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\complete\file-size-complete.component.html)]
***

# Dynamic fileSize Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-fileSize-dynamic></app-fileSize-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\dynamic\storage-capacity.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\dynamic\file-size-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\fileSize\dynamic\file-size-dynamic.component.html)]
***
