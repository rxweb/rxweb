---
title: leapYear
description: LeapYear validation decorator will check whether the value entered is a leap year or not.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user value form, which contains fields like name, birth year, joining year and you want the user to enter value which is in leap year format Here depending upon the requirement these scenarios may arise..
<ol>
    <li>Allow only leap year in the field of birthyear.</li>
    <li>Apply leapyear validation based on matched condition in the form, like if the name  is ‘John’ then the birthYear value should be leapyear.</li>
    <li>Adding Custom Message on joining Field.</li>
    <li>Apply leapYear validation dynamically based on server rules.</li>
</ol>
Let’s see how LeapYear decorator fulfil the need.

# Basic LeapYear Validation

<data-scope scope="['decorator']">
First we need to create ea User class and define a property of leapyear in the model to achieve the functional need of point 1.
<div component="app-code" key="leapYear-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="leapYear-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="leapYear-add-html"></div> 
<div component="app-leapYear-add" title="leapYear Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="leapYear-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="leapYear-edit-html"></div> 
<div component="app-leapYear-add" title="leapYear Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="leapYear-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="leapYear-add-html"></div> 
<div component="app-leapYear-add" title="leapYear Decorator for add Example"></div>
</data-scope>

# BaseConfig
Below options are not mandatory to use in the `@leapYear()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" title="conditionalExpression">conditionalExpression</a></td><td>LeapYear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

LeapYear validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="leapYear-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="leapYear-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="leapYear-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="leapYear-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-leapYear-conditionalExpression" title="leapYear decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="leapYear-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-leapYear-message" title="leapYear decorators with message" key="message"></div>

# Complete LeapYear Example

This Complete LeapYear example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-leapYear-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="leapYear-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="leapYear-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="leapYear-complete-html"></div> 
***

# Dynamic LeapYear Example

This Dynamic LeapYear example which execute based on json passed. conditional expression with function would be not apply in dynamic leapYear example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-leapYear-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="leapYear-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="leapYear-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="leapYear-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="leapYear-dynamic-html"></div> 
***
