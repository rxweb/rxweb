---
title: fileSize
description: fileSize validation {{validatorType}} allows user to enter the input which is in the proper file size format.
author: rxcontributortwo
category: form-validations
type: tabs
linktitle: fileSize
---

# When to use
Suppose you want to create a UserInfo form, which contains fields like fileType , profilePhoto, videoFile , audioFile and imageFile, documentFile ,contactFile, profilePicture and you want the user to enter input which is a proper size format. Here depending upon the requirement, these scenarios may arise..
<ol class='showHideElement'>
   <li>Allow profilePhoto which have proper size format.</li>
   <li>Apply validation on documentFile field based on matched condition in the form, like if the fileType is 'Document', then the documentFile must be a size format (Used as a function).</li>
   <li>Apply validation on imageFile field based on matched condition in the form, like if the device is 'SmartPhone', then the imageFile must be a size format (Used as a string datatype).</li>
   <li>Adding custom message on ContactFile field</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply fileSize validation dynamically based on server rules.</li>
   </data-scope>
</ol>

Let's see how fileSize {{validatorType}} fulfil the need.
 
# Basic fileSize Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a UserInfo model and define a property of videoFile in the model to achieve the functional need of point 1.
<div component="app-code" key="fileSize-add-model"></div> 
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
<div component="app-code" key="fileSize-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-add-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="fileSize-edit-component"></div>

The below default data which is coming from the server in this example of edit form which is set in the `storage-capacity-data.json` in json format like this:
<div component="app-code" key="fileSize-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-edit-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="fileSize-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="fileSize-add-html"></div> 
<div component="app-example-runner" ref-component="app-fileSize-add"></div>
</data-scope>

# SizeConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@fileSize()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.fileSize()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `fileSize` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#maxSize")' title="maxSize">maxSize</a></td><td>maxSize property of the SizeConfig is used to set the maximum file size allowed to be entered.</td></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>FileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.</td></tr>
<tr><td><a (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## maxSize
Type :  `number` 

maxSize property of the SizeConfig is used to set the maximum file size allowed to be entered.

<div component="app-code" key="fileSize-maxSizeExample-model"></div> 
<div component="app-example-runner" ref-component="app-fileSize-maxSize" title="fileSize {{validatorType}} with maxSize" key="maxSize"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

fileSize validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="fileSize-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="fileSize-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-fileSize-conditionalExpression" title="fileSize {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="fileSize-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-fileSize-message" title="fileSize {{validatorType}} with message" key="message"></div>

# Complete fileSize Example

This Complete fileSize example which includes all the SizeConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-fileSize-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
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

This Dynamic FileSize example is executed on the basis of json passed in the formBuilderConfiguration which comes under `RxFormBuilder` of reactive-form-validators. `conditionalExpression` with function would not be applied in dynamic fileSize example. This example will fulfil the requirement of our last point.

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
