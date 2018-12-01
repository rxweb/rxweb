---
title: maxNumber
description: MaxNumber validation  {{validatorType}}  will allow user to enter the input upto the maximum number value parameter.
author: rxcontributorone

---
# When to use
Suppose you want to create a Subject-detail form, which contains fields like subjectCode, maximumMarks, PassingMarks and you want the user to enter valid  Number which does not exceed the Maximum number. Here depending upon the requirement these scenarios may arise.
<ol>
<li>Adding field of PassingMarks without any conditional expression.</li>
<li>Apply MaxNumber validation based on matched condition in the form, like if the subjectCode is ‘8CS5A’ then the maximumMarks value should be enter valid  Number which does not exceed the Maximum number .</li>
<li>Adding Custom Message on PassingMarks Field.</li>
<li>Adding value which you want to restrict number in the property. The maximum number is '100s'. </li>
<data-scope scope="['decorator','validator']">
<li>Apply maxNumber validation dynamically based on server rules.</li>
</data-scope>
</ol>
Let’s see how maxNumber {{validatorType}} fulfil the need.

# Basic MaxNumber Validation

<data-scope scope="['decorator']">
First we need to create subject-detail model class define a property of PassingMarks in the model to achieve the functional need of point 1.
<div component="app-code" key="maxNumber-add-model"></div> 
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
<div component="app-code" key="maxNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="maxNumber-add-html"></div> 
<div component="app-example-runner" ref-component="app-MaxNumber-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="maxNumber-edit-component"></div> 
The below code is `subject-detail-data.json` for getting data from the server
<div component="app-code" key="maxNumber-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="maxNumber-edit-html"></div> 
<div component="app-example-runner" ref-component="app-MaxNumber-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="maxNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="maxNumber-add-html"></div> 
<div component="app-example-runner" ref-component="app-MaxNumber-add"></div>
</data-scope>

# NumberConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@maxNumber()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.maxNumber()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `maxNumber` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#value")' title="value">value</a></td><td>enter value which you want to restrict number in the property</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>max number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 
Max Number validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="maxNumber-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="maxNumber-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-maxNumber-conditionalExpression" title="maxNumber decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="maxNumber-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-maxNumber-message" title="maxNumber decorators with message" key="message"></div>

## value 
Type :  `number` 
enter value which you want to restrict number in the property.

<div component="app-code" key="maxNumber-valueExample-model"></div> 
<div component="app-example-runner" ref-component="app-maxNumber-value" title="maxNumber decorators with value" key="value"></div>

# Complete MaxNumber Example

This Complete MaxNumber example which includes all the NumberConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-MaxNumber-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="maxNumber-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="maxNumber-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="maxNumber-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic MaxNumber Example

This Dynamic MaxDate example which execute based on json passed. conditional expression with function would be not apply in dynamic maxNumber example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-MaxNumber-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="maxNumber-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="maxNumber-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="maxNumber-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="maxNumber-dynamic-html"></div>
# [/Html]
***
</data-scope>
