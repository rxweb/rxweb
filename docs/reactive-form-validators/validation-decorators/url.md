---
title: url 
description: Url validation  {{validatorType}}  will check that value entered in the property is in the correct url format or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a website-info form, which contains fields like AdminWebsiteUrl, CustomerWebsiteUrl, MaintenanceWebsiteUrl and you want the user to enter valid url. Here depending upon the requirement these scenarios may arise.
<ol>
   <li>Adding AdminWebsiteUrl without any conditional expression.</li>
   <li>Apply url validation based on matched condition in the form, like if the adminWebsiteUrl is ‘https://google.co.in’ then the              customerWebsiteUrl value should be in proper format of url.</li>
   <li>Adding Custom Message on MaintenanceWebsiteUrl Field.</li>
   <li>Apply url validation dynamically based on server rules.</li>
</ol>
Let’s see how url validator fulfil the need.

# Basic url Validation
<data-scope scope="['decorator']">
First we need to create a User class and define a property of AdminWebsiteUrl in the model to achieve the functional need of point 1.
<div component="app-code" key="url-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="url-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="url-add-html"></div> 
<div component="app-example-runner" ref-component="app-url-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="url-edit-component"></div>
The below code is `web-site-info-model-data.json` for getting data from the server 
<div component="app-code" key="url-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="url-edit-html"></div> 
<div component="app-example-runner" ref-component="app-url-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="url-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="url-add-html"></div> 
<div component="app-example-runner" ref-component="app-url-add"></div>
</data-scope>

# DefaultConfig
Below options are not mandatory to use in the `@url()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="url-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="url-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-url-conditionalExpression" title="url decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="url-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-url-message" title="url decorators with message" key="message"></div>

# Complete url Example

This Complete url example which includes all the DefaultConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-url-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="url-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="url-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="url-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic url Example

This Dynamic url example which execute based on json passed. conditional expression with function would be not apply in dynamic url example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-url-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="url-dynamic-model"></div>
# [#Model]
# [/Component]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="url-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="url-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="url-dynamic-html"></div> 
# [/Html]
***
</data-scope>