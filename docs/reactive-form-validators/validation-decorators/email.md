---
title: email 
description: Email validation  {{validatorType}}  will only allow user to enter input which is in the correct email format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form and you have fields like Email, RecoveryEmail, OtherEmailAddress and you want user to enter valid EmailAddress Here depending upon the requirement these scenarios may arise.

<ol>
    <li>Adding email validation on the field named email without any conditional expression.</li>
    <li>Apply email validation based on matched condition in the form, like if the Email is ‘abc@gmail.com’ then the RecoveryEmailAddress value should be valid email address.</li>
    <li>Adding Custom Message on OtherEmailAddress Field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply email validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how email  {{validatorType}}  fulfil the need.

# Basic Email Validation

<data-scope scope="['decorator','template-driven']">
First we need to create User model class define a property of Email in the model to achieve the functional need of point 1.
<div component="app-code" key="email-add-model"></div> 
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
<div component="app-code" key="email-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="email-add-html"></div> 
<div component="app-example-runner" ref-component="app-email-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="email-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="email-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="email-edit-html"></div> 
<div component="app-example-runner" ref-component="app-email-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="email-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="email-add-html"></div> 
<div component="app-example-runner" ref-component="app-email-add"></div>
</data-scope>

#EmailConfig

<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@email()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.email()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `email` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="email-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="email-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-email-conditionalExpression" title="email {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="email-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-email-message" title="email {{validatorType}} with message" key="message"></div>

# Complete Email Example

This Complete Email example which includes all the EmailConfig properties will fulfil the requirement of scenarios 1, 2 and
 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-email-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven']">
# [Model](#tab\completemodel)
<div component="app-code" key="email-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="email-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="email-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Email Example

This Dynamic Email example which execute based on json passed. conditional expression with function would be not apply in dynamic email example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-email-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="email-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="email-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="email-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="email-dynamic-html"></div> 
# [/Html]
***
</data-scope>
