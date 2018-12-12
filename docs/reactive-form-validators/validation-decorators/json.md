---
title: json  
description: json validation  {{validatorType}}  will allow user to enter the input only in proper Json format.
author: rxcontributorone

---
# When to use
Suppose you want to create a location based jsonInfo form and you have fields like locationJson, location, AddressJson, ContactJson and you want the user to enter only Json value i.e in key and value form. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
  <li>Apply json validation on LocationJson field  without any conditional expression.</li>
  <li>Apply json validation based on matched condition in the form, like if the location is ‘India’ then the AddressJson value should be valid Json value.</li>
  <li>Adding Custom Message on ContactJson Field.</li>
  <data-scope scope="['decorator','validator']">
  <li>Apply json validation dynamically based on server rules.</li>
  </data-scope>
</ol>
Let’s see how json {{validatorType}} fulfil the need.

# Basic Json Validation
<data-scope scope="['decorator','template-driven']">
First we need to create location model class define a property of LocationJson in the model to achieve the functional need of point 1
<div component="app-code" class='showHideElement' key="json-add-model"></div> 
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
<div component="app-code" class='showHideElement' key="json-add-component"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="json-add-html"></div> 
<div component="app-example-runner" ref-component="app-json-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" class='showHideElement' key="json-edit-component"></div>
The below code is `json-info-data.json` for getting data from the server 
<div component="app-code" class='showHideElement' key="json-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="json-edit-html"></div> 
<div component="app-example-runner" ref-component="app-json-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" class='showHideElement' key="json-add-component"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="json-add-html"></div> 
<div component="app-example-runner" ref-component="app-json-add"></div>
</data-scope>

# DefaultConfig

<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@json()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.json()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `json` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression
Type :  `Function`  |  `string` 

json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" class='showHideElement' key="json-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" class='showHideElement' key="json-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-json-conditionalExpression" title="json {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

[<div component="app-code" class='showHideElement' key="json-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-json-message" title="json {{validatorType}} with message" key="message"></div>

# Complete Json Example

This Complete Json example which includes all the DefaultConfig properties will fulfil the requirement of scenarios 1, 2 and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-json-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven']">
# [Model](#tab\completemodel)
<div component="app-code" class='showHideElement' key="json-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" class='showHideElement' key="json-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" class='showHideElement' key="json-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Json Example

This Dynamic json example which execute based on json passed. conditional expression with function would be not apply in dynamic json example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-json-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" class='showHideElement' key="json-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" class='showHideElement' key="json-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" class='showHideElement' key="json-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" class='showHideElement' key="json-dynamic-html"></div> 
# [/Html]
***
</data-scope>
