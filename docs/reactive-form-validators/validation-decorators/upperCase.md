---
title: upperCase 
description: UpperCase validation decorator will allow user to enter the alphabets only in the upperCase format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a Location form, which contains fields like CountryName, StateName, CityName and you want the user to must enter string only in the Upper case. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
    <li>Apply upperCase validation in the CountryName without any condition.</li>
    <li>Apply upperCase validation based on matched condition in the form, like if the CountryName is `INDIA`, then only the upperCase validation will be applied to StateName field.</li>
	<li>Adding Custom Message on CityName Field.</li>
    <data-scope scope="['decorator','validator']">
	<li>Apply upperCase validation dynamically based on server rules.</li>
    </data-scope>
</ol>
Let’s see how upperCase {{validatorType}} fulfil the need.

# Basic UpperCase Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a Location class and define a property of CountryName in the model to achieve the functional need of point 1.
<div component="app-code" key="upperCase-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="upperCase-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="upperCase-add-html"></div> 
<div component="app-example-runner" ref-component="app-upperCase-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="upperCase-edit-component"></div>
The below code is `location-data.json` for getting data from the server 
<div component="app-code" key="upperCase-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="upperCase-edit-html"></div> 
<div component="app-example-runner" ref-component="app-upperCase-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="upperCase-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="upperCase-add-html"></div> 
<div component="app-example-runner" ref-component="app-upperCase-add"></div>
</data-scope>
 
# MessageConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@upperCase()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.upperCase()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `upperCase` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>upperCase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Uppercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="upperCase-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="upperCase-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-upperCase-conditionalExpression" title="upperCase {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>
 
## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.
 
<div component="app-code" key="upperCase-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-upperCase-message" title="upperCase {{validatorType}} with message" key="message"></div>

# Complete upperCase Example

This Complete upperCase example which includes all the MessageConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-upperCase-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="upperCase-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="upperCase-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="upperCase-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic upperCase Example

This Dynamic upperCase example which execute based on json passed. conditional expression with function would be not apply in dynamic upperCase example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-upperCase-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="upperCase-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="upperCase-dynamic-json"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="upperCase-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="upperCase-dynamic-html"></div> 
# [/Html]
***
</data-scope>
