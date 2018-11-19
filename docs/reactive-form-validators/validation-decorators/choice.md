-
title: choice 
description: choice validation decorator will check whether the value entered is matching the properties defined.
author: rxcontributortwo

-

# When to use
Suppose you want to create a employee form in which you want employee to enter value of a particular choice which contains fields like department, hobbies and skills.Here the field is taken in the form of array and according to that the choice is applied on the property by applying minlength and maxLength. Here depending upon the requirement these scenarios may arise.

<ol>
    <li>The skills field in which you want the user to enter maximum three skills and minimum of one skill.</li>
    <li>Apply choice validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be maximum three and minimum one.</li>
    <li>The Custom Message on Hobbies field.</li>
    <li>>Apply choice validation dynamically based on server rules.</li>
</ol>

Let’s see how choice decorator fulfil the need.

# Basic choice Validation
<data-scope scope="['decorator']">
First we need to create a Employee Model and define a property of hobbies in the model to achieve the functional need of point 1.
<div component="app-code" key="choice-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="choice-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="choice-add-html"></div> 
<div component="app-choice-add" title="choice Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="choice-edit-component"></div> 
The below code is `employee-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="choice-edit-html"></div> 
<div component="app-choice-add" title="choice Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="choice-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="choice-add-html"></div> 
<div component="app-choice-add" title="choice Decorator for add Example"></div>
</data-scope>

# ChoiceConfig
Below options are not mandatory to use in the `@choice()` decorator. If needed then use the below options.


<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#minLength" (click)='scrollTo("#minLength")' title="#minLength">minLength</a></td><td>minLength  is to define a minLength of field which is in form of array</td></tr>
<tr><td><a href="#maxLength" (click)='scrollTo("#maxLength")' title="#maxLength">maxLength</a></td><td>maxLength  is to define a maxLength of field which is in form of array</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
</table>

## minLength 
Type :  `number` 
minLength  is to define a minLength of field which is in form of array

<div component="app-code" key="choice-minLengthExample-model"></div> 
<div component="app-example-runner" ref-component="app-choice-minLength" title="choice decorators with minLength" key="minLength"></div>

## maxLength 
Type :  `number` 
maxLength number is for define a maxLength number of range

<div component="app-code" key="choice-maxLengthExample-model"></div> 
<div component="app-example-runner" ref-component="app-choice-maxLength" title="choice decorators with maxLength" key="maxLength"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

choice validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="choice-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="choice-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="choice-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="choice-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-choice-conditionalExpression" title="choice decorators with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="choice-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-choice-message" title="choice decorators with message" key="message"></div>

# Complete choice Example

This Complete choice example which includes all the ChoiceConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-choice-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="choice-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="choice-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="choice-complete-html"></div> 
***

# Dynamic choice Example

This Dynamic Choice example which execute based on json passed. conditional expression with function would be not apply in dynamic choice example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-choice-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="choice-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="choice-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="choice-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="choice-dynamic-html"></div> 
***
