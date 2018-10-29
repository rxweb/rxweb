---
title: even 
description: Even validation validator will check whether the value entered by user is an even number or not.
author: rxcontributorone

---

# When to use
Suppose you want to create a user form, which contains fields like Number, Type, EvenNumber and you want the user to enter only even numbers Here depending upon the requirement these scenarios may arise.
1.  Allow only evennumbers in EvenNumber’s field .
2.	Apply Even validation based on matched condition in the form, like if the type  is ‘Even’ then the number value should be even number.
3.	Adding Custom Message on EvenNumber Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how even validator fulfil the need.

# Basic Even Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation. 

[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\add\even-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\add\even-add.component.html?type=section)]

[!example(?title=even validator for add Example)]
<app-even-add-validator></app-even-add-validator>

# BaseConfig
Below options are not mandatory to use in the `RxwebValidators.even()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Even validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. 

## conditionalExpression 
Type :  `Function`  |  `string` 

Even validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\conditionalExpression\even-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\conditionalExpression\even-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=even validator with conditionalExpression)]
<app-even-conditionalExpression-validator></app-even-conditionalExpression-validator>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\message\even-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\message\even-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=even validator with custom message)]
<app-even-message-validator></app-even-message-validator>

# Complete even Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-even-complete-validator></app-even-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\complete\even-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\complete\even-complete.component.html)]
***

# Dynamic even Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-even-dynamic-validator></app-even-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\even\dynamic\even-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\even\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\even\dynamic\even-dynamic.component.html)]
***