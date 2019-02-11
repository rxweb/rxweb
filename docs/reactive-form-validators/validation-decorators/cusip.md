---
title: cusip
description: CUSIP validation {{validatorType}} will allow user to enter only nine-character alpha-numeric cusip code. CUSIP numbers are used to identify North-American finantial securities.
author: rxcontributortwo
category: form-validations
type:tabs
linktitle: cusip
---

# When to use
Suppose you want to create a CompanyInfo form, which contains fields like CompanyName, OracleCorporationCusipCode, GoogleIncCusipCode, MicrosoftCorporationCusipCode and AppleIncCusipCode, and you want the user to enter only CUSIP code. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow user to enter only cusip code in `OracleCorporationCusipCode`.</li>
    <li>Apply cusip validation based on matched condition in the form, like if the `CompanyName` is `Google` then the `GoogleIncCusipCode` value should be a cusip code (conditional validation with function).</li>
    <li>Apply cusip validation based on matched condition in the form, like if the `CompanyName` is `Microsoft` then the `MicrosoftCorporationCusipCode` value should be a cusip code (conditional validation with string).</li>
    <li>Apply custom message on `AppleIncCusipCode` Field.</li>
    	<data-scope scope="['decorator','validator']">
		<li>Apply cusip validation dynamically based on server rules. </li>
	</data-scope>
</ol>
Let's see how cusip {{validatorType}} fulfil the need.
 
# Basic Cusip Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a CompanyInfo class and define a property of OracleCorporationCusipCode in the model to achieve the functional need of point 1.
<div component="app-code" key="cusip-add-model"></div> 
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
<div component="app-code" key="cusip-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="cusip-add-html"></div> 
<div component="app-example-runner" ref-component="app-cusip-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="cusip-edit-component"></div> 
The below code is `company-info-data.json` for getting data from the server
<div component="app-code" key="cusip-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="cusip-edit-html"></div> 
<div component="app-example-runner" ref-component="app-cusip-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="cusip-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="cusip-add-html"></div> 
<div component="app-example-runner" ref-component="app-cusip-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@cusip()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.cusip()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `cusip` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a   (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Cusip validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Cusip validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object. 
<div component="app-code" key="cusip-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="cusip-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-cusip-conditionalExpression" title="cusip {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="cusip-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-cusip-message" title="cusip {{validatorType}} with message" key="message"></div>

# Complete Cusip Example

This Complete Cusip example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-cusip-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="cusip-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="cusip-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="cusip-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Cusip Example

This Dynamic Cusip example which execute based on json passed. conditional expression with function would be not apply in dynamic cusip example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-cusip-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="cusip-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="cusip-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="cusip-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="cusip-dynamic-html"></div> 
# [/Html]
***
</data-scope>
