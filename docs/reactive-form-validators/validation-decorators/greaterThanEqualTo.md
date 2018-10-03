---
title: GreaterThanEqualTo Validation
description: Greater than equal to validation decorator will check that input property is greater than equal to value. If user tries to enter less than value then the property will become invalid. To use the greaterThanEqualTo decorator on particular property. 
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you have fields like Age,VoterAge,OtherAge and you want user to enter Age such that VoterAge,OtherAge should be greater than or equal to Age Here depending upon the requirement these scenarios may arise.
1. Specify Age as fieldName such that greaterThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply greaterThanEqualTo validation based on matched condition in the form, like if the Age is ‘18’ then the VoterAge,OtherAge value should be Greater than or equal to 18.
3. Adding Custom Message on OtherAge Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how greaterThanEqualTo validator fulfil the need.

# Basic GreaterThanEqualTo Validation
First we need to create User model class define a property of Age and VoterAge  in the model to achieve the functional need of point 1. 
[!code-typescript[](\assets\examples\greaterThanEqualTo\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\greaterThanEqualTo\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\greaterThanEqualTo\add\greater-than-equal-to-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\greaterThanEqualTo\edit\greater-than-equal-to-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\greaterThanEqualTo\add\greater-than-equal-to-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\greaterThanEqualTo\edit\greater-than-equal-to-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-greaterThanEqualTo-add></app-greaterThanEqualTo-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-greaterThanEqualTo-edit></app-greaterThanEqualTo-edit>

# RelationalOperatorConfig

Below options are not mandatory to use in the `@greaterThanEqualTo()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 
Greater than Equal to validation should be applied based on the `fieldName` for compare other field value 

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\greaterThanEqualTo\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\greaterThanEqualTo\fieldName\greater-than-equal-to-field-name.component.html)]
***

## conditionalExpression 
Type :  `Function`  |  `string` 
Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\greaterThanEqualTo\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\greaterThanEqualTo\conditionalExpressions\greater-than-equal-to-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\greaterThanEqualTo\conditionalExpressions\greater-than-equal-to-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-greaterThanEqualTo-conditionalExpressions></app-greaterThanEqualTo-conditionalExpressions>

## message 
Type :  `string`
To override the global configuration message and show the custom message on particular control property. 

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\greaterThanEqualTo\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\greaterThanEqualTo\message\greater-than-equal-to-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\greaterThanEqualTo\message\greater-than-equal-to-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-greaterThanEqualTo-message></app-greaterThanEqualTo-message>

# Complete greaterThanEqualTo Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-greaterThanEqualTo-complete></app-greaterThanEqualTo-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\greaterThanEqualTo\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\greaterThanEqualTo\complete\greater-than-equal-to-complete.component.html)]
***
