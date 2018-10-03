---
title: Pattern Validation
description: Pattern validation decorator will allow only match input as pattern to be entered. If user tries to enter any string which is not matched pattern then the property will become invalid. To use the pattern decorator on particular property.
author: rxcontributortwo

---
# When to use
Let’s assume that you are creating a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
1.	Allow input which contains only Alphabet in Username.
2.	Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).
3.	Adding Custom Message on Zipcode Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how pattern validator fulfil the need.

# Basic Contains Validation
First we need to create a User class and define a property of UserName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\pattern\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\pattern\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\pattern\add\pattern-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\pattern\edit\pattern-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\pattern\add\pattern-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\pattern\edit\pattern-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-pattern-add></app-pattern-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-pattern-edit></app-pattern-edit>
 
# PatternConfig 
message,conditionalExpression options are not mandatory to use in the `@pattern()` decorator but pattern is mandatory. If required, then user can use these options accordingly:

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[conditionalExpressions](#conditionalexpression) | Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[pattern](#pattern) | enter specific regex pattern |

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\pattern\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\pattern\message\pattern-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\pattern\message\pattern-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-pattern-message></app-pattern-message>

## conditionalExpressions 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

 [!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\pattern\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\pattern\conditionalExpressions\pattern-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\pattern\conditionalExpressions\pattern-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-pattern-conditionalExpressions></app-pattern-conditionalExpressions>
 
## pattern 
Type :  `string` 

enter specific regex pattern

 [!TabGroup(?showHideCondition="patternShow")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\pattern\pattern\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\pattern\pattern\pattern-pattern.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\pattern\pattern\pattern-pattern.component.html)]
***

[!example(?type=section&clickEventCode="patternShow=!patternShow")]
<app-pattern-pattern></app-pattern-pattern>

# Complete pattern Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-pattern-complete></app-pattern-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\pattern\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\pattern\complete\pattern-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\pattern\complete\pattern-complete.component.html)]
***
