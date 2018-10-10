---
title: password  
description: Password validation decorator will allow only password to be entered. If user tries to enter any string rather than password pattern according for PasswordValidation parameters then the property will become invalid. To use the password decorator on particular property.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a login form, which contains fields like newPassword and oldPassword and you want the user to enter valid Password pattern. Here depending upon the requirement these scenarios may arise.	
1. Adding Custom Message on oldPassword Field.
2. Apply validation in newPassword validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.
3. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how password validator fulfil the need.

# Basic password Validation
First we need to create LoginInfo model class define a property of password in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\password\add\login-info.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\password\edit\login-info.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\password\add\password-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\password\edit\password-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\password\add\password-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\password\edit\password-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-password-add></app-password-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-password-edit></app-password-edit>

# PasswordConfig 
message options are not mandatory to use in the `@password()` decorator but validation is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[validation](#validation) | Validation is used for setting the parameters for password validation, In Password validation there is validations on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength. |

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\password\message\login-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\password\message\password-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\password\message\password-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=password decorator with custom message)]
<app-password-message></app-password-message>

## validation 
Type :  `PasswordValidation`
Password Validation is used for setting the parameters for password validation, In Password validation there is validation on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.

[!TabGroup(?showHideCondition="validation")]
# [Model](#tab\validationModel)
[!code-typescript[](\assets\examples\password\validation\login-info.model.ts)]
# [Component](#tab\validationComponent)
[!code-typescript[](\assets\examples\password\validation\password-validation.component.ts)]
# [Html](#tab\validationHtml)
[!code-typescript[](\assets\examples\password\validation\password-validation.component.html)]
***

[!example(?type=section&clickEventCode="validation=!validation"&title=password decorator with validation)]
<app-password-validation></app-password-validation>

# Complete password Example
[!TabGroup]
# [Example](#tab\completeExample)
<app-password-complete></app-password-complete>
# [Model](#tab\completeModel)
[!code-typescript[](\assets\examples\password\complete\login-info.model.ts)]
# [Component](#tab\completeComponent)
[!code-typescript[](\assets\examples\password\complete\password-complete.component.ts)]
# [Html](#tab\completeHtml)
[!code-typescript[](\assets\examples\password\complete\password-complete.component.html)]
***
