---
title: url 
description: Url validation decorator will check that value entered in the property is in the correct url format or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a website-info form, which contains fields like AdminWebsiteUrl, CustomerWebsiteUrl, MaintenanceWebsiteUrl and you want the user to enter valid url. Here depending upon the requirement these scenarios may arise.
1. Adding AdminWebsiteUrl without any conditional expression.
2. Apply url validation based on matched condition in the form, like if the adminWebsiteUrl is ‘https://google.co.in’ then the customerWebsiteUrl value should be in proper format of url.
3. Adding Custom Message on MaintenanceWebsiteUrl Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how url validator fulfil the need.

# Basic url Validation
First we need to create a User class and define a property of AdminWebsiteUrl in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\add\web-site-info-model.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\edit\web-site-info-model.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\add\url-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\edit\url-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\add\url-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\edit\url-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=url Decorator for add Example)]
<app-url-add></app-url-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=url Decorator for edit Example)]
<app-url-edit></app-url-edit>

# DefaultConfig
 Below options are not mandatory to use in the `@url()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 
Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\conditionalExpression\web-site-info-model.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\conditionalExpression\url-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\conditionalExpression\url-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=url decorator with conditionalExpression)]
<app-url-conditionalExpression></app-url-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\message\web-site-info-model.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\message\url-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\message\url-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=url decorator with custom message)]
<app-url-message></app-url-message>

# Complete url Example

This Complete url example which includes all the UrlConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

[!TabGroup]
# [Example](#tab\completeexample)
<app-url-complete></app-url-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\complete\web-site-info-model.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\complete\url-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\complete\url-complete.component.html)]
***

# Dynamic url Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-url-dynamic></app-url-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\dynamic\web-site-info-model.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\dynamic\url-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\url\dynamic\url-dynamic.component.html)]
***