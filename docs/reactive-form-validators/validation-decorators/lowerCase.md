---
title: lowerCase 
description: lowerCase validation decorator will allow only lowercase to be entered. If user tries to enter any case except lower then the property will become invalid. To use the lowercase decorator on particular property.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like Username, FirstName, LastName and you want the user to enter any string only in lowercase. Here depending upon the requirement these scenarios may arise.
1.	Allow only lowercase alphabets in Username.
2.	Apply lowerCase validation based on matched condition in the form, like if the Username is `jonathan.feldman`, then only the lowerCase validation will be applied to FirstName field.
3.	Adding Custom Message on LastName Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how lowerCase validator fulfil the need.

# Basic LowerCase Validation
First we need to create a User class and define a property of Username in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\lowerCase\add\user-info.model.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\lowerCase\edit\user-info.model.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\lowerCase\add\lower-case-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\lowerCase\edit\lower-case-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\lowerCase\add\lower-case-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\lowerCase\edit\lower-case-add.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-lowerCase-add></app-lowerCase-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-lowerCase-edit></app-lowerCase-edit>

# MessageConfig 
Below options are not mandatory to use in the `@lowerCase()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\lowerCase\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\lowerCase\conditionalExpression\lower-case-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\lowerCase\conditionalExpression\lower-case-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=lowerCase decorator with conditionalExpression)]
<app-lowerCase-conditionalExpression></app-lowerCase-conditionalExpression>
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\lowerCase\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\lowerCase\message\lower-case-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\lowerCase\message\lower-case-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=lowerCase decorator with custom message)]
<app-lowerCase-message></app-lowerCase-message>

# Complete lowercase Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-lowerCase-complete></app-lowerCase-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\lowerCase\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\lowerCase\complete\lower-case-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\lowerCase\complete\lower-case-complete.component.html)]
***
