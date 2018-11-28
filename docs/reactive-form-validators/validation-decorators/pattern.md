---
title: pattern 
description: Pattern validation decorator will allow user to enter the input which match the predefined pattern value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
<ol>
<li>Allow input which contains only Alphabet in Username.</li>
<li>Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).</li>
<li>Adding Custom Message on Zipcode Field.</li>
<li>Apply pattern validation dynamically based on server rules.</li>
</ol>
Let’s see how pattern validator fulfil the need.

# Basic Pattern Validation

<data-scope scope="['decorator']">
First we need to create a User class and define a property of UserName in the model to achieve the functional need of point 1.
<div component="app-code" key="pattern-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="pattern-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-add-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="pattern-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="pattern-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-edit-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="pattern-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-add-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-add"></div>
</data-scope>

# PatternConfig 
message,conditionalExpression options are not mandatory to use in the `@pattern()` decorator but pattern is mandatory. If required, then user can use these options accordingly:

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#pattern" (click)='scrollTo("#pattern")' title="pattern">pattern</a></td><td>enter specific regex pattern </td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="pattern-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-pattern-message" title="pattern decorators with message" key="message"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="pattern-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="pattern-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-pattern-conditionalExpression" title="pattern decorators with conditionalExpression" key="conditionalExpression"></div>

## pattern 
Type :  `string` 

enter specific regex pattern

<div component="app-code" key="pattern-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-pattern-message" title="pattern decorators with message" key="message"></div>

# Complete pattern Example

This Complete pattern example which includes all the PatternConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-pattern-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="pattern-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="pattern-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="pattern-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic pattern Example

This Dynamic pattern example which execute based on json passed. conditional expression with function would be not apply in dynamic pattern example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-pattern-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="pattern-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="pattern-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="pattern-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="pattern-dynamic-html"></div> 
# [/Html]
***
</data-scope>
