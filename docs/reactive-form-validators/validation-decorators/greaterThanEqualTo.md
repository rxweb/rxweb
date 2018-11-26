---
title: greaterThanEqualTo 
description: Greater than equal to validation decorator will check that input property is greater than or equal to the related field input.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form and you have fields like Age, VoterAge, OtherAge and you want user to enter Age such that VoterAge,OtherAge should be greater than or equal to Age Here depending upon the requirement these scenarios may arise.

<ol>
<li>Specify Age as fieldName such that greaterThanEqualTo validation should be applied to the fieldname for comparing other fields.</li>
<li>Apply greaterThanEqualTo validation based on matched condition in the form, like if the Age is ‘18’ then the </li>VoterAge,OtherAge value should be Greater than or equal to 18.
<li>Adding Custom Message on OtherAge Field.</li>
<li>Apply greaterThanEqualTo validation dynamically based on server rules.</li>

Let’s see how greaterThanEqualTo decorator fulfil the need.

# Basic GreaterThanEqualTo Validation

<data-scope scope="['decorator']">
First we need to create User model class define a property of Age and VoterAge  in the model to achieve the functional need of point 1. 
<div component="app-code" key="greaterThanEqualTo-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="greaterThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThanEqualTo-add-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="greaterThanEqualTo-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="greaterThanEqualTo-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThanEqualTo-edit-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="greaterThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThanEqualTo-add-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-add"></div>
</data-scope>

# RelationalOperatorConfig

Below options are not mandatory to use in the `@greaterThanEqualTo()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#fieldName" title="fieldName">fieldName</a></td><td>Greater than Equal to validation should be applied based on the `fieldName` for compare other field value</td></tr>
<tr><td><a href="#conditionalExpression" title="conditionalExpression">conditionalExpression</a></td><td>GreaterThanEqualTo validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" title="message">message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
</table>

## fieldName 
Type :  `string` 
Greater than Equal to validation should be applied based on the `fieldName` for compare other field value 

<div component="app-code" key="greaterThanEqualTo-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-fieldName" title="greaterThanEqualTo decorators with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 
Greater than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="greaterThanEqualTo-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="greaterThanEqualTo-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-greaterThanEqualTo-conditionalExpression" title="greaterThanEqualTo decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string`
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="greaterThanEqualTo-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-message" title="alpha decorators with message" key="message"></div>

# Complete greaterThanEqualTo Example

This Complete greaterThanEqualTo example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2, and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="greaterThanEqualTo-complete-model"></div> 
# [/Model] 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="greaterThanEqualTo-complete-component"></div>
# [/Component]  
# [Html](#tab\completehtml)
<div component="app-code" key="greaterThanEqualTo-complete-html"></div> 
# [/Html] 
***

<data-scope scope="['decorator','validator']">
# Dynamic greaterThanEqualTo Example

This Dynamic greaterThanEqualTo example which execute based on json passed. conditional expression with function would be not apply in dynamic greaterThanEqualTo example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-greaterThanEqualTo-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="greaterThanEqualTo-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="greaterThanEqualTo-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="greaterThanEqualTo-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="greaterThanEqualTo-dynamic-html"></div> 
# [/Html]
***
</data-scope>
