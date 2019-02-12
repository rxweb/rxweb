---
title: date
description: Date validation {{validatorType}} will allow user to enter input which is only in the proper date format. 
author: rxcontributortwo
category: form-validations
type:tabs
linktitle: date
---

# When to use
Suppose you want to create a UserInfo form, which contains fields like BirthDate, AdmissionDate, EnrollmentDate, and AllocationDate, and you want the user to enter only date input. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow user to enter only date input in `BirthDate`.</li>
    <li>Apply date validation based on matched condition in the form, like if the BirthDate is `'16/04/1997'` then the AdmissionDate value should be in a date format (conditional validation with function).</li>
    <li>Apply date validation based on matched condition in the form, like if the BirthDate is `'16/04/1997'` then the EnrollmentDate value should be in a date format (conditional validation with string).</li>
    <li>Apply custom message on AllocationDate Field.</li>
    	<data-scope scope="['decorator','validator']">
		<li>Apply date validation dynamically based on server rules. </li>
	</data-scope>
</ol>
Let's see how date {{validatorType}} fulfil the need.

To Configure Date format globally in your application, Please refer <a href="/api/reactive-form-config">`ReactiveFormConfig`</a>
 
# Basic Date Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a UserInfo class and define a property of BirthDate in the model to achieve the functional need of point 1.
<div component="app-code" key="date-add-model"></div> 
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
<div component="app-code" key="date-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="date-add-html"></div> 
<div component="app-example-runner" ref-component="app-date-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="date-edit-component"></div> 
The below code is `date-info-data.json` for getting data from the server
<div component="app-code" key="date-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="date-edit-html"></div> 
<div component="app-example-runner" ref-component="app-date-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="date-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="date-add-html"></div> 
<div component="app-example-runner" ref-component="app-date-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@date()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.date()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `date` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a   (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Date validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Date validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object. 
<div component="app-code" key="date-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="date-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-date-conditionalExpression" title="date {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="date-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-date-message" title="date {{validatorType}} with message" key="message"></div>

# Complete Date Example

This Complete Date example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-date-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="date-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="date-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="date-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Date Example

This Dynamic Date example which execute based on json passed. conditional expression with function would be not apply in dynamic date example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-date-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="date-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="date-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="date-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="date-dynamic-html"></div> 
# [/Html]
***
</data-scope>
