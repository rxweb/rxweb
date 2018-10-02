---
title: Contains Validation 
description: Contains validation decorator will check that value is in the input. It will not allow to enter input that not contains value. If user tries to do so the property will become invalid. To use the contains decorator on particular property.
author: rxcontributortwo

---
# When to use?
Let’s assume that you are creating a User form, which contains fields like EmailAddress, RecoveryEmailAddress, OtherEmailAddress and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains the predefined value in EmailAddress.
2.	Apply contains validation based on matched condition in the form, like if the EmailAddress is `abc@gmail.com`, then only the the contains validation must be applied to RecoveryEmailAddress value.
3.	Adding Custom Message on OtherEmailAddress Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how contains validator fulfil the need.

# Basic Contains Validation
First we need to create a User class and define a property of EmailAddress in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\contains\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\contains\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\contains\add\contains-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\contains\edit\contains-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\contains\add\contains-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\contains\edit\contains-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-contains-add></app-contains-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-contains-edit></app-contains-edit>

# ContainsConfig 
conditionalExpression and message options are not mandatory but value is mandatory to use in the `@contains()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[value](#value) | This is substring value. |
|[conditionalExpression](#conditionalexpression) | Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## value 
Type :  `string` 

This is substring value.

[!TabGroup(?showHideCondition="valueShow")]
# [Model](#tab\valuemodel)
[!code-typescript[](\assets\examples\contains\value\user.model.ts)]
# [Component](#tab\valueComponent)
[!code-typescript[](\assets\examples\contains\value\contains-value.component.ts)]
# [Html](#tab\valueHtml)
[!code-typescript[](\assets\examples\contains\value\contains-value.component.html)]
***

[!example(?type=section&clickEventCode="valueShow=!valueShow")]
<app-contains-value></app-contains-value>

## conditionalExpression 
Type :  `Function`  |  `string` 

Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\contains\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\contains\conditionalExpressions\contains-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\contains\conditionalExpressions\contains-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-contains-conditionalExpressions></app-contains-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\contains\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\contains\message\contains-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\contains\message\contains-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-contains-message></app-contains-message>

# Complete Contains Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-contains-complete></app-contains-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\contains\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\contains\complete\contains-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\contains\complete\contains-complete.component.html)]
***





