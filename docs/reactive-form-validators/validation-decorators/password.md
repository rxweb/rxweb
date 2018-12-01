---
title: password  
description: Password validation  {{validatorType}}  will allow user to enter only the input according to correct password validation format.
author: rxcontributorone

---
# When to use
Suppose you want to create a login form, which contains fields like newPassword and oldPassword and you want the user to enter valid Password pattern. Here depending upon the requirement these scenarios may arise.	
<ol>
   <li>Adding validation on oldPassword Field and adding  Custom Message on it.</li>
   <li>Apply validation in newPassword validation there is validators on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply password validation dynamically based on server rules.</li>
   </data-scope>
</ol>
Let’s see how password {{validatorType}} fulfil the need.

# Basic password Validation
<data-scope scope="['decorator']">
First we need to create LoginInfo model class define a property of password in the model to achieve the functional need of point 1.
<div component="app-code" key="password-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
<data-scope scope="['decorator']">
Here we have covered Add and Edit form operations. 
</data-scope>

<data-scope scope="['validator','template-driven']">
Here we have covered Add form operations. 
</data-scope>

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="password-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="password-add-html"></div> 
<div component="app-example-runner" ref-component="app-password-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="password-edit-component"></div>
The below code is `login-info-data.json` for getting data from the server 
<div component="app-code" key="password-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="password-edit-html"></div> 
<div component="app-example-runner" ref-component="app-password-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="password-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="password-add-html"></div> 
<div component="app-example-runner" ref-component="app-password-add"></div>
</data-scope>

# PasswordConfig 
m<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@password()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.password()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `password` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
<tr><td><a href="#validation" (click)='scrollTo("#validation")'  title="validation">validation</a></td><td> Validation is used for setting the parameters for password validation, In Password validation there is validations on digit, alphabets, contains, lowerCase, upperCase, specialCharacter, minLength, maxLength.</td></tr>
</table>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

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
<div component="app-example-runner" ref-component="app-password-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="password-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="password-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="password-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic password Example

This Dynamic password example which execute based on json passed. conditional expression with function would be not apply in dynamic password example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-password-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="password-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="password-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="password-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="password-dynamic-html"></div> 
# [/Html]
***
</data-scope>