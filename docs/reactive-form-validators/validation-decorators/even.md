---
title: even 
description: Even validation  {{validatorType}}  will check whether the value entered by user is an even number or not.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form, which contains fields like Number, Type, EvenNumber and you want the user to enter only even numbers Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow only evennumbers in EvenNumber’s field .</li>
    <li>Apply Even validation based on matched condition in the form, like if the type  is ‘Even’ then the number value should be even number.</li>
    <li>Adding Custom Message on EvenNumber Field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply even validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how Even  {{validatorType}}  fulfil the need.

# Basic Even Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create  User class and define a property of even in the model to achieve the functional need of point 1.
<div component="app-code" key="even-add-model"></div> 
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
<div component="app-code" key="even-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="even-add-html"></div> 
<div component="app-example-runner" ref-component="app-even-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="even-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="even-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="even-edit-html"></div> 
<div component="app-example-runner" ref-component="app-even-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="even-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="even-add-html"></div> 
<div component="app-example-runner" ref-component="app-even-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@even()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.even()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `even` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Even validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Even validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="even-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="even-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-even-conditionalExpression" title="even {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="even-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-even-message" title="even {{validatorType}} with message" key="message"></div>

# Complete even Example

This Complete even example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-even-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="even-complete-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="even-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="even-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic even Example

This Dynamic Even example which execute based on json passed. conditional expression with function would be not apply in dynamic even example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-even-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="even-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="even-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="even-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="even-dynamic-html"></div> 
# [/Html]
***
</data-scope>
