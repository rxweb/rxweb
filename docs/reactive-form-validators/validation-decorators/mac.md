---
title: mac
description: mac validation  {{validatorType}}  will check whether the value entered is a valid mac address.
author: rxcontributorone

---
# When to use
Suppose you want to create a form in which you want user to enter mac address  which contains fields like device, macAddress, systemMacAddress. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
	<li>The macAddress on which validation is checked.</li>
    <li>Apply mac validation based on matched condition in the form, like if the device  is ‘Laptop’ then the macAddress value should be in proper format.</li>
    <li>The Custom Message on systemMacAddress field.</li>
    <data-scope scope="['decorator','validator']">
	<li>Apply mac validation dynamically based on server rules.</li>
    </data-scope>
</ol>
Let’s see how mac {{validatorType}} fulfil the need.

# Basic mac Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User Model class and define property of mac and systemMacAddress in the model to achieve the functional need of point 1.
<div component="app-code" key="mac-add-model"></div> 
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
<div component="app-code" key="mac-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="mac-add-html"></div> 
<div component="app-example-runner" ref-component="app-mac-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="mac-edit-component"></div>
The below code is `mac-address-info-data.json` for getting data from the server 
<div component="app-code" key="mac-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="mac-edit-html"></div> 
<div component="app-example-runner" ref-component="app-mac-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="mac-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="mac-add-html"></div> 
<div component="app-example-runner" ref-component="app-mac-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@mac()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.mac()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `mac` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a   (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Mac validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

mac validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="mac-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="mac-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-mac-conditionalExpression" title="mac {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="mac-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-mac-message" title="mac {{validatorType}} with message" key="message"></div>

# Complete mac Example

This Complete mac example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-mac-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="mac-complete-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="mac-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="mac-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic mac Example

This Dynamic mac example which execute based on json passed. conditional expression with function would be not apply in dynamic mac example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-mac-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="mac-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="mac-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="mac-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="mac-dynamic-html"></div> 
# [/Html]
***
</data-scope>
