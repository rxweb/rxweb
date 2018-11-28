---
title: oneOf
description: oneOf validation decorator will check whether the user has entered any one of the given inputs or not.
author: rxcontributortwo

---

# When to use
Let's assume that you are creating a employee form in which you want employee to enter any one value of a particular value which contains fields like department, hobbies and skills.Here the field is taken in the form of array and according to that the oneOf is applied on the property by applying matchvalues. Here depending upon the requirement these scenarios may arise.
<ol>
<li>The skills field in which you want the user to enter skills based upon matchvalues.</li>
<li>Apply oneOf validation based on matched condition in the form, like if the department  is ‘dotnet’ then the skills value should be based upon matchvalues.</li>
<li>The Custom Message on Hobbies field.</li>
<li>Apply oneOf validation dynamically based on server rules.</li>
</ol>
Let’s see how oneOf validator fulfil the need.

# Basic oneOf Validation

<data-scope scope="['decorator']">
First we need to create a employee Model class and define property of hobbies in the model to achieve the functional need of point 1.
<div component="app-code" key="oneOf-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="oneOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="oneOf-add-html"></div> 
<div component="app-example-runner" ref-component="app-oneOf-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="oneOf-edit-component"></div> 
The below code is `employee-data.json` for getting data from the server
<div component="app-code" key="oneOf-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="oneOf-edit-html"></div> 
<div component="app-example-runner" ref-component="app-oneOf-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="oneOf-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="oneOf-add-html"></div> 
<div component="app-example-runner" ref-component="app-oneOf-add"></div>
</data-scope>

# ArrayConfig
Below options are not mandatory to use in the `@oneOf()` decorator. If needed then use the below options.
                     
<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#matchValue" (click)='scrollTo("#matchValue")' title="matchValue">matchValue</a></td><td>matchValue is the array based on which the validation property is set </td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>oneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## matchValue 
Type :  `any[]` 
matchValue is the array based on which the validation property is set. According to it one of the values in the array should be matched.

<div component="app-code" key="oneOf-matchValueExample-model"></div> 
<div component="app-example-runner" ref-component="app-oneOf-matchValue" title="oneOf decorators with matchValue" key="matchValue"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

oneOf validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="oneOf-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="oneOf-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-oneOf-conditionalExpression" title="oneOf decorators with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 
To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="oneOf-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-oneOf-message" title="oneOf decorators with message" key="message"></div>

# Complete oneOf Example

This Complete oneOf example which includes all the ArrayConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-oneOf-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="oneOf-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="oneOf-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="oneOf-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic oneOf Example

This Dynamic oneOf example which execute based on json passed. conditional expression with function would be not apply in dynamic oneOf example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-oneOf-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="oneOf-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="oneOf-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="oneOf-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="oneOf-dynamic-html"></div> 
# [/Html]
***
</data-scope>