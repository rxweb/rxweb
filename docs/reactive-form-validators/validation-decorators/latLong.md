---
title: latLong
description: latLong validation decorator allows user to enter the input which is valid Latitude or longitude.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountry, secondCountry and thirdCountry and you want the user to enter input which is a proper Latitude or longitude format. Here depending upon the requirement, these scenarios may arise..
<ol>
  <li>Allow firstCountry which have proper Latitude or longitude format and adding Custom Message on firstCountry.</li>
  <li>Apply latLong validation on secondCountry field based on matched condition in the form, like if the continent is 'Asia', then the secondCountry must be a Latitude or longitude format (Used as a function).</li>
  <li>Apply latLong validation on thirdCountry field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountry must be a Latitude or longitude format (Used as a string datatype).</li>
  <li>Apply latLong validation dynamically based on server rules.</li>
</ol>
Let's see how latLong decorator fulfil the need.

# Basic latLong Validation
<data-scope scope="['decorator']">
First we need to create a model and define a property of firstCountry in the model to achieve the functional need of point 1.
<div component="app-code" key="latLong-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="latLong-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latLong-add-html"></div> 
<div component="app-latLong-add" title="latLong Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="latLong-edit-component"></div>
The below code is `country-data.json` for getting data from the server 
<div component="app-code" key="data-latLong"></div> 
Next, we need to write html code.
<div component="app-code" key="latLong-edit-html"></div> 
<div component="app-latLong-add" title="latLong Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="latLong-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latLong-add-html"></div> 
<div component="app-latLong-add" title="latLong Decorator for add Example"></div>
</data-scope>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@latLong()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")'  title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>

## conditionalExpression 
Type :  `Function`  |  `string` 

latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="latLong-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="latLong-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="latLong-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="latLong-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-latLong-conditionalExpression" title="latLong decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[<div component="app-code" key="latLong-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-latLong-message" title="latLong decorators with message" key="message"></div>

# Complete latLong Example

This Complete latLong example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-latLong-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="latLong-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="latLong-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="latLong-complete-html"></div> 
***

# Dynamic latLong Example

This Dynamic latLong example which execute based on json passed. conditional expression with function would be not apply in dynamic latLong example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-latLong-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="latLong-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="latLong-dynamic-component"></div>
# [Json](#tab\dynamiclatLong)
<div component="app-code" key="latLong-dynamic-latLong"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="latLong-dynamic-html"></div> 
***
