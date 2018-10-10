---
title: time 
description: time validation decorator will allow only time format to be entered. If user tries to enter any string except json then the property will become invalid. To use the json decorator on particular property.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a AttendanceDetail form, which contains field of EntryPlace,EntryTime,TotalTimeOut and Exit Time you want the user to enter valid time. Here depending upon the requirement these scenarios may arise.	
1.	Allow time in EntryTime without seconds.
2.	Allowing seconds in TotalTimeOut.
3.	Apply time validation based on matched condition in the form, like if the EntryPlace is ‘Lunch room’ then the EntryTime value should be in proper format of time .
4.	Adding Custom Message on exitTime Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how time validator fulfil the need.

# Basic time Validation
First we need to create a AttendanceDetail class and define a property of EntryTime in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\time\add\attandance-detail.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\time\edit\attandance-detail.model.ts?condition="tab_1=='basicedit'"&type=section)]
 
Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\time\add\time-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\time\edit\time-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\time\add\time-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\time\edit\time-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=time Decorator for add Example)]
<app-time-add></app-time-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=time Decorator for edit Example)]
<app-time-edit></app-time-edit>

# TimeConfig 
Below options are not mandatory to use in the `@time()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[allowSeconds](#allowseconds) | If you are allowed seconds in time format then you need to put this as true. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 
time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\time\conditionalExpression\attandance-detail.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\time\conditionalExpression\time-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\time\conditionalExpression\time-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=time decorator with conditionalExpression)]
<app-time-conditionalExpression></app-time-conditionalExpression>

## allowSeconds 
Type :  `boolean` 
If you are allowed seconds in time format then you need to put this as true.

[!TabGroup(?showHideCondition="allowSeconds")]
# [Model](#tab\allowSecondsmodel)
[!code-typescript[](\assets\examples\time\allowSeconds\attandance-detail.model.ts)]
# [Component](#tab\allowSecondsComponent)
[!code-typescript[](\assets\examples\time\allowSeconds\time-allow-seconds.component.ts)]
# [Html](#tab\allowSecondsHtml)
[!code-typescript[](\assets\examples\time\allowSeconds\time-allow-seconds.component.html)]
***

[!example(?type=section&clickEventCode="allowSeconds=!allowSeconds"&title=time decorator with allowSeconds)]
<app-time-allowSeconds></app-time-allowSeconds>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\time\message\attandance-detail.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\time\message\time-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\time\message\time-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=time decorator with custom message)]
<app-time-message></app-time-message>

# Complete time Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-time-complete></app-time-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\time\complete\attandance-detail.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\time\complete\time-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\time\complete\time-complete.component.html)]
***
