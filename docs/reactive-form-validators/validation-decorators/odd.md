---
title: odd
description: Odd validation decorator will check whether the value entered is an odd number or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form, which contains fields like Number, Type, OddNumber and you want the user to enter only odd numbers Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow only odd numbers in oddNumber’s field.</li>
	<li>Apply Odd validation based on matched condition in the form, like if the type  is ‘Odd’ then the number value should be odd number.</li>
	<li>Adding Custom Message on OddNumber Field.</li>
	<li>Apply odd validation dynamically based on server rules.</li>
</ol>
Let’s see how Odd validator fulfil the need.

# Basic Odd Validation
<data-scope scope="['decorator']">
First we need to create a User class and define a property of odd in the model to achieve the functional need of point 1.
<div component="app-code" key="odd-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="odd-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="odd-add-html"></div> 
<div component="app-odd-add" title="odd Decorator for add Example"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="odd-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="odd-edit-json"></div>  
Next, we need to write html code.
<div component="app-code" key="odd-edit-html"></div> 
<div component="app-odd-add" title="odd Decorator for edit Example"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="odd-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="odd-add-html"></div> 
<div component="app-odd-add" title="odd Decorator for add Example"></div>
</data-scope>

# BaseConfig
Below options are not mandatory to use in the `@odd()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>odd validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Odd validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="odd-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="odd-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-odd-conditionalExpression" title="odd decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="odd-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-odd-message" title="odd decorators with message" key="message"></div>

# Complete Odd Example

This Complete Odd example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-odd-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="odd-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="odd-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="odd-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Odd Example

This Dynamic odd example which execute based on json passed. conditional expression with function would be not apply in dynamic odd example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-odd-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="odd-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="odd-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="odd-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="odd-dynamic-html"></div> 
# [/Html]
***
</data-scope>