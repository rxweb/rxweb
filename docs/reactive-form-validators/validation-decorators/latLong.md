---
title: latLong
description: latLong validation  {{validatorType}}  allows user to enter the input which is valid Latitude or longitude.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountry, secondCountry and thirdCountry and you want the user to enter input which is a proper Latitude or longitude format. Here depending upon the requirement, these scenarios may arise..
<ol class='showHideElement'>
  <li>Allow firstCountry which have proper Latitude or longitude format and adding Custom Message on firstCountry.</li>
  <li>Apply latLong validation on secondCountry field based on matched condition in the form, like if the continent is 'Asia', then the secondCountry must be a Latitude or longitude format (Used as a function).</li>
  <li>Apply latLong validation on thirdCountry field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountry must be a Latitude or longitude format (Used as a string datatype).</li>
  <data-scope scope="['decorator','validator']">
  <li>Apply latLong validation dynamically based on server rules.</li>
  </data-scope>
</ol>
Let's see how latLong  {{validatorType}}  fulfil the need.

# Basic latLong Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a model and define a property of firstCountry in the model to achieve the functional need of point 1.
<div component="app-code" key="latLong-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
<data-scope scope="['decorator']">
Here we have covered Add and Edit form operations. 
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
Here we have covered Add form operations. 
</data-scope>

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="latLong-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latLong-add-html"></div> 
<div component="app-example-runner" ref-component="app-latLong-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="latLong-edit-component"></div>
The below code is `country-data.json` for getting data from the server 
<div component="app-code" key="latLong-edit-json"></div>  
Next, we need to write html code.
<div component="app-code" key="latLong-edit-html"></div> 
<div component="app-example-runner" ref-component="app-latLong-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="latLong-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="latLong-add-html"></div> 
<div component="app-example-runner" ref-component="app-latLong-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@latLong()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.latLong()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `latLong` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>LatLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

latLong validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="latLong-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="latLong-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-latLong-conditionalExpression" title="latLong {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

[<div component="app-code" key="latLong-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-latLong-message" title="latLong {{validatorType}} with message" key="message"></div>

# Complete latLong Example

This Complete latLong example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-latLong-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="latLong-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="latLong-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="latLong-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic latLong Example

This Dynamic latLong example which execute based on json passed. conditional expression with function would be not apply in dynamic latLong example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-latLong-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="latLong-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="latLong-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamiclatLong)
<div component="app-code" key="latLong-dynamic-latLong"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="latLong-dynamic-html"></div> 
# [/Html]
***
</data-scope>
