---
title: longitude
description: longitude validation validator allows user to enter the input which is in the proper longitude format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLongitude, secondCountryLongitude and thirdCountryLongitude and you want the user to enter input which is a proper longitude format. Here depending upon the requirement, these scenarios may arise..
1. Allow firstCountryLongitude which have proper longitude format and adding Custom Message on firstCountryLongitude.
2. Apply longitude validation on secondCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLongitude must be a longitude format (Used as a function).
3. Apply longitude validation on thirdCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLongitude must be a longitude format (Used as a string datatype).
4. Apply dynamic validation, If the validation is changed based on some criteria in the application.

Let's see how longitude validator fulfil the need.

# Basic longitude Validation

we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\add\longitude-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\add\longitude-add.component.html?type=section)]

[!example(?title=longitude validator for add Example)]
<app-longitude-add-validator></app-longitude-add-validator>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@longitude()` validators. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\conditionalExpression\longitude-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\conditionalExpression\longitude-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=longitude validators with conditionalExpression)]
<app-longitude-conditionalExpression-validator></app-longitude-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\message\longitude-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\message\longitude-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=longitude validators with custom message)]
<app-longitude-message-validator></app-longitude-message-validator>

# Complete longitude Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-longitude-complete-validator></app-longitude-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\complete\longitude-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\complete\longitude-complete.component.html)]
***

# Dynamic longitude Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-longitude-dynamic-validator></app-longitude-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\dynamic\longitude-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\longitude\dynamic\longitude-dynamic.component.html)]
***