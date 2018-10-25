---
title: range 
description: Range validation decorator will check that the entered value is in the specified range.
author: rxcontributorone

---
# When to use
Suppose you want to create a employeeInfo form, which contains field of employeeAge, employeeExperience, salary and you want the user to enter value in a specified range. Here depending upon the requirement these scenarios may arise.
1. Adding value which you want to restrict number in the property. The minimum number is 18 and maximum number is 60. 
2. Apply range validation based on matched condition in the form, like if the age is greater than ‘25’ then the employeeExperience value should be between 2 to 20.
3. Adding Custom Message on Salary Field.
4. Apply dynamic validation, the validation will be changed based on some criteria in the application.

Let’s see how range validator fulfil the need.

# Basic range Validation
First we need to create employeeInfo model class define a property of employeeAge in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\add\employee-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\edit\employee-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\add\range-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\edit\range-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `employee-info-data.json` for getting data from the server

[!code-typescript[](\assets\examples\range\edit\employee-info-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\add\range-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\edit\range-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=range Decorator for edit Example)]
<app-range-add></app-range-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=range Decorator for edit Example)]
<app-range-edit></app-range-edit>

# RangeConfig 
conditionalExpression and message options are not mandatory to use in the `@range()` decorator but the minimum number and maximum number is mandatory parameter. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Range validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[minimumNumber](#minimumnumber) | Minimum number is for define a minimum number of range |
|[maximumNumber](#maximumnumber) | Maximum number is for define a maximum number of range |

## conditionalExpression 
Type :  `Function`  |  `string`
Range validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\conditionalExpression\employee-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\conditionalExpression\range-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\conditionalExpression\range-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=range decorator with conditionalExpression)]
<app-range-conditionalExpression></app-range-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\message\employee-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\message\range-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\message\range-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=range decorator with custom message)]
<app-range-message></app-range-message>

## minimumNumber 
Type :  `string` 
Minimum number is for define a minimum number of range

[!codeExample(?title=minimumNumberExample)]

[!TabGroup(?showHideCondition="minimumNumber")]
# [Model](#tab\minimumNumberModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\minimumNumber\employee-info.model.ts)]
# [Component](#tab\minimumNumberComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\minimumNumber\range-minimum-number.component.ts)]
# [Html](#tab\minimumNumberHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\minimumNumber\range-minimum-number.component.html)]
***

[!example(?type=section&clickEventCode="minimumNumber=!minimumNumber"&title=range decorator with minimumNumber)]
<app-range-minimumNumber></app-range-minimumNumber>

## maximumNumber 
Type :  `string` 
Maximum number is for define a maximum number of range

[!codeExample(?title=maximumNumberExample)]

[!TabGroup(?showHideCondition="maximumNumber")]
# [Model](#tab\maximumNumberModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\maximumNumber\employee-info.model.ts)]
# [Component](#tab\maximumNumberComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\maximumNumber\range-maximum-number.component.ts)]
# [Html](#tab\maximumNumberHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\maximumNumber\range-maximum-number.component.html)]
***

[!example(?type=section&clickEventCode="maximumNumber=!maximumNumber"&title=range decorator with maximumNumber)]
<app-range-maximumNumber></app-range-maximumNumber>

# Complete range Example

This Complete range example which includes all the RangeConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-range-complete></app-range-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\complete\employee-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\complete\range-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\complete\range-complete.component.html)]
***

# Dynamic range Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-range-dynamic></app-range-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\dynamic\employee-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\dynamic\range-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\range\dynamic\range-dynamic.component.html)]
***