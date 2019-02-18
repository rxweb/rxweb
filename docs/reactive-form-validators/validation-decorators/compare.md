---
title: compare 
description: Compare validation  {{validatorType}}  will compare two inputs whether they are same or not.
author: rxcontributorone
category: form-validations
type: tabs
linktitle: compare
---

# When to use
Suppose you want to create a user form in which you want to compare two different field inputs which are entered by the user. The form contains fields like Email, Confirm Email, Password and Confirm Password. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
	<li>Apply compare validator on Confirm Email field to compare its input with Email field.</li>
    <li>Displaying the Custom Message on ConfirmPassword field and compare its input with Password field input.</li>
    <data-scope scope="['decorator','validator']">
        <li>Apply compare validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how compare {{validatorType}} fulfil the need.

# Basic Compare Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
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
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@compare()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.compare()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `compare` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#fieldName")' title="fieldName">fieldName</a></td><td>Current property is matched with the particular property. So we need to pass particular property name.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>	To override the global configuration message and set the custom error message on respective FormControl.</td></tr>
</table>

## fieldName 
Type :  `string`

Current property is matched with the particular property. So we need to pass particular property name.

<div component="app-code" key="compare-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-compare-fieldName" title="fieldName {{validatorType}} with fieldName" key="fieldName"></div>

## message
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="compare-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-compare-message" title="compare {{validatorType}} with message" key="message"></div>

# Complete Compare Example

This Complete Compare example which includes all the CompareConfig properties will fulfil the requirement of scenarios 1 and 2.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-compare-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
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

This Dynamic Compare example is executed on the basis of json passed in the formBuilderConfiguration which comes under `RxFormBuilder` of reactive-form-validators. `conditionalExpression` with function would not be applied in dynamic compare example. This example will fulfil the requirement of our last point.

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
