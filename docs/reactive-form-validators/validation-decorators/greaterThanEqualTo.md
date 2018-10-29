---
title: greaterThanEqualTo 
description: Greater than equal to validation decorator will check that input property is greater than or equal to the related field input.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form and you have fields like Age, VoterAge, OtherAge and you want user to enter Age such that VoterAge,OtherAge should be greater than or equal to Age Here depending upon the requirement these scenarios may arise.
1. Specify Age as fieldName such that greaterThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply greaterThanEqualTo validation based on matched condition in the form, like if the Age is ‘18’ then the VoterAge,OtherAge value should be Greater than or equal to 18.
3. Adding Custom Message on OtherAge Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how greaterThanEqualTo validator fulfil the need.

# Basic GreaterThanEqualTo Validation
First we need to create User model class define a property of Age and VoterAge  in the model to achieve the functional need of point 1. 
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\add\greater-than-equal-to-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\edit\greater-than-equal-to-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `user-data.json` for getting data from the server

[!code-typescript[](\assets\examples\greaterThanEqualTo\edit\user-data.json?condition="tab_1=='basicedit'"&type=section)]


Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\add\greater-than-equal-to-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\edit\greater-than-equal-to-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=greaterThanEqualTo Decorator for add Example)]
<app-greaterThanEqualTo-add></app-greaterThanEqualTo-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=greaterThanEqualTo Decorator for edit Example)]
<app-greaterThanEqualTo-edit></app-greaterThanEqualTo-edit>

# RelationalOperatorConfig

Below options are not mandatory to use in the `@greaterThanEqualTo()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpressions) | Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 
Greater than Equal to validation should be applied based on the `fieldName` for compare other field value 

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.html)]
***
[!example(?type=section&clickEventCode="fieldNameShow=!fieldNameShow"&title=greaterThanEqualTo decorator with fieldName)]
<app-greaterThanEqualTo-fieldName></app-greaterThanEqualTo-fieldName>

## conditionalExpression 
Type :  `Function`  |  `string` 
Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\conditionalExpression\greater-than-equal-to-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\conditionalExpression\greater-than-equal-to-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=greaterThanEqualTo decorator with conditionalExpression)]
<app-greaterThanEqualTo-conditionalExpression></app-greaterThanEqualTo-conditionalExpression>

## message 
Type :  `string`
To override the global configuration message and show the custom message on particular control property. 

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\message\greater-than-equal-to-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\message\greater-than-equal-to-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=greaterThanEqualTo decorator with custom message)]
<app-greaterThanEqualTo-message></app-greaterThanEqualTo-message>

# Complete greaterThanEqualTo Example

This Complete greaterThanEqualTo example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2, and 3

[!TabGroup]
# [Example](#tab\completeexample)
<app-greaterThanEqualTo-complete></app-greaterThanEqualTo-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.html)]
***

# Dynamic greaterThanEqualTo Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-greaterThanEqualTo-dynamic></app-greaterThanEqualTo-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\dynamic\greater-than-equal-to-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\greaterThanEqualTo\dynamic\greater-than-equal-to-dynamic.component.html)]
***