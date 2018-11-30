---
title: contains  
description: Contains validation  {{validatorType}}  will check that value is in the input, It will not allow to enter input that not contains the predefined value.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like EmailAddress, RecoveryEmailAddress, OtherEmailAddress and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow input which contains the predefined value in EmailAddress.</li>
	<li>Apply contains validation based on matched condition in the form, like if the EmailAddress is `abc@gmail.com`, then only the the       contains validation must be applied to RecoveryEmailAddress value.</li>
	<li>Adding Custom Message on OtherEmailAddress Field.</li>
	<li>Apply contains validation dynamically based on server rules.</li>
</ol>
Let’s see how contains validator fulfil the need.

# Basic Contains Validation
<data-scope scope="['decorator']">
First we need to create a User class and define a property of EmailAddress in the model to achieve the functional need of point 1.
<div component="app-code" key="contains-add-model"></div> 
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
<div component="app-code" key="contains-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="contains-add-html"></div> 
<div component="app-example-runner" ref-component="app-contains-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="contains-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="contains-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="contains-edit-html"></div> 
<div component="app-example-runner" ref-component="app-contains-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="contains-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="contains-add-html"></div> 
<div component="app-example-runner" ref-component="app-contains-add"></div>
</data-scope>

# ContainsConfig 
conditionalExpression and message options are not mandatory but value is mandatory to use in the `@contains()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#value")' title="value">value</a></td><td>This is substring value.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a   (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## value 
Type :  `string` 

This is substring value.

<div component="app-code" key="contains-valueExample-model"></div> 
<div component="app-example-runner" ref-component="app-contains-value" title="contains decorators with value" key="value"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Contains validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="contains-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="contains-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-contains-conditionalExpression" title="contains decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="contains-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-contains-message" title="contains decorators with message" key="message"></div>

# Complete Contains Example

This Complete Contains example which includes all the ContainsConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-contains-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="contains-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="contains-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="contains-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Contains Example

This Dynamic Contains example which execute based on json passed. conditional expression with function would be not apply in dynamic Contains example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-contains-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="contains-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="contains-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="contains-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="contains-dynamic-html"></div>
# [/Html]
***
</data-scope>