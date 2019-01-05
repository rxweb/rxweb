---
title: ip
description: ip validation {{validatorType}} is used to validate the ip address of the device.
author: rxcontributortwo
category: form-validations
type:tabs
linktitle: ip
---

# When to use
Suppose you want to create a User form, which contains fields like ipType,ipV4, ipV6, anyIPType, ipV4Cidr, ipV6Cidr, ipV6Conditional, ipV4Message and you want the user to enter only ip address. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
	<li>Allow only ip addresses in ipV4 field based on version.</li>
    <li>Allow only ip addresses in ipV6 field based on version.</li>
    <li>Allow only ip addresses in ipV4Cidr field based on CIDR.</li>
    <li>Allow only ip addresses in ipV6Cidr field based on CIDR.</li>
	<li>Apply ip validation based on matched condition in the form, like if the ipType is 'V6' then the ipV6Conditional value should be in ip address format only.</li>
		<li>Apply ip validation based on matched condition in the form, like if the ipType is 'V4' then the ipV4Conditional value should be in ip address format only.</li>
	<li>Adding custom message in ipV4Message field.</li>
	<data-scope scope="['decorator','validator']">
		<li>Apply ip validation dynamically based on server rules. </li>
	</data-scope>
</ol>

# Basic Ip Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a ipAddressInfo class and define a property of ipV4 in the model to achieve the functional need of point 1.
<div component="app-code" key="ip-add-model"></div> 
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
<div component="app-code" key="ip-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="ip-add-html"></div> 
<div component="app-example-runner" ref-component="app-ip-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="ip-edit-component"></div> 
The below code is `ipAddressData-data.json` for getting data from the server
<div component="app-code" key="ip-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="ip-edit-html"></div> 
<div component="app-example-runner" ref-component="app-ip-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="ip-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="ip-add-html"></div> 
<div component="app-example-runner" ref-component="app-ip-add"></div>
</data-scope>

# IpConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@ip()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.ip()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `ip` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#version")' title="version">version</a></td><td>Version option is used to define the version of ip address.</td></tr>
<tr><td><a (click)='scrollTo("#isCidr")' title="isCidr">isCidr</a></td><td>isCidr option of ip validation is used to check whether the ip address is in CIDR notation or not.</td></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Ip validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## version
Type : `IpVersion`

Version option is used to define the version of ip address.

<div component="app-code" key="ip-versionExample-model"></div> 
<div component="app-example-runner" ref-component="app-ip-version" title="ip {{validatorType}} with version" key="version"></div>

## isCidr
Type : `boolean`

isCidr option of ip validation is used to check whether the ip address is in CIDR notation or not.

<div component="app-code" key="ip-isCidrExample-model"></div> 
<div component="app-example-runner" ref-component="app-ip-isCidr" title="ip {{validatorType}} with isCidr" key="isCidr"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Ip validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="ip-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="ip-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-ip-conditionalExpression" title="ip {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="ip-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-ip-message" title="ip {{validatorType}} with message" key="message"></div>

# Complete Ip Example

This Complete Ip example which includes all the IpConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-ip-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="ip-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="ip-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="ip-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Ip Example

This Dynamic Ip example which execute based on json passed. conditional expression with function would be not apply in dynamic ip example. 

<div component="app-tabs" key="dynamic"></div>
[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-ip-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="ip-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="ip-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="ip-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="ip-dynamic-html"></div> 
# [/Html]
***
</data-scope>
