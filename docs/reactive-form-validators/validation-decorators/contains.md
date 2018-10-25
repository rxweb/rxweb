---
title: contains  
description: Contains validation decorator will check that value is in the input, It will not allow to enter input that not contains the predefined value.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like EmailAddress, RecoveryEmailAddress, OtherEmailAddress and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains the predefined value in EmailAddress.
2.	Apply contains validation based on matched condition in the form, like if the EmailAddress is `abc@gmail.com`, then only the the contains validation must be applied to RecoveryEmailAddress value.
3.	Adding Custom Message on OtherEmailAddress Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how contains validator fulfil the need.

# Basic Contains Validation
First we need to create a User class and define a property of EmailAddress in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\add\contains-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\edit\contains-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\contains\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\add\contains-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\edit\contains-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=contains Decorator for add Example)]
<app-contains-add></app-contains-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=contains Decorator for edit Example)]
<app-contains-edit></app-contains-edit>

# ContainsConfig 
conditionalExpression and message options are not mandatory but value is mandatory to use in the `@contains()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | This is substring value. |
|[conditionalExpression](#conditionalexpressions) | Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value 
Type :  `string` 

This is substring value.

[!codeExample(?title=valueExample)]

[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\valuemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\value\user.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\value\contains-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\value\contains-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow"&title=contains decorator with value)]
<app-contains-value></app-contains-value>

## conditionalExpression 
Type :  `Function`  |  `string` 

Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\conditionalExpression\contains-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\conditionalExpression\contains-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=contains decorator with conditionalExpression)]
<app-contains-conditionalExpression></app-contains-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\message\contains-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\message\contains-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=contains decorator with custom message)]
<app-contains-message></app-contains-message>

# Complete Contains Example

This Complete Contains example which includes all the ContainsConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-contains-complete></app-contains-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\complete\contains-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\complete\contains-complete.component.html)]
***

# Dynamic Contains Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-contains-dynamic></app-contains-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\dynamic\contains-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\contains\dynamic\contains-dynamic.component.html)]
***