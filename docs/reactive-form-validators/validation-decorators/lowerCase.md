---
title: lowerCase 
description: lowerCase validation decorator will allow user to enter only the lowercase alphabets.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like Username, FirstName, LastName and you want the user to enter any string only in lowercase. Here depending upon the requirement these scenarios may arise.
<ol>
    <li>Allow only lowercase alphabets in Username.</li>
    <li>Apply lowerCase validation based on matched condition in the form, like if the Username is `jonathan.feldman`, then only the lowerCase validation will be applied to FirstName field.</li>
    <li>Adding Custom Message on LastName Field.</li>
    <li>Apply lowerCase validation dynamically based on server rules./li>
</ol>
Let’s see how lowerCase decorator fulfil the need.

# Basic LowerCase Validation

<data-scope scope="['decorator']">
First we need to create a User class and define a property of Username in the model to achieve the functional need of point 1.
<div component="app-code" key="lowerCase-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="lowerCase-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lowerCase-add-html"></div> 
<div component="app-example-runner" ref-component="app-lowerCase-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="lowerCase-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="lowerCase-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="lowerCase-edit-html"></div> 
<div component="app-example-runner" ref-component="app-lowerCase-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="lowerCase-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lowerCase-add-html"></div> 
<div component="app-example-runner" ref-component="app-lowerCase-add"></div>
</data-scope>

# MessageConfig 
Below options are not mandatory to use in the `@lowerCase()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="conditionalExpression">[conditionalExpression](#conditionalExpression)</a></td><td>LowerCase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a title="message">[message](#message)</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Lowercase validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="lowerCase-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="lowerCase-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-lowerCase-conditionalExpression" title="lowerCase decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="lowerCase-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-lowerCase-message" title="lowerCase decorators with message" key="message"></div>

# Complete lowerCase Example

This Complete lowerCase example which includes all the MessageConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>

[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-lowerCase-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="lowerCase-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="lowerCase-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="lowerCase-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic lowercase Example

This Dynamic lowercase example which execute based on json passed. conditional expression with function would be not apply in dynamic lowerCase example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-lowerCase-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="lowerCase-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="lowerCase-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="lowerCase-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="lowerCase-dynamic-html"></div> 
# [/Html]
***
</data-scope>
