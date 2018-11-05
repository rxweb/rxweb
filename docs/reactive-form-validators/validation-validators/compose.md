---
title: compose
description: Compose validation validator is used to apply multiple validations on a particular field.
author: rxcontributortwo

---
# When to use
Suppose you want to create UserInfo form, which contains fields like firstName, lastName, age, emailId and you want to apply multiple validations on these fields. Here depending upon the requirement these scenarios may arise.
1. Apply required and alpha validation on firstName field.
2. Apply required, alpha and different validation on lastName field.
3. Apply digit, maxNumber and minNumber validation on age field based on matched condition in the form, like if the firstName is 'Bharat', then only the age must be validated.
4. Apply required, email and maxLength validation based on matched condition in the form, like if the firstName is 'Bharat', then only the emailId must be validated.
5. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how compose validator fulfil the need.

# Basic Compose Validation
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\add\compose-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\add\compose-add.component.html?type=section)]

[!example(?title=compose validator for add Example)]
<app-compose-add-validator></app-compose-add-validator>

# ComposeConfig
Below options are not mandatory to use in the `RxwebValidators.compose()` validator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[validators](#validators) | It is an array of rxwebValidators. Validators are set according to the relative requirement based on which validation you want to apply. Here you have to specify the name of validator which you want to use. |
|[conditionalExpression](#conditionalExpression) | Compose validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |

## validators
Type :  `ValidatorFn[]`

It is an array of rxwebValidators. Validators are set according to the relative requirement based on which validation you want to apply. Here you have to specify the name of validator which you want to use.

[!codeExample(?title=validatorsExample)]

[!TabGroup(?showHideCondition="validators")]
# [Component](#tab\validatorsComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\validators\compose-validators.component.ts)]
# [Html](#tab\validatorsHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\validators\compose-validators.component.html)]
***

[!example(?type=section&clickEventCode="validators=!validators"&title=compose decorator with validators)]
<app-compose-validators-validator></app-compose-validators-validator>

## conditionalExpression 
Type :  `Function`  |  `string` 

Compose validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\conditionalExpression\compose-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\conditionalExpression\compose-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=compose decorator with conditionalExpression)]
<app-compose-conditionalExpression-validator></app-compose-conditionalExpression-validator>

# Complete Compose Example

This Complete Compose example which includes all the ComposeConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

[!TabGroup]
# [Example](#tab\completeexample)
<app-compose-complete-validator></app-compose-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\complete\compose-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\complete\compose-complete.component.html)]
***

# Dynamic Compose Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-compose-dynamic-validator></app-compose-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\dynamic\compose-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compose\dynamic\compose-dynamic.component.html)]
***
