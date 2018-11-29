---
title: range 
description: Range validation  {{validatorType}}  will check that the entered value is in the specified range.
author: rxcontributorone

---
# When to use
Suppose you want to create a employeeInfo form, which contains field of employeeAge, employeeExperience, salary and you want the user to enter value in a specified range. Here depending upon the requirement these scenarios may arise.
<ol>
 <li>Adding value which you want to restrict number in the property. The minimum number is 18 and maximum number is 60.</li> 
 <li>Apply range validation based on matched condition in the form, like if the age is greater than ‘25’ then the employeeExperience value should be between 2 to 20.</li>
 <li>Adding Custom Message on Salary Field.</li>
 <li>Apply range validation dynamically based on server rules.</li>
</ol>
Let’s see how range validator fulfil the need.

# Basic range Validation
<data-scope scope="['decorator']">
First we need to create employeeInfo model class define a property of employeeAge in the model to achieve the functional need of point 1.
<div component="app-code" key="range-add-model"></div> 
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
<div component="app-code" key="range-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="range-add-html"></div> 
<div component="app-example-runner" ref-component="app-range-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="range-edit-component"></div>
The below code is `employee-info-data.json` for getting data from the server 
<div component="app-code" key="range-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="range-edit-html"></div> 
<div component="app-example-runner" ref-component="app-range-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="range-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="range-add-html"></div> 
<div component="app-example-runner" ref-component="app-range-add"></div>
</data-scope>

# RangeConfig 
conditionalExpression and message options are not mandatory to use in the `@range()`  {{validatorType}}  but the minimum number and maximum number is mandatory parameter. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>range validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
<tr><td><a (click)='scrollTo("#minimumNumber")' title="minimumnumber">minimumNumber</a></td><td> Minimum number is for define a minimum number of range.</td></tr>
<tr><td><a (click)='scrollTo("#maximumNumber")' title="maximumNumber">maximumNumber</a></td><td> Maximum number is for define a maximum number of range.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string`
Range validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="range-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="range-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-range-conditionalExpression" title="range decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="range-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-range-message" title="range decorators with message" key="message"></div>

## minimumNumber 
Type :  `string` 
Minimum number is for define a minimum number of range

<div component="app-code" key="range-minimumNumberExample-model"></div> 
<div component="app-example-runner" ref-component="app-range-minimumNumber" title="range decorators with minimumNumber" key="minimumNumber"></div>

## maximumNumber 
Type :  `string` 
Maximum number is for define a maximum number of range

<div component="app-code" key="range-maximumNumberExample-model"></div> 
<div component="app-example-runner" ref-component="app-range-maximumNumber" title="range decorators with maximumNumber" key="maximumNumber"></div>

# Complete range Example

This Complete range example which includes all the RangeConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-range-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="range-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="range-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="range-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic range Example

This Dynamic range example which execute based on json passed. conditional expression with function would be not apply in dynamic range example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-range-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="range-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="range-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="range-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="range-dynamic-html"></div> 
# [/Html]
***
</data-scope>
