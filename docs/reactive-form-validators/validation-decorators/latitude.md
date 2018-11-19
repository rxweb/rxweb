---
title: latitude
description: latitude validation decorator allows user to enter value which is valid latitude.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLatitude, secondCountryLatitude and thirdCountryLatitude and you want the user to enter input which is a proper latitude format. Here depending upon the requirement, these scenarios may arise..

<ol>
    <li>Apply validation on firstCountryLatitude field and add Custom Message on it.</li>
    <li>Apply latitude validation on secondCountryLatitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLatitude must be a latitude format (Used as a function).</li>
    <li>Apply latitude validation on thirdCountryLatitude field  based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLatitude must be a latitude format (Used as a string datatype).</li>
    <li>Apply latitude validation dynamically based on server rules.</li>
</ol>

Let's see how latitude decorator fulfil the need.

# Basic latitude Validation

<data-scope scope="['decorator']">
First we need to create a model and define a property of firstCountryLatitude in the model to achieve the functional need of point 1.
<div component="app-code" key="latitude-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="latitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latitude-add-html"></div> 
<div component="app-latitude-add" title="latitude Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="latitude-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="latitude-edit-html"></div> 
<div component="app-latitude-add" title="latitude Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="latitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latitude-add-html"></div> 
<div component="app-latitude-add" title="latitude Decorator for add Example"></div>
</data-scope>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@latitude()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" title="conditionalExpression">conditionalExpression</a></td><td>Latitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" title="message">message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

latitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="latitude-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="latitude-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="latitude-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="latitude-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-latitude-conditionalExpression" title="latitude decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="latitude-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-latitude-message" title="latitude decorators with message" key="message"></div>

# Complete latitude Example

This Complete Latitude example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-latitude-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="latitude-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="latitude-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="latitude-complete-html"></div> 
***

# Dynamic latitude Example

This Dynamic Latitude example which execute based on json passed. conditional expression with function would be not apply in dynamic latitude example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-latitude-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="latitude-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="latitude-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="latitude-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="latitude-dynamic-html"></div> 
***
