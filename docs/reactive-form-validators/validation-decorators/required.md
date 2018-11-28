---
title: required 
description: Required validation  {{validatorType}}  will check that the user has entered the value in the property or not.
author: rxcontributortwo

---
# When to use
Suppose you want to create a UserInfo form, which contains fields like FirstName, LastName, Username and you want the user to must enter anything in that field. That field can not be empty. Here depending upon the requirement these scenarios may arise.
<ol>
<li>Make the FirstName a required field without any condition.</li>
<li>Apply required validation based on matched condition in the form, like if the FirstName is `John`, then only the required validation will be applied to LastName field.</li>
<li>Adding Custom Message on Username Field.</li>
<li>Apply required validation dynamically based on server rules.</li>
</ol>
Let’s see how required validator fulfil the need.

# Basic Required Validation

<data-scope scope="['decorator']">
First we need to create a User class and define a property of FirstName in the model to achieve the functional need of point 1.
<div component="app-code" key="required-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="required-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="required-add-html"></div> 
<div component="app-example-runner" ref-component="app-required-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="required-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="required-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="required-edit-html"></div> 
<div component="app-example-runner" ref-component="app-required-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="required-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="required-add-html"></div> 
<div component="app-example-runner" ref-component="app-required-add"></div>
</data-scope>

# RequiredConfig 
Below options are not mandatory to use in the `@required()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Required validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Required validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="required-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="required-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-required-conditionalExpression" title="required decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="required-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-required-message" title="required decorators with message" key="message"></div>

# Complete required Example

This Complete required example which includes all the RequiredConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-required-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="required-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="required-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="required-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic required Example

This Dynamic required example which execute based on json passed. conditional expression with function would be not apply in dynamic required example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-required-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="required-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="required-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="required-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="required-dynamic-html"></div> 
# [/Html]
***
</data-scope>
