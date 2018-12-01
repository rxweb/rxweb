---
title: endsWith
description: endsWith validation  {{validatorType}}  allows user to enter the input which ends with particular value
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which endsWith fields like name, profession and taskId and you want the user to enter input which ends with a particular value. Here depending upon the requirement, these scenarios may arise..
<ol>
  <li>Apply validation on name field in which you want the user to enter value which ends with ‘m’.</li>
  <li>Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the profession must ends with 'R' (Used as a string datatype).</li>
  <li>Apply endsWith validation based on matched condition in the form, like if the name is 'Adam', then the taskId must ends with '1' (Used as a function).</li>
  <data-scope scope="['decorator','validator']">
  <li>Apply endsWith validation dynamically based on server rules.</li>
  </data-scope>
</ol>
Let's see how endsWith  {{validatorType}}  fulfil the need.

# Basic EndsWith Validation
<data-scope scope="['decorator']">
First we need to create a User model and define a property of name in the model to achieve the functional need of point 1.
<div component="app-code" key="endsWith-add-model"></div> 
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
<div component="app-code" key="endsWith-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="endsWith-add-html"></div> 
<div component="app-example-runner" ref-component="app-endsWith-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="endsWith-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="endsWith-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="endsWith-edit-html"></div> 
<div component="app-example-runner" ref-component="app-endsWith-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="endsWith-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="endsWith-add-html"></div> 
<div component="app-example-runner" ref-component="app-endsWith-add"></div>
</data-scope>

# DefaultConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@endsWith()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.endsWith()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `endsWith` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#value")'   title="value">value</a></td><td>This is substring value.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")'   title="conditionalExpression">conditionalExpression</a></td><td>endsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## value
Type :  `string` 

This is substring value.

<div component="app-code" key="endsWith-valueExample-model"></div> 
<div component="app-example-runner" ref-component="app-endsWith-value" title="endsWith decorators with value" key="value"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

EndsWith validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="endsWith-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="endsWith-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-endsWith-conditionalExpression" title="endsWith decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="endsWith-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-endsWith-message" title="endsWith decorators with message" key="message"></div>

# Complete endsWith Example

This Complete endsWith example which includes all the DefaultConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-endsWith-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="endsWith-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="endsWith-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="endsWith-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic endsWith Example

This Dynamic endsWith example which execute based on json passed. conditional expression with function would be not apply in dynamic endsWith example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-endsWith-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="endsWith-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="endsWith-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="endsWith-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="endsWith-dynamic-html"></div> 
# [/Html]
***
</data-scope>
