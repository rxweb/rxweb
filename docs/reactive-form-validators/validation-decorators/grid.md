---
title: GRid  
description: GRid validation {{validatorType}}  will allow user to enter only the input in proper GRid format.The Global Release Identifier (GRid) is a system to identify releases of digital sound recordings (and other digital data) for electronic distribution.A GRid consists of 18 alphanumerical characters. 
author: rxcontributorone
category: form-validations
type:tabs
linktitle: grid
---
# When to use
Suppose you want to create a digital resource form, which contains fields like soundRecordingGrid, audioVisualRecordingGrid, photographGrid, graphicImageGrid and you want the user to enter only the proper Grid format. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow valid grid format in soundRecordingGrid field.</li>
    <li>Apply grid validation based on matched condition in the form, like if the soundRecordingGrid is `A12425GABC1234002M`, then only the audioVisualRecordingGrid field will be validated to grid validator(Used as a function).</li>
   <li>Apply grid validation based on matched condition in the form, like if the soundRecordingGrid is `A12425GABC1234002M`, then only the photographGrid field will be validated to grid validator(Used as a string datatype).</li>
    <li>Adding Custom Message on graphicImageGrid field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply grid validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how grid  {{validatorType}}  fulfil the need.

# Basic grid Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a digitalInfo class and define a property of soundRecordingGrid in the model to achieve the functional need of point 1.
<div component="app-code" key="grid-add-model"></div> 
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
<div component="app-code" key="grid-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="grid-add-html"></div> 
<div component="app-example-runner" ref-component="app-grid-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="grid-edit-component"></div> 
The below code is `digitalInfo-data.json` for getting data from the server
<div component="app-code" key="grid-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="grid-edit-html"></div> 
<div component="app-example-runner" ref-component="app-grid-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="grid-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="grid-add-html"></div> 
<div component="app-example-runner" ref-component="app-grid-add"></div>
</data-scope>

# gridConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@grid()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.grid()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `grid` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  title="conditionalExpression">conditionalExpression</a></td><td>grid validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

grid validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="grid-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="grid-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-grid-conditionalExpression" title="grid {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="grid-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-grid-message" title="grid {{validatorType}} with message" key="message"></div>

# Complete grid Example

This Complete grid example which includes all the gridConfig properties will fulfil the requirement of scenarios 1, 2, 3,4 and 5

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-grid-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="grid-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="grid-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="grid-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic grid Example

This Dynamic grid example which execute based on json passed. conditional expression with function would be not apply in dynamic grid example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-grid-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="grid-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="grid-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="grid-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="grid-dynamic-html"></div> 
# [/Html]
***
</data-scope>
