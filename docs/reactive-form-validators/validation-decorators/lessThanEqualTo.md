---
title: LessThanEqualTo Validation
description: Less than equal to validation decorator will check that input property is less than equal to value. If user tries to enter greater than value then the property will become invalid. To use the lessThanEqualTo decorator on particular property.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you have fields like TotalMarks,ObtainedMarks,OtherMarks and you want user to enter ObtainedMarks,OtherMarks such that they should be less than or equal to TotalMarks Here depending upon the requirement these scenarios may arise
1. Specify TotalMarks as fieldName such that LessThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply LessThanEqualTo validation based on matched condition in the form, like if the TotalMarks is ‘100’ then the ObtainedMarks,OtherMarks value should be less than or equal to 100.
3. Adding Custom Message on OtherMarks Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.


Let’s see how lessThanEqualTo validator fulfil the need.

# Basic LessThanEqualTo Validation
First we need to create User model class define a property of Marks and TotalMarks model to achieve the functional need of point 1. 
[!code-typescript[](\assets\examples\lessThanEqualTo\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\lessThanEqualTo\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\lessThanEqualTo\add\less-than-equal-to-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\lessThanEqualTo\edit\less-than-equal-to-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\lessThanEqualTo\add\less-than-equal-to-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\lessThanEqualTo\edit\less-than-equal-to-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-lessThanEqualTo-add></app-lessThanEqualTo-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-lessThanEqualTo-edit></app-lessThanEqualTo-edit>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@lessThanEqualTo()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Less than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## fieldName 
Type :  `string` 
Less than Equal to validation should be applied based on the `fieldName` for compare other field value. 

[!TabGroup(?showHideCondition="fieldNameShow")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\lessThanEqualTo\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\lessThanEqualTo\fieldName\less-than-equal-to-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\lessThanEqualTo\fieldName\less-than-equal-to-field-name.component.html)]
***

## conditionalExpression 
Type :  `Function`  |  `string` 
Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. 

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\lessThanEqualTo\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\lessThanEqualTo\conditionalExpressions\less-than-equal-to-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\lessThanEqualTo\conditionalExpressions\less-than-equal-to-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-lessThanEqualTo-conditionalExpressions></app-lessThanEqualTo-conditionalExpressions>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\lessThanEqualTo\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\lessThanEqualTo\message\less-than-equal-to-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\lessThanEqualTo\message\less-than-equal-to-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-lessThanEqualTo-message></app-lessThanEqualTo-message>

# Complete lessThanEqualTo Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-lessThanEqualTo-complete></app-lessThanEqualTo-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\lessThanEqualTo\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\lessThanEqualTo\complete\less-than-equal-to-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\lessThanEqualTo\complete\less-than-equal-to-complete.component.html)]
***
