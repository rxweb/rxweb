---
title: compare 
description: Compare validation validator will compare two inputs whether they are same or not.
author: rxcontributorone

--- 
# When to use
Suppose you want to create a user form in which you want to compare passwords which are entered by the user which contains fields like Password and Confirm Password Here depending upon the requirement these scenarios may arise.
1.	The Name of Password field on which comparison is done.
2.  The Custom Message on ConfirmPassword field.  
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how compare validator fulfil the need.

# Basic Compare Validation 
We need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add form operation.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\add\compare-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\add\compare-add.component.html?type=section)]

[!example(?title=compare validator for add Example)]
<app-compare-add-validator></app-compare-add-validator>

# CompareConfig
Below options are not mandatory to use in the `RxwebValidators.compare()` validator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

 
## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\fieldName\compare-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\fieldName\compare-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=compare validator with fieldName)]
<app-compare-fieldName-validator></app-compare-fieldName-validator>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\message\compare-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\message\compare-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=compare validator with custom message)]
<app-compare-message-validator></app-compare-message-validator>

# Complete Compare Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-compare-complete-validator></app-compare-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\complete\compare-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\complete\compare-complete.component.html)]
***

# Dynamic Compare Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-compare-dynamic-validator></app-compare-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\dynamic\compare-dynamic.component.ts)]
 # [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\compare\dynamic\compare-dynamic.component.html)]
***