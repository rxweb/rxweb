---
title: fileSize
description: fileSize validation decorator allows user to enter the input which is in the proper file size format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a storageCapacity form, which contains fields like device, videoStorageSize, documentStorageSize and photographStorageSize and you want the user to enter input which is a proper size format. Here depending upon the requirement, these scenarios may arise..
<ol>
   <li>Allow videoStorageSize which have proper size format and adding Custom Message on videoStorageSize.</li>
   <li>Apply validation on documentStorageSize field based on matched condition in the form, like if the device is 'SmartPhone', then the documentStorageSize must be a size format (Used as a function).</li>
   <li>Apply validation on photographStorageSize field based on matched condition in the form, like if the device is 'SmartPhone', then the photographStorageSize must be a size format (Used as a string datatype).</li>
   <li>Apply fileSize validation dynamically based on server rules.</li>
</ol>
Let's see how fileSize decorator fulfil the need.
 
# Basic fileSize Validation
<data-scope scope="['decorator']">
First we need to create a storageCapacity model and define a property of videoStorageSize in the model to achieve the functional need of point 1.
<div component="app-code" key="fileSize-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="fileSize-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-add-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="fileSize-edit-component"></div>
The below code is `storage-capacity-data.json` for getting data from the server 
<div component="app-code" key="fileSize-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-edit-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="fileSize-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-add-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-add"></div>
</data-scope>

# SizeConfig
message and conditionalExpression are not mandatory to use in the `@fileSize()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="maxSize">[maxSize](#maxSize)</a></td><td> Maximum file size allowed to be entered.</td></tr>
<tr><td><a title="conditionalExpression">[conditionalExpression](#conditionalExpression)</a></td><td>fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a title="message">[message](#message)</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>

## maxSize
Type :  `number` 

maxSize parameter is the maximum file size allowed to be entered by the user.

<div component="app-code" key="fileSize-maxSizeExample-model"></div> 
<div component="app-example-runner" ref-component="app-fileSize-maxSize" title="fileSize decorators with maxSize" key="maxSize"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="fileSize-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="fileSize-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-fileSize-conditionalExpression" title="fileSize decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="fileSize-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-fileSize-message" title="fileSize decorators with message" key="message"></div>

# Complete fileSize Example

This Complete fileSize example which includes all the SizeConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-fileSize-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="fileSize-complete-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="fileSize-complete-component"></div>
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="fileSize-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic fileSize Example

This Dynamic fileSize example which execute based on json passed. conditional expression with function would be not apply in dynamic fileSize example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-fileSize-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="fileSize-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="fileSize-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="fileSize-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="fileSize-dynamic-html"></div> 
# [/Html]
***
</data-scope>
