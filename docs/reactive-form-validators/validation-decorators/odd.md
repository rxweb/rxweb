---
title : Odd validation
description : Odd validation decorator will check whether the value entered is a odd or not. if user tries to enter value which is not a odd the property will be invalid. to use the odd decorator on particular property.
author : rxcontributorone

---

# When to use
Let’s assume that you are creating a user form, which contains fields like Number, Type, OddNumber and you want the user to enter only odd numbers Here depending upon the requirement these scenarios may arise.
1.	Allow only oddnumbers in OddNumber .
2.	Apply Odd validation based on matched condition in the form, like if the type  is ‘Odd’ then the number value should be odd number.
3.	Adding Custom Message on OddNumber Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how Odd validator fulfil the need.

# Basic Odd Validation
First we need to create ea User class and define a property of odd in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\odd\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\odd\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\odd\add\odd-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\odd\edit\odd-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\odd\add\odd-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\odd\edit\odd-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-odd-add></app-odd-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-odd-edit></app-odd-edit>

# BaseConfig
Below options are not mandatory to use in the `@odd()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpressions](#conditionalexpressions) | Odd  validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpressions 
Type :  `Function`  |  `string` 

Odd validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\odd\conditionalExpressions\user.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\odd\conditionalExpressions\odd-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\odd\conditionalExpressions\odd-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-odd-conditionalExpressions></app-odd-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\odd\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\odd\message\odd-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\odd\message\odd-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-odd-message></app-odd-message>

# Complete Odd Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-odd-complete></app-odd-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\odd\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\odd\complete\odd-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\odd\complete\odd-complete.component.html)]
***