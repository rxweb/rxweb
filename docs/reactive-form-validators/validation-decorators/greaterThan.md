---
title: greaterThan
description: Greater than validation  {{validatorType}}  will check that input property is greater than related field input.
author: rxcontributortwo

---
#  When to use
Suppose you want to create a User form, which contains fields like Age, VoterAge, OtherAge and you want the user to enter the numbers which are greater than a related field. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
<li>Allow numbers which are greater than a perticular field like in VoterAge.</li>
<li>Apply greaterThan validation based on matched condition in the form, like if the Age is greater than    17, then only the greater than validation will be applied to VoterAge field.</li>
<li>Adding Custom Message on OtherAge Field.</li>
<data-scope scope="['decorator','validator']">
<li>Apply greaterThan validation dynamically based on server rules.</li>
</data-scope>
</ol>
Let’s see how greaterThan {{validatorType}} fulfil the need.

# Basic GreaterThan Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User class and define a property of Age and VoterAge with the requirement of VoterAge must be greater than Age field in the model to achieve the functional need of point 1.
<div component="app-code" key="greaterThan-add-model"></div> 
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
<div component="app-code" key="greaterThan-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThan-add-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThan-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="greaterThan-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="greaterThan-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThan-edit-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThan-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="greaterThan-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="greaterThan-add-html"></div> 
<div component="app-example-runner" ref-component="app-greaterThan-add"></div>
</data-scope>

# RelationalOperatorConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@greaterThan()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.greaterThan()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `greaterThan` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#fieldname")' title="fieldname">fieldname</a></td><td>Greater than validation should be applied based on the `fieldName` for compare other field value</td></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>GreaterThan validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## fieldName 
Type :  `string` 

Greater than validation should be applied based on the `fieldName` for compare other field value 

<div component="app-code" key="greaterThan-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-greaterThan-fieldName" title="greaterThan {{validatorType}} with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

GreaterThan validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="greaterThan-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="greaterThan-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-greaterThan-conditionalExpression" title="greaterThan {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="greaterThan-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-greaterThan-message" title="greaterThan {{validatorType}} with message" key="message"></div>

# Complete greaterThan Example

This Complete greaterThan example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2, and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-greaterThan-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="greaterThan-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="greaterThan-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="greaterThan-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic greaterThan Example

This Dynamic GreaterThan example which execute based on json passed. conditional expression with function would be not apply in dynamic greaterThan example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-greaterThan-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="greaterThan-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="greaterThan-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="greaterThan-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="greaterThan-dynamic-html"></div> 
# [/Html]
***
</data-scope>
