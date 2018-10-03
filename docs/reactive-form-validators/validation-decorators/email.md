---
title: Email Validation
description: Email validation decorator will allow only emails to be entered. If user tries to enter any string except email then the property will become invalid. To use the email decorator on particular property.
author: rxcontributorone
---
# When to use
Let's assume that you are creating a user form and you have fields like Email,RecoveryEmail,OtherEmailAddress and you want user to enter valid EmailAddress Here depending upon the requirement these scenarios may arise.
1. Adding field of email without any conditional expression.
2. 	Apply email validation based on matched condition in the form, like if the Email is ‘abc@gmail.com’ then the RecoveryEmailAddress value should be valid email address.
3. Adding Custom Message on OtherEmailAddress Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how email validator fulfil the need.

# Basic Email Validation
First we need to create User model class define a property of Email in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\email\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\email\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\email\add\email-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\email\edit\email-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\email\add\email-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\email\edit\email-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-email-add></app-email-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-email-edit></app-email-edit>

#EmailConfig

Below options are not mandatory to use in the `@email()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpressions](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## conditionalExpressions 
Type :  `Function`  |  `string` 
Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\email\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\email\conditionalExpressions\email-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\email\conditionalExpressions\email-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-email-conditionalExpressions></app-email-conditionalExpressions>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\email\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\email\message\email-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\email\message\email-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-email-message></app-email-message>

# Complete Email Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-email-complete></app-email-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\email\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\email\complete\email-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\email\complete\email-complete.component.html)]
***
