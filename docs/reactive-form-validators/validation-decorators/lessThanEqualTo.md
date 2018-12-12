---
title: lessThanEqualTo
description: Less than equal to validation  {{validatorType}}  will allow the user to enter only that value which is less than oe equal to the value in the pre defined field.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form and you have fields like TotalMarks, ObtainedMarks, OtherMarks and you want user to enter ObtainedMarks, OtherMarks such that they should be less than or equal to TotalMarks Here depending upon the requirement these scenarios may arise
<ol class='showHideElement'>
   <li>Specify TotalMarks as fieldName such that LessThanEqualTo validation should be applied to the fieldname for comparing other fields.</li>
   <li>Apply LessThanEqualTo validation based on matched condition in the form, like if the TotalMarks is ‘100’ then the ObtainedMarks,OtherMarks value  should be less than or equal to 100.</li>
   <li>Adding Custom Message on OtherMarks Field.</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply lessThanEqualTo validation dynamically based on server rules.</li>
   </data-scope>
</ol>
Let’s see how lessThanEqualTo {{validatorType}} fulfil the need.

# Basic LessThanEqualTo Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create User model class define a property of Marks and TotalMarks model to achieve the functional need of point 1. 
<div component="app-code" key="lessThanEqualTo-add-model"></div> 
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
<div component="app-code" key="lessThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-add-html"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="lessThanEqualTo-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="lessThanEqualTo-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-edit-html"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="lessThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-add-html"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-add"></div>
</data-scope>

# RelationalOperatorConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@lessThanEqualTo()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.lessThanEqualTo()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `lessThanEqualTo` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#fieldName")' title="fieldName">fieldName</a></td><td>Current property is matched with the particular property. so we need to pass particular property name.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>lessThanEqualTo validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## fieldName 
Type :  `string` 
Less than Equal to validation should be applied based on the `fieldName` for compare other field value. 

<div component="app-code" key="lessThanEqualTo-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-fieldName" title="lessThanEqualTo {{validatorType}} with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 
Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. 

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="lessThanEqualTo-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="lessThanEqualTo-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-lessThanEqualTo-conditionalExpression" title="lessThanEqualTo {{validatorType}} with conditionalExpression" key="conditionalExpression"></div> 

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="lessThanEqualTo-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-message" title="lessThanEqualTo {{validatorType}} with message" key="message"></div>

# Complete lessThanEqualTo Example

This Complete lessThanEqualTo example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-lessThanEqualTo-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="lessThanEqualTo-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="lessThanEqualTo-complete-component"></div>
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="lessThanEqualTo-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic lessThanEqualTo Example

This Dynamic lessThanEqualTo example which execute based on json passed. conditional expression with function would be not apply in dynamic lessThanEqualTo example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-lessThanEqualTo-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="lessThanEqualTo-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="lessThanEqualTo-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="lessThanEqualTo-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="lessThanEqualTo-dynamic-html"></div> 
# [/Html]
***
</data-scope>
