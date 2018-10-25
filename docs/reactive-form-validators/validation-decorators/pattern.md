---
title: pattern 
description: Pattern validation decorator will allow user to enter the input which match the predefined pattern value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains only Alphabet in Username.
2.	Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).
3.	Adding Custom Message on Zipcode Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how pattern validator fulfil the need.

# Basic Pattern Validation
First we need to create a User class and define a property of UserName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this, we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\add\pattern-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\edit\pattern-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\pattern\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\add\pattern-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\edit\pattern-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=pattern Decorator for add Example)]
<app-pattern-add></app-pattern-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=pattern Decorator for edit Example)]
<app-pattern-edit></app-pattern-edit>
 
# PatternConfig 
message,conditionalExpression options are not mandatory to use in the `@pattern()` decorator but pattern is mandatory. If required, then user can use these options accordingly:

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[conditionalExpression](#conditionalexpressions) | Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[pattern](#pattern) | enter specific regex pattern |

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\message\pattern-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\message\pattern-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=pattern decorator with custom message)]
<app-pattern-message></app-pattern-message>

## conditionalExpression 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

 [!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\conditionalExpression\pattern-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\conditionalExpression\pattern-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=pattern decorator with conditionalExpression)]
<app-pattern-conditionalExpression></app-pattern-conditionalExpression>
 
## pattern 
Type :  `string` 

enter specific regex pattern

[!codeExample(?title=patternExample)]

 [!TabGroup(?showHideCondition="pattern")]
# [Model](#tab\patternModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\pattern\user.model.ts)]
# [Component](#tab\patternComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\pattern\pattern-pattern.component.ts)]
# [Html](#tab\patternHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\pattern\pattern-pattern.component.html)]
***

[!example(?type=section&clickEventCode="pattern=!pattern"&title=pattern decorator with pattern)]
<app-pattern-pattern></app-pattern-pattern>

# Complete pattern Example

This Complete pattern example which includes all the PatternConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

[!TabGroup]
# [Example](#tab\completeExample)
<app-pattern-complete></app-pattern-complete>
# [Model](#tab\completeModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\complete\user.model.ts)]
# [Component](#tab\completeComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\complete\pattern-complete.component.ts)]
# [Html](#tab\completeHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\complete\pattern-complete.component.html)]
***

# Dynamic pattern Example
[!TabGroup]
# [Example](#tab\dynamicExample)
<app-pattern-dynamic></app-pattern-dynamic>
# [Model](#tab\dynamicModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\dynamic\user.model.ts)]
# [Component](#tab\dynamicComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\dynamic\pattern-dynamic.component.ts)]
# [Html](#tab\dynamicHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\pattern\dynamic\pattern-dynamic.component.html)]
***