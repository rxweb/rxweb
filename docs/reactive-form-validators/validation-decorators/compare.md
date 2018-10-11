---
title: compare 
description: Compare validation decorator will compare two inputs, If user enter unmatched value then the property will become invalid.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form in which you want to compare passwords which are entered by the user which contains fields like Password and Confirm Password Here depending upon the requirement these scenarios may arise.
1.	The Name of Password field on which comparison is done.
2.  The Custom Message on ConfirmPassword field.  
3.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how compare validator fulfil the need.

# Basic Compare Validation
First we need to create a User Model class and define property of Password and Confirm Password in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\compare\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\compare\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\compare\add\compare-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\compare\edit\compare-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\compare\add\compare-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\compare\edit\compare-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=compare Decorator for add Example)]
<app-compare-add></app-compare-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=compare Decorator for edit Example)]
<app-compare-edit></app-compare-edit>

# CompareConfig
Below options are not mandatory to use in the `@compare()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldName) | Current property is matched with the particular property. so we need to pass particular property name. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

 
## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

[!codeExample(?title=fieldNameExample)]

[!TabGroup(?showHideCondition="fieldName")]
# [Model](#tab\fieldNamemodel)
[!code-typescript[](\assets\examples\compare\fieldName\user.model.ts)]
# [Component](#tab\fieldNameComponent)
[!code-typescript[](\assets\examples\compare\fieldName\compare-field-name.component.ts)]
# [Html](#tab\fieldNameHtml)
[!code-typescript[](\assets\examples\compare\fieldName\compare-field-name.component.html)]
***

[!example(?type=section&clickEventCode="fieldName=!fieldName"&title=compare decorator with fieldName)]
<app-compare-fieldName></app-compare-fieldName>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\compare\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\compare\message\compare-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\compare\message\compare-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=compare decorator with custom message)]
<app-compare-message></app-compare-message>

# Complete Compare Example

This Complete Compare example which includes all the CompareConfig properties will fulfil the requirement of scenarios 1 and 2.

[!TabGroup]
# [Example](#tab\completeexample)
<app-compare-complete></app-compare-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\compare\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\compare\complete\compare-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\compare\complete\compare-complete.component.html)]
***

# Dynamic Compare Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-compare-dynamic></app-compare-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\compare\dynamic\user.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\compare\dynamic\compare-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\compare\dynamic\compare-dynamic.component.html)]
***