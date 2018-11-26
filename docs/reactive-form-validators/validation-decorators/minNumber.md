---
title: minNumber 
description: MinNumber validation decorator will allow user to enter the input greater than the minimum number value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a ResultInfo form, which contains fields like Maths, Science, Statistics and you want the user to enter number which should not be less than a minimum number. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow number greater than 35 in Maths field.</li>
	<li>Apply minNumber validation based on matched condition in the form, like if the input of Maths is 50, then only the minNumber validation will be applied to Statistics field.</li>
	<li>Adding Custom Message on Science Field.</li>
	<li>Apply minNumber validation dynamically based on server rules.</li>
</ol>
Let’s see how minNumber validator fulfil the need.

# Basic MinNumber Validation
<data-scope scope="['decorator']">
First we need to create a ResultInfo class and define a property of Maths in the model to achieve the functional need of point 1.
<div component="app-code" key="minNumber-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="minNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="minNumber-add-html"></div> 
<div component="app-example-runner" ref-component="app-minNumber-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="minNumber-edit-component"></div>
The below code is `result-info-data.json` for getting data from the server 
<div component="app-code" key="data-minNumber"></div> 
Next, we need to write html code.
<div component="app-code" key="minNumber-edit-html"></div> 
<div component="app-example-runner" ref-component="app-minNumber-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="minNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="minNumber-add-html"></div> 
<div component="app-example-runner" ref-component="app-minNumber-add"></div>
</data-scope>

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@minNumber()` decorator but value is mandatory. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>minNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
<tr><td><a href="#value" (click)='scrollTo("#value")' title="value">value</a></td> enter value which you want to restrict number in the property.</td></tr>

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="minNumber-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="minNumber-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-minNumber-conditionalExpression" title="minNumber decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="minNumber-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-minNumber-message" title="minNumber decorators with message" key="message"></div>

## value 
Type :  `number` 

enter value which you want to restrict number in the property

<div component="app-code" key="minNumber-valueExample-model"></div> 
<div component="app-example-runner" ref-component="minNumber-value-value" title="minNumber decorators with value" key="value"></div>

# Complete minNumber Example

This Complete minNumber example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-minNumber-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="minNumber-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="minNumber-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="minNumber-complete-html"></div> 
# [/Html]
***

# Dynamic minNumber Example

This Dynamic minNumber example which execute based on json passed. conditional expression with function would be not apply in dynamic minNumber example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-minNumber-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="minNumber-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="minNumber-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="minNumber-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="minNumber-dynamic-html"></div> 
# [/Html]
***