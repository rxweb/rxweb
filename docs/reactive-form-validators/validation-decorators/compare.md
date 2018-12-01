---
title: compare 
description: Compare validation  {{validatorType}}  will compare two inputs whether they are same or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form in which you want to compare passwords which are entered by the user which contains fields like Password and Confirm Password Here depending upon the requirement these scenarios may arise.
<ol>
	<li>The Name of Password field on which comparison is done.</li>
    <li>The Custom Message on ConfirmPassword field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply compare validation dynamically based on server rules.</li>
    </data-scope>
</ol>
Let’s see how compare {{validatorType}} fulfil the need.

# Basic Compare Validation
<data-scope scope="['decorator']">
First we need to create a User Model class and define property of Password and Confirm Password in the model to achieve the functional need of point 1.
<div component="app-code" key="compare-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add form operation.

<div component="app-code" key="compare-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="compare-add-html"></div> 
<div component="app-example-runner" ref-component="app-compare-add"></div>
***

# CompareConfig
Below options are not mandatory to use in the `@compare()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#fieldName")'  title="fieldName">fieldName</a></td><td>Current property is matched with the particular property. so we need to pass particular property name.</td></tr>
<tr><td><a   (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## fieldName 
Type :  `string` 

Current property is matched with the particular property. so we need to pass particular property name.

<div component="app-code" key="compare-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-compare-fieldName" title="fieldName decorators with fieldName" key="fieldName"></div>

## message
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="compare-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-compare-message" title="compare decorators with message" key="message"></div>

# Complete Compare Example

This Complete Compare example which includes all the CompareConfig properties will fulfil the requirement of scenarios 1 and 2.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-compare-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="compare-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="compare-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="compare-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Compare Example

This Dynamic Compare example which execute based on json passed. conditional expression with function would be not apply in dynamic Compare example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-compare-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="compare-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="compare-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="compare-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="compare-dynamic-html"></div> 
# [/Html]
***
</data-scope>
