---
title: primeNumber
description: primeNumber validation decorator allows user to enter only prime number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a numberInfo form, which contains fields like numberType, firstNumber, secondNumber and thirdNumber and you want the user to enter input which is a prime number. Here depending upon the requirement, these scenarios may arise..
1. Allow firstNumber which have proper primeNumber format and adding Custom Message on firstNumber.
2. Apply validation on secondNumber field based on matched condition in the form, like if the numberType is 'Prime', then the secondNumber must be a primeNumber (Used as a function).
3. Apply validation on thirdNumber field based on matched condition in the form, like if the numberType is 'Prime', then the thirdNumber must be a primeNumber (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how primeNumber decorator fulfil the need.

# Basic primeNumber Validation
First we need to create a numberInfo model and define a property of firstNumber in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\add\number-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\edit\number-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\add\prime-number-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\edit\prime-number-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `number-info-data.json` for getting data from the server

[!code-typescript[](\assets\examples\primeNumber\edit\number-info-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\add\prime-number-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\edit\prime-number-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=primeNumber Decorator for add Example)]
<app-primeNumber-add></app-primeNumber-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=primeNumber Decorator for edit Example)]
<app-primeNumber-edit></app-primeNumber-edit>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@primeNumber()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\conditionalExpression\prime-number.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\conditionalExpression\prime-number-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\conditionalExpression\prime-number-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=primeNumber decorator with conditionalExpression)]
<app-primeNumber-conditionalExpression></app-primeNumber-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\message\prime-number.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\message\prime-number-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\message\prime-number-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=primeNumber decorator with custom message)]
<app-primeNumber-message></app-primeNumber-message>

# Complete primeNumber Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-primeNumber-complete></app-primeNumber-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\complete\number-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\complete\prime-number-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\complete\prime-number-complete.component.html)]
***

# Dynamic primeNumber Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-primeNumber-dynamic></app-primeNumber-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\dynamic\number-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\dynamic\prime-number-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\primeNumber\dynamic\prime-number-dynamic.component.html)]
***