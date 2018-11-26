---
title: compose
description: Compose validation decorator is used to apply multiple validations on a particular field.
author: rxcontributortwo

---
# When to use
Suppose you want to create UserInfo form, which contains fields like firstName, lastName, age, emailId and you want to apply multiple validations on these fields. Here depending upon the requirement these scenarios may arise.
<ol>
    <li>Apply required and alpha validation on firstName field.</li>
    <li>Apply required, alpha and different validation on lastName field.</li>
    <li>Apply digit, maxNumber and minNumber validation on age field based on matched condition in the form, like if the firstName is 'Bharat', then only the age must be validated.</li>
    <li>Apply required, email and maxLength validation based on matched condition in the form, like if the firstName is 'Bharat', then only the emailId must be validated.</li>
    <li>Apply compose validation dynamically based on server rules.</li>
</ol>

Let’s see how compose decorator fulfil the need.

# Basic Compose Validation
<data-scope scope="['decorator']">
First we need to create a UserInfo class and define a property of firstName in the model to achieve the functional need of point 1.
<div component="app-code" key="compose-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="compose-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="compose-add-html"></div> 
<div component="app-example-runner" ref-component="app-compose-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="compose-edit-component"></div> 
The below code is `userInfo-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="compose-edit-html"></div> 
<div component="app-example-runner" ref-component="app-compose-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="compose-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="compose-add-html"></div> 
<div component="app-example-runner" ref-component="app-compose-add"></div>
</data-scope>

# ComposeConfig
conditionalExpression is not mandatory to use in the `@compose()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#validators" (click)='scrollTo("#validators")' title="validators">validators</a></td><td>It is an array of rxwebValidators. Validators are set according to the relative requirement based on which validation you want to apply. Here you have to specify the name of validator which you want to use.</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Compose validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
</table>

## validators
Type :  `ValidatorFn[]`

It is an array of rxwebValidators. Validators are set according to the relative requirement based on which validation you want to apply. Here you have to specify the name of validator which you want to use.

<div component="app-code" key="compose-validatorsExample-model"></div> 
<div component="app-example-runner" ref-component="app-compose-validators" title="Compose decorators with validators" key="validators"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Compose validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object. 
<div component="app-code" key="compose-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="compose-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-compose-conditionalExpression" title="alpha decorators with conditionalExpression" key="conditionalExpression"></div>

# Complete Compose Example

This Complete Compose example which includes all the ComposeConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-compose-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="compose-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="compose-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="compose-complete-html"></div> 
# [/Html]
***

# Dynamic Compose Example

This Dynamic Compose example which execute based on json passed. conditional expression with function would be not apply in dynamic compose example. 
4
<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-compose-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="compose-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="compose-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="compose-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="compose-dynamic-html"></div> 
# [/Html]
***
