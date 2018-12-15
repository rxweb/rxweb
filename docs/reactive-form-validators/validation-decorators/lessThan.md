---
title: lessThan
description: Less than validation  {{validatorType}}  will allow the user to enter only that value which is less than the value in the pre defined field.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like ObtainedMarks, PassingMarks, OtherMarks and you want the user to enter the numbers which are less than a related field. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
    <li>Allow numbers which are less than a perticular field like in PassingMarks.</li>
    <li>Apply lessThan validation based on matched condition in the form, like if the ObtainedMarks is less than 35, then only the greater than validation will be applied to PassingMarks field.</li>
    <li>Adding Custom Message on OtherMarks Field.</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply lessThan validation dynamically based on server rules.</li>
    </data-scope>
</ol>
Let’s see how lessThan  {{validatorType}}  fulfil the need.

# Basic LessThan Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User class and define a property of Marks and PassingMarks with the requirement of PassingMarks must be less than Marks field in the model to achieve the functional need of point 1.
<div component="app-code" key="lessThan-add-model"></div> 
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
<div component="app-code" key="lessThan-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThan-add-html"></div> 
<div component="app-example-runner" ref-component="app-lessThan-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="lessThan-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="lessThan-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThan-edit-html"></div> 
<div component="app-example-runner" ref-component="app-lessThan-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="lessThan-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThan-add-html"></div> 
<div component="app-example-runner" ref-component="app-lessThan-add"></div>
</data-scope>

# RelationalOperatorConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@lessThan()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.lessThan()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `lessThan` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="fieldName">fieldName</a></td><td>Less than validation should be applied based on the `fieldName` for compare other field value</td></tr>
<tr><td><a  title="conditionalExpression">conditionalExpression</a></td><td>Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## fieldName 
Type :  `string` 

Less than validation should be applied based on the `fieldName` for compare other field value

<div component="app-code" key="lessThan-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThan-fieldName" title="lessThan {{validatorType}} with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="lessThan-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="lessThan-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-lessThan-conditionalExpression" title="lessThan {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.
 
<div component="app-code" key="lessThan-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThan-message" title="lessThan {{validatorType}} with message" key="message"></div>

# Complete lessThan Example

This Complete lessThan example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-lessThan-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="lessThan-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="lessThan-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="lessThan-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic lessThan Example

This Dynamic lessThan example which execute based on json passed. conditional expression with function would be not apply in dynamic lessThan example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-lessThan-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="lessThan-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="lessThan-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="lessThan-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="lessThan-dynamic-html"></div> 
# [/Html]
***
</data-scope>
