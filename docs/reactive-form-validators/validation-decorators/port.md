---
title: port
description: port validation  {{validatorType}}  allows user to enter the input which is a valid port number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a websiteInfo form, which contains fields like browser, educationalWebsitePort, entertainmentWebsitePort and shoppingWebsitePort and you want the user to enter input which is a proper port number. Here depending upon the requirement, these scenarios may arise..
<ol>
 <li>Allow educationalWebsitePort which have proper port format and adding Custom Message on educationalWebsitePort.</li>
 <li>Apply port validation on entertainmentWebsitePort field based on matched condition in the form, like if the browser is 'Chrome', then the entertainmentWebsitePort must be a port number (Used as a function).</li>
 <li>Apply port validation on shoppingWebsitePort field based on matched condition in the form, like if the browser is 'Chrome', then the    shoppingWebsitePort must be a port number (Used as a string datatype).</li>
 <data-scope scope="['decorator','validator']">
 <li>Apply port validation dynamically based on server rules.</li>
 </data-scope>
</ol>
Let's see how port  {{validatorType}}  fulfil the need.

# Basic port Validation
<data-scope scope="['decorator','template-driven']">
First we need to create a model and define a property of educationalWebsitePort in the model to achieve the functional need of point 1.
<div component="app-code" key="port-add-model"></div> 
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
<div component="app-code" key="port-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="port-add-html"></div> 
<div component="app-example-runner" ref-component="app-port-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="port-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="port-edit-json"></div>  
Next, we need to write html code.
<div component="app-code" key="port-edit-html"></div> 
<div component="app-example-runner" ref-component="app-port-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="port-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="port-add-html"></div> 
<div component="app-example-runner" ref-component="app-port-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@port()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.port()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `port` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>port validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

port validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="port-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="port-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-port-conditionalExpression" title="port {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="port-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-port-message" title="port {{validatorType}} with message" key="message"></div>

# Complete Port Example

This Complete Port example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1 ,2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-port-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven']">
# [Model](#tab\completemodel)
<div component="app-code" key="port-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="port-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="port-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Port Example

This Dynamic port example which execute based on json passed. conditional expression with function would be not apply in dynamic port example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-port-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="port-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="port-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="port-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="port-dynamic-html"></div> 
# [/Html]
***
</data-scope>
