---
title: time 
description: time validation  {{validatorType}}  will allow user to enter the input only in the correct time format.
author: rxcontributorone

---
# When to use
Suppose you want to create a AttendanceDetail form, which contains field of EntryPlace, EntryTime, TotalTimeOut and Exit Time you want the user to enter valid time. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
<li>Allow time in EntryTime without seconds.</li>
<li>Allowing seconds in TotalTimeOut.</li>
<li>Apply time validation based on matched condition in the form, like if the EntryPlace is ‘Lunch room’ then the EntryTime value should be in proper format of time .</li>
<li>Adding Custom Message on exitTime Field.</li>
<data-scope scope="['decorator','validator']">
<li>Apply time validation dynamically based on server rules.</li>
</data-scope>
</ol>
Let’s see how time {{validatorType}} fulfil the need.

# Basic time Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a AttendanceDetail class and define a property of EntryTime in the model to achieve the functional need of point 1.
<div component="app-code" key="time-add-model"></div> 
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
<div component="app-code" key="time-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="time-add-html"></div> 
<div component="app-example-runner" ref-component="app-time-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="time-edit-component"></div> 
The below code is `attendance-data.json` for getting data from the server
<div component="app-code" key="time-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="time-edit-html"></div> 
<div component="app-example-runner" ref-component="app-time-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="time-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="time-add-html"></div> 
<div component="app-example-runner" ref-component="app-time-add"></div>
</data-scope>

# TimeConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@time()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.time()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `time` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
<tr><td><a (click)='scrollTo("#allowseconds")' title="allowseconds">allowseconds</a></td><td>If you are allowed seconds in time format then you need to put this as true.</td></tr>
</table >

## conditionalExpression 
Type :  `Function`  |  `string` 
time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="time-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="time-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-time-conditionalExpression" title="time {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## allowSeconds 
Type :  `boolean` 
If you are allowed seconds in time format then you need to put this as true.

<div component="app-code" key="time-allowSecondsExample-model"></div> 
<div component="app-example-runner" ref-component="app-time-allowSeconds" title="time {{validatorType}} with allowSeconds" key="allowSeconds"></div>

## message 
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="time-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-time-message" title="time {{validatorType}} with message" key="message"></div>

# Complete time Example

This Complete time example which includes all the TimeConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-time-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="time-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="time-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="time-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic time Example

This Dynamic time example which execute based on json passed. conditional expression with function would be not apply in dynamic time example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-time-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="time-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="time-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="time-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="time-dynamic-html"></div> 
# [/Html]
***
</data-scope>
