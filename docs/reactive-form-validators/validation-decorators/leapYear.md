---
title: leapYear
description: LeapYear validation decorator will check whether the value entered is a leap year or not, if user tries to enter value which is not a leap year the property will be invalid.
author: rxcontributorone

---
# When to use
Let's assume you are creating a user value form , which contains fields like name,birth year,joining year and you want the user to enter value which is in leap year format Here depending upon the requirement these scenarios may arise..
1. Allow only leap year in the field of birthyear.
2. Apply leapyear validation based on matched condition in the form, like if the name  is ‘John’ then the birthYear value should be leapyear.
3. Adding Custom Message on joining Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how LeapYear validator fulfil the need.

# Basic LeapYear Validation
First we need to create ea User class and define a property of leapyear in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\leapYear\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\leapYear\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\leapYear\add\leapYear-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\leapYear\edit\leapYear-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\leapYear\add\leapYear-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\leapYear\edit\leapYear-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=leapYear Decorator for add Example)]
<app-leapYear-add></app-leapYear-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=leapYear Decorator for edit Example)]
<app-leapYear-edit></app-leapYear-edit>

# BaseConfig
Below options are not mandatory to use in the `@leapYear()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpressions) | leapyear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

LeapYear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\leapYear\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\leapYear\conditionalExpression\leapYear-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\leapYear\conditionalExpression\leapYear-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=leapYear decorator with conditionalExpression)]
<app-leapYear-conditionalExpression></app-leapYear-conditionalExpression>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\leapYear\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\leapYear\message\leapYear-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\leapYear\message\leapYear-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=leapYear decorator with custom message)]
<app-leapYear-message></app-leapYear-message>

# Complete LeapYear Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-leapYear-complete></app-leapYear-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\leapYear\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\leapYear\complete\leapYear-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\leapYear\complete\leapYear-complete.component.html)]
***
