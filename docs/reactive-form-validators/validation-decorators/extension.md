---
title: extension
description: extension validation decorator allows user to enter the input which is in the proper extension format.
author: rxcontributortwo

---
# When to use
Let's assume you are creating a storageCapacity form, which contains fields like device, videoFileExtension, documentFileExtension and photographFileExtension and you want the user to enter input which is a proper extension format. Here depending upon the requirement, these scenarios may arise..

1. Allow videoFileExtension which have proper extension format and adding Custom Message on videoFileExtension.
2. Apply documentFileExtension validation based on matched condition in the form, like if the device is 'SmartPhone', then the documentFileExtension must be a extension format (Used as a function).
3. Apply photographFileExtension validation based on matched condition in the form, like if the device is 'SmartPhone', then the photographFileExtension must be a extension format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how extension decorator fulfil the need.
 
# Basic extension Validation
First we need to create a storageCapacity model and define a property of videoFileExtension in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\add\extension-add.component.ts?type=section)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\edit\extension-edit.component.ts?type=section)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\add\extension-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\edit\extension-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=extension Decorator for add Example)]
<app-extension-add></app-extension-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=extension Decorator for edit Example)]
<app-extension-edit></app-extension-edit>

# SizeConfig
message and conditionalExpression are not mandatory to use in the `@extension()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[extensions](#extensions) | Multiple extensions which are allowed to be entered by the user. It is in form of array. |
|[conditionalExpression](#conditionalExpression) | extension validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two p\arameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## extensions
Type :  `string[]` 

extensions parameter is the array of multiple extensions which are allowed to be entered by the user.

[!TabGroup(?showHideCondition="extensions")]
# [Model](#tab\extensionsModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\extensions\user.model.ts)]
# [Component](#tab\extensionsComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\extension\extensions\extension-max-extension.component.ts)]
# [Html](#tab\extensionsHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\extension\extensions\extension-max-extension.component.html)]
***

[!example(?type=section&clickEventCode="extensions=!extensions"&title=extension validator with maximum extension limitation)]
<app-extension-extensions></app-extension-extensions>

## conditionalExpression 
Type :  `Function`  |  `string` 

extension validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\conditionalExpression\extension-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\conditionalExpression\extension-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=extension decorator with conditionalExpression)]
<app-extension-conditionalExpression></app-extension-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\message\extension-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\message\extension-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=extension decorator with custom message)]
<app-extension-message></app-extension-message>

# Complete extension Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-extension-complete></app-extension-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\complete\extension-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\complete\extension-complete.component.html)]
***

# Dynamic extension Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-extension-dynamic></app-extension-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\dynamic\extension-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\extension\dynamic\extension-dynamic.component.html)]
***