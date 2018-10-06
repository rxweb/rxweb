---
title : leapYear validation
description : LeapYear validation decorator will check whether the value entered is a leap year or not. if user tries to enter value which is not a leap year the property will be invalid. to use the leapyear decorator on particular property.
author : rxcontributorone

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
[!code-typescript[](\assets\examples\leap-year\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\leap-year\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\leap-year\add\leap-year-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\leap-year\edit\leap-year-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\leap-year\add\leap-year-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\leap-year\edit\leap-year-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-leap-year-add></app-leap-year-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-leap-year-edit></app-leap-year-edit>

# BaseConfig
Below options are not mandatory to use in the `@leapYear()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpressions](#conditionalexpressions) | leapyear validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpressions 
Type :  `Function`  |  `string` 

LeapYear validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\leap-year\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\leap-year\conditionalExpressions\leap-year-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\leap-year\conditionalExpressions\leap-year-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions"&title=leapYear decorator with conditionalExpression)]
<app-leap-year-conditionalExpressions></app-leap-year-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\leap-year\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\leap-year\message\leap-year-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\leap-year\message\leap-year-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=leapYear decorator with custom message)]
<app-leap-year-message></app-leap-year-message>

# Complete LeapYear Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-leap-year-complete></app-leap-year-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\leap-year\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\leap-year\complete\leap-year-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\leap-year\complete\leap-year-complete.component.html)]
***
