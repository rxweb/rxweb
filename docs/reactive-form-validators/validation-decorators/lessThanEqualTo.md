---
title: lessThanEqualTo
description: Less than equal to validation decorator will allow the user to enter only that value which is less than oe equal to the value in the pre defined field.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form and you have fields like TotalMarks, ObtainedMarks, OtherMarks and you want user to enter ObtainedMarks, OtherMarks such that they should be less than or equal to TotalMarks Here depending upon the requirement these scenarios may arise
<ol>
   <li>Specify TotalMarks as fieldName such that LessThanEqualTo validation should be applied to the fieldname for comparing other fields.</li>
   <li>Apply LessThanEqualTo validation based on matched condition in the form, like if the TotalMarks is ‘100’ then the ObtainedMarks,OtherMarks value  should be less than or equal to 100.</li>
   <li>Adding Custom Message on OtherMarks Field.</li>
   <li>Apply dynamic validation, If the validation will be changed based on some criteria in the application.</li>
</ol>
Let’s see how lessThanEqualTo validator fulfil the need.

# Basic LessThanEqualTo Validation
<data-scope scope="['decorator']">
First we need to create User model class define a property of Marks and TotalMarks model to achieve the functional need of point 1. 
<div component="app-code" key="lessThanEqualTo-add-model"></div> 
</data-scope>
Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="lessThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-add-html"></div> 
<div component="app-lessThanEqualTo-add" title="lessThanEqualTo Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="lessThanEqualTo-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="data-lessThanEqualTo"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-edit-html"></div> 
<div component="app-lessThanEqualTo-add" title="lessThanEqualTo Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="lessThanEqualTo-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="lessThanEqualTo-add-html"></div> 
<div component="app-lessThanEqualTo-add" title="lessThanEqualTo Decorator for add Example"></div>
</data-scope>

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@lessThanEqualTo()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#fieldName" (click)='scrollTo("#fieldName")' title="fieldName">FieldName</a></td><td>Current property is matched with the particular property. so we need to pass particular property name.</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>lessThanEqualTo validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>

## fieldName 
Type :  `string` 
Less than Equal to validation should be applied based on the `fieldName` for compare other field value. 

<div component="app-code" key="lessThanEqualTo-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-fieldName" title="lessThanEqualTo decorators with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 
Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. 

<div component="app-note" key="lessThanEqualTo-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="lessThanEqualTo-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="lessThanEqualTo-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="lessThanEqualTo-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-lessThanEqualTo-conditionalExpression" title="lessThanEqualTo decorators with conditionalExpression" key="conditionalExpression"></div> 

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="lessThanEqualTo-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-lessThanEqualTo-message" title="lessThanEqualTo decorators with message" key="message"></div>

# Complete lessThanEqualTo Example

This Complete lessThanEqualTo example which includes all the RelationalOperatorConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-lessThanEqualTo-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="lessThanEqualTo-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="lessThanEqualTo-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="lessThanEqualTo-complete-html"></div> 
***


# Dynamic lessThanEqualTo Example

This Dynamic lessThanEqualTo example which execute based on json passed. conditional expression with function would be not apply in dynamic lessThanEqualTo example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-lessThanEqualTo-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="lessThanEqualTo-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="lessThanEqualTo-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="lessThanEqualTo-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="lessThanEqualTo-dynamic-html"></div> 
***