---
title: noneOf
description: noneOf validation decorator will check whether the user has entered none of the value is selected from the given inputs.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a employee form in which you want employee to enter none of the value of a particular value which contains fields like department, hobbies and skills.Here the field is taken in the form of array and according to that the choice is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>The skills field in which you want the user to enter skills based upon matchvalues.</li>
    <li>Apply noneOf validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.</li>
    <li>The Custom Message on Hobbies field.</li>
 	<li>Apply noneOf validation dynamically based on server rules.</li>
</ol>
Let’s see how noneOf validator fulfil the need.

# Basic noneOf Validation
<data-scope scope="['decorator']">
First we need to create a employee Model class and define property of hobbies in the model to achieve the functional need of point 1.
<div component="app-code" key="noneOf-add-model"></div> 
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
<div component="app-code" key="noneOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="noneOf-add-html"></div> 
<div component="app-example-runner" ref-component="app-noneOf-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="noneOf-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="noneOf-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="noneOf-edit-html"></div> 
<div component="app-example-runner" ref-component="app-noneOf-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="noneOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="noneOf-add-html"></div> 
<div component="app-example-runner" ref-component="app-noneOf-add"></div>
</data-scope>

# ArrayConfig
Below options are not mandatory to use in the `@noneOf()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="matchValue" (click)='scrollTo("#matchValue")' title="matchValue">matchValue</a></td>  matchValue is the array based on which the value is matched for validation. According to it none of the values in the array should be matched.</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>noneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## matchValue 
Type :  `any[]` 

matchValue is the array based on which the value is matched for validation. According to it none of the values in the array should be matched

<div component="app-code" key="noneOf-matchValueExample-model"></div> 
<div component="app-example-runner" ref-component="noneOf-matchValue-value" title="matchValue decorators with value" key="matchValue"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

noneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="noneOf-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="noneOf-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-noneOf-conditionalExpression" title="noneOf decorators with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="noneOf-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-noneOf-message" title="noneOf decorators with message" key="message"></div>

# Complete noneOf Example

This Complete noneOf example which includes all the ArrayConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-noneOf-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="noneOf-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="noneOf-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="noneOf-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic noneOf Example

This Dynamic noneOf example which execute based on json passed. conditional expression with function would be not apply in dynamic noneOf example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-noneOf-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="noneOf-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="noneOf-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="noneOf-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="noneOf-dynamic-html"></div> 
# [/Html]
***
</data-scope>
