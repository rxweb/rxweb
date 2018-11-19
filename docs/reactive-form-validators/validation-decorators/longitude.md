---
title: longitude
description: longitude validation decorator allows user to enter the input which is in the proper longitude format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a country form, which contains fields like continent, firstCountryLongitude, secondCountryLongitude and thirdCountryLongitude and you want the user to enter input which is a proper longitude format. Here depending upon the requirement, these scenarios may arise..
<ol>
  <li>Allow firstCountryLongitude which have proper longitude format and adding Custom Message on firstCountryLongitude.</li>
  <li>Apply longitude validation on secondCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the secondCountryLongitude must be a longitude format (Used as a function).</li>
  <li>Apply longitude validation on thirdCountryLongitude field based on matched condition in the form, like if the continent is 'Asia', then the thirdCountryLongitude must be a longitude format (Used as a string datatype).</li>
  <li>Apply longitude validation dynamically based on server rules.</li>
</ol>
Let's see how longitude decorator fulfil the need.

# Basic longitude Validation
<data-scope scope="['decorator']">
First we need to create a model and define a property of firstCountryLongitude in the model to achieve the functional need of point 1.
<div component="app-code" key="longitude-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="longitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-add-html"></div> 
<div component="app-longitude-add" title="longitude Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="longitude-edit-component"></div>
The below code is `number-info-data.json` for getting data from the server 
<div component="app-code" key="data-longitude"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-edit-html"></div> 
<div component="app-longitude-add" title="longitude Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="longitude-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="longitude-add-html"></div> 
<div component="app-longitude-add" title="longitude Decorator for add Example"></div>
</data-scope>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@longitude()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")'  title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>


## conditionalExpression 
Type :  `Function`  |  `string` 

longitude validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="longitude-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="longitude-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="longitude-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="longitude-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-longitude-conditionalExpression" title="longitude decorators with conditionalExpression" key="conditionalExpression"></div>
 

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="longitude-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-longitude-message" title="longitude decorators with message" key="message"></div>

# Complete longitude Example

This Complete longitude example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-longitude-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="longitude-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="longitude-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="longitude-complete-html"></div> 
***

# Dynamic longitude Example

This Dynamic longitude example which execute based on json passed. conditional expression with function would be not apply in dynamic longitude example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-longitude-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="longitude-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="longitude-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="longitude-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="longitude-dynamic-html"></div> 
***