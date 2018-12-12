---
title: longitude
description: longitude validation  {{validatorType}}  allows user to enter the input which is in the proper longitude format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLongitude, secondCountryLongitude and thirdCountryLongitude and you want the user to enter input which is a proper longitude format. Here depending upon the requirement, these scenarios may arise..
<ol class='showHideElement'>
  <li>Allow firstCountryLongitude which have proper longitude format and adding Custom Message on firstCountryLongitude.</li>
  <li>Apply longitude validation on secondCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLongitude must be a longitude format (Used as a function).</li>
  <li>Apply longitude validation on thirdCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLongitude must be a longitude format (Used as a string datatype).</li>
  <data-scope scope="['decorator','validator']">
  <li>Apply longitude validation dynamically based on server rules.</li>
  </data-scope>
</ol>
Let's see how longitude  {{validatorType}}  fulfil the need.

# Basic longitude Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a model and define a property of firstCountryLongitude in the model to achieve the functional need of point 1.
<div component="app-code" key="longitude-add-model"></div> 
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
<div component="app-code" key="longitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-add-html"></div> 
<div component="app-example-runner" ref-component="app-longitude-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="longitude-edit-component"></div>
The below code is `number-info-data.json` for getting data from the server 
<div component="app-code" key="longitude-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-edit-html"></div> 
<div component="app-example-runner" ref-component="app-longitude-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="longitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-add-html"></div> 
<div component="app-example-runner" ref-component="app-longitude-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@longitude()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.longitude()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `longitude` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>Longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="longitude-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="longitude-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-longitude-conditionalExpression" title="longitude {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>
 

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="longitude-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-longitude-message" title="longitude {{validatorType}} with message" key="message"></div>

# Complete longitude Example

This Complete longitude example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-longitude-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="longitude-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="longitude-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="longitude-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic longitude Example

This Dynamic longitude example which execute based on json passed. conditional expression with function would be not apply in dynamic longitude example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-longitude-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="longitude-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="longitude-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="longitude-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="longitude-dynamic-html"></div> 
# [/Html]
***
</data-scope>
