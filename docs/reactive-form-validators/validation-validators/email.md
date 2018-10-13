---
title: email 
description: Email validation validator will only allow user to enter input which is in the correct email format.
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

We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\add\email-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\add\email-add.component.html?type=section)]

[!example(?title=email validator for add Example)]
<app-email-add-validator></app-email-add-validator>

#EmailConfig

Below options are not mandatory to use in the `RxwebValidators.email()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## conditionalExpression 
Type :  `Function`  |  `string` 
Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\conditionalExpression\email-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\conditionalExpression\email-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=email validator with conditionalExpression)]
<app-email-conditionalExpression-validator></app-email-conditionalExpression-validator>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\message\email-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\message\email-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=email validator with custom message)]
<app-email-message-validator></app-email-message-validator>

# Complete Email Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-email-complete-validator></app-email-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\complete\email-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\complete\email-complete.component.html)]
***

# Dynamic Email Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-email-dynamic-validator></app-email-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\dynamic\email-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\email\dynamic\email-dynamic.component.html)]
***