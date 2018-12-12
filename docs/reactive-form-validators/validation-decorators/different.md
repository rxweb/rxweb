---
title: different 
description: Different validation  {{validatorType}}  will check two inputs whether they are different or not. It is just opposite of compare decorator.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form in which you want to compare firstname and LastName which are entered by the user which contains fields like firstname and lastname, password Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>The Name of firstName field on which comparison is done.</li>
    <li>The Custom Message on password field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply different validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how different  {{validatorType}}  fulfil the need.

# Basic Different Validation
<data-scope scope="['decorator','template-driven']">
First we need to create a User Model class and define property of Password and Confirm Password in the model to achieve the functional need of point 1.
<div component="app-code" class='showHideElement' key="different-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add form operations. 

<div component="app-code" class='showHideElement' key="different-add-component"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="different-add-html"></div> 
<div component="app-example-runner" ref-component="app-different-add"></div>
***

# DifferentConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@different()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.different()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `different` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#fieldName")' title="fieldName">fieldName</a></td><td>Current property is matched with the particular property. so we need to pass particular property name.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Different validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" class='showHideElement' key="different-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" class='showHideElement' key="different-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-different-conditionalExpression" title="different {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

<div component="app-code" class='showHideElement' key="different-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-different-fieldName" title="different {{validatorType}} with fieldName" key="fieldName"></div>

## message
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" class='showHideElement' key="different-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-different-message" title="different {{validatorType}} with message" key="message"></div>

# Complete Different Example

This Complete Different example which includes all the DifferentConfig properties will fulfil the requirement of scenarios 1 and 2 

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-different-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven']">
# [Model](#tab\completemodel)
<div component="app-code" class='showHideElement' key="different-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" class='showHideElement' key="different-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" class='showHideElement' key="different-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Different Example

This Dynamic Different example which execute based on json passed. conditional expression with function would be not apply in dynamic different example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-different-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" class='showHideElement' key="different-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" class='showHideElement' key="different-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" class='showHideElement' key="different-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" class='showHideElement' key="different-dynamic-html"></div> 
# [/Html]
***
</data-scope>
