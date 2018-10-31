---
title: email 
description: Email validation decorator will only allow user to enter input which is in the correct email format.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form and you have fields like Email, RecoveryEmail, OtherEmailAddress and you want user to enter valid EmailAddress Here depending upon the requirement these scenarios may arise.
1. Adding email validation on the field named email without any conditional expression.
2. Apply email validation based on matched condition in the form, like if the Email is ‘abc@gmail.com’ then the RecoveryEmailAddress value should be valid email address.
3. Adding Custom Message on OtherEmailAddress Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how email validator fulfil the need.

# Basic Email Validation
First we need to create User model class define a property of Email in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.


[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\add\email-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\edit\email-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\email\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]


Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\add\email-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\edit\email-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=email Decorator for edit Example)]
<app-email-add></app-email-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=email Decorator for edit Example)]
<app-email-edit></app-email-edit>

#EmailConfig

Below options are not mandatory to use in the `@email()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## conditionalExpression 
Type :  `Function`  |  `string` 
Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\conditionalExpression\email-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\conditionalExpression\email-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=email decorator with conditionalExpression)]
<app-email-conditionalExpression></app-email-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\message\email-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\message\email-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=email decorator with custom message)]
<app-email-message></app-email-message>

# Complete Email Example

This Complete Email example which includes all the EmailConfig properties will fulfil the requirement of scenarios 1, 2 and
 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-email-complete></app-email-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\complete\email-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\complete\email-complete.component.html)]
***

# Dynamic Email Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-email-dynamic></app-email-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\dynamic\email-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\email\dynamic\email-dynamic.component.html)]
***