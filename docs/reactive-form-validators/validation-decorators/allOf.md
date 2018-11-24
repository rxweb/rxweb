---
title: allOf 
description: allOf validation decorator will check whether the user has entered all of the values of given field or not.
author: rxcontributortwo

---

# When to use
Suppose you want to create a employee form in  which contains fields like department, hobbies and skills.You want employee to enter all value of a particular field here the field is taken in the form of array and according to that the choice is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
<ol>
    <li>The skills field in which you want the user to enter skills based upon matchvalues.</li>
    <li>Apply allOf validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.</li>
    <li>The Custom Message on Hobbies field.</li>
    <li>Apply allOf validation dynamically based on server rules.</li>
</ol>
Let’s see how allOf decorator fulfil the need.

# Basic allOf Validation
<data-scope scope="['decorator']">
First we need to create a Employee Model and define a property of hobbies in the model to achieve the functional need of point 1.
<div component="app-code" key="allOf-add-model"></div> 
</data-scope>

Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations.

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="allOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="allOf-add-html"></div> 
<div component="app-allOf-add" title="allOf Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="allOf-edit-component"></div> 
The below code is `employee-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="allOf-edit-html"></div> 
<div component="app-allOf-add" title="allOf Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="allOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="allOf-add-html"></div> 
<div component="app-allOf-add" title="allOf Decorator for add Example"></div>
</data-scope>

# ArrayConfig
Below options are not mandatory to use in the `@allOf()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#matchValue" (click)='scrollTo("#matchValue")' title="#matchValue">matchValue</a></td><td>matchValue is the array based on which the value is matched for validation. According to it all the values in the array should be matched</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>AllOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
</table>

## matchValue 
Type :  `any[]` 

matchValue is the array based on which the value is matched for validation. According to it all the values in the array should be matched.

<div component="app-code" key="allOf-matchValueExample-model"></div> 
<div component="app-example-runner" ref-component="app-allOf-matchValue" title="allOf decorators with matchValue" key="matchValue"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

AllOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="allOf-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="allOf-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="allOf-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="allOf-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-allOf-conditionalExpression" title="allOf decorators with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="allOf-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-allOf-message" title="allOf decorators with message" key="message"></div>

# Complete allOf Example

This Complete allOf example which includes all the ArrayConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-allOf-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="allOf-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="allOf-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="allOf-complete-html"></div> 
***


# Dynamic allOf Example

This Dynamic AllOf example which execute based on json passed. conditional expression with function would be not apply in dynamic allOf example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-allOf-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="allOf-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="allOf-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="allOf-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="allOf-dynamic-html"></div> 
***
