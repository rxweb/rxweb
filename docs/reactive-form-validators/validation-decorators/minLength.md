---
title: minLength 
description: MinLength validation decorator will allow user to enter the input length matching the minimum length value parameter.
author: rxcontributorone

---
# When to use
Suppose you want to create a Contact form, which contains fields like countryName, MobileNo, LandlineNo and you want the user to enter valid  Number which should be of the minimum specified length. Here depending upon the requirement these scenarios may arise.
<ol>
<li>Apply MinLength validation based on matched condition in the form, like if the CountryName is ‘India’ then the countryCode value  should be of the minimum specified length.</li>
<li>Adding Custom Message on LandlineNo Field.</li>
<li>Adding value which you want to restrict number in the property. The Minimum length is '10'. </li>
<li>Apply MinLength validation dynamically based on server rules.</li>
</ol>
Let’s see how minLength validator fulfil the need.

# Basic MinLength Validation

<data-scope scope="['decorator']">
First we need to create Contact model class define a property of CountryName in the model to achieve the functional need of point 1.
<div component="app-code" key="minLength-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="minLength-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="minLength-add-html"></div> 
<div component="app-example-runner" ref-component="app-minLength-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="minLength-edit-component"></div> 
The below code is `contact-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="minLength-edit-html"></div> 
<div component="app-example-runner" ref-component="app-minLength-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="minLength-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="minLength-add-html"></div> 
<div component="app-example-runner" ref-component="app-minLength-add"></div>
</data-scope>

# NumberConfig 

message and conditional expression options are not mandatory to use in the `@minLength()` decorator but value is mandatory. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#value" (click)='scrollTo("#value")' title="value">value</a></td><td>enter value which you want to restrict string length in the property</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">allowWhiteSpace</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 
Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="minLength-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="minLength-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-minLength-conditionalExpression" title="minLength decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="minLength-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-minLength-message" title="minLength decorators with message" key="message"></div>

## value 
Type :  `number` 
enter value which you want to restrict string length in the property.

<div component="app-code" key="minLength-valueExample-model"></div> 
<div component="app-example-runner" ref-component="app-minLength-value" title="minLength decorators with value" key="value"></div>

# Complete MinLength Example

This Complete MinLength example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-minLength-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="minLength-complete-model"></div> 
# [/Model] 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="minLength-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="minLength-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic MinLength Example

This Dynamic Alpha example which execute based on json passed. conditional expression with function would be not apply in dynamic minLength example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-minLength-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="minLength-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="minLength-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="minLength-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="minLength-dynamic-html"></div> 
# [/Html]
***
</data-scope>
