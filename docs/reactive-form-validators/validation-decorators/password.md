---
title: password  
description: Password validation decorator will allow user to enter only the input according to correct password validation format.
author: rxcontributorone

---
# When to use
Suppose you want to create a login form, which contains fields like newPassword and oldPassword and you want the user to enter valid Password pattern. Here depending upon the requirement these scenarios may arise.	
<ol>
   <li>Adding validation on oldPassword Field and adding  Custom Message on it.</li>
   <li>Apply validation in newPassword validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter,  minLength, maxLength.</li>
   <li>Apply password validation dynamically based on server rules.</li>
</ol>
Let’s see how password validator fulfil the need.

# Basic password Validation
<data-scope scope="['decorator']">
First we need to create LoginInfo model class define a property of password in the model to achieve the functional need of point 1.
<div component="app-code" key="password-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations.

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="password-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="password-add-html"></div> 
<div component="app-password-add" title="password Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="password-edit-component"></div>
The below code is `login-info-data.json` for getting data from the server 
<div component="app-code" key="data-password"></div> 
Next, we need to write html code.
<div component="app-code" key="password-edit-html"></div> 
<div component="app-password-add" title="password Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="password-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="password-add-html"></div> 
<div component="app-password-add" title="password Decorator for add Example"></div>
</data-scope>

# PasswordConfig 
message options are not mandatory to use in the `@password()` decorator but validation is mandatory. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
<tr><td><a href="#validation" (click)='scrollTo("#validation")'  title="validation"> Validation is used for setting the parameters for password validation, In Password validation there is validations on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.</td></tr>

## message 
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="password-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-password-message" title="password decorators with message" key="message"></div>

## validation 
Type :  `PasswordValidation`

Password Validation is used for setting the parameters for password validation, In Password validation there is validation on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.

<div component="app-code" key="password-validationExample-model"></div> 
<div component="app-example-runner" ref-component="app-password-validation" title="password decorators with validation" key="validation"></div>

# Complete password Example

This Complete password example which includes all the PasswordConfig properties will fulfil the requirement of scenarios 1 and 2.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-password-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="password-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="password-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="password-complete-html"></div> 
***

# Dynamic password Example

This Dynamic password example which execute based on json passed. conditional expression with function would be not apply in dynamic password example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-password-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="password-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="password-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="password-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="password-dynamic-html"></div> 
***