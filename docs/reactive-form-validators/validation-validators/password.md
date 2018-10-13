---
title: password  
description: Password validation validator will allow user to enter only the input according to correct password validation format.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a login form, which contains fields like newPassword and oldPassword and you want the user to enter valid Password pattern. Here depending upon the requirement these scenarios may arise.	
1. Adding Custom Message on oldPassword Field.
2. Apply validation in newPassword validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.
3. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how password validator fulfil the need.

# Basic password Validation
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\add\password-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\add\password-add.component.html?type=section)]

[!example(?title=password validator for add Example)]
<app-password-add-validator></app-password-add-validator>

# PasswordConfig 
message options are not mandatory to use in the `RxwebValidators.password()` validator but validation is mandatory. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[validation](#validation) | Validation is used for setting the parameters for password validation, In Password validation there is validations on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength. |

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\message\password-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\message\password-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=password validator with custom message)]
<app-password-message-validator></app-password-message-validator>

## validation 
Type :  `PasswordValidation`
Password Validation is used for setting the parameters for password validation, In Password validation there is validation on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.

[!codeExample(?title=validationExample)]

[!TabGroup(?showHideCondition="validation")]
# [Component](#tab\validationComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\validation\password-validation.component.ts)]
# [Html](#tab\validationHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\validation\password-validation.component.html)]
***

[!example(?type=section&clickEventCode="validation=!validation"&title=password validator with validation)]
<app-password-validation-validator></app-password-validation-validator>

# Complete password Example
[!TabGroup]
# [Example](#tab\completeExample)
<app-password-complete-validator></app-password-complete-validator>
# [Component](#tab\completeComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\complete\password-complete.component.ts)]
# [Html](#tab\completeHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\complete\password-complete.component.html)]
***

# Dynamic password Example
[!TabGroup]
# [Example](#tab\dynamicExample)
<app-password-dynamic-validator></app-password-dynamic-validator>
# [Component](#tab\dynamicComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\dynamic\password-dynamic.component.ts)]
# [Html](#tab\dynamicHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\validators\password\dynamic\password-dynamic.component.html)]
***