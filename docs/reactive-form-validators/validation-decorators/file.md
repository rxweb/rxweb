---
title: file
description: file validation  {{validatorType}}  allows user to validate whether how many files can be uploaded . It depends upon maxFiles and minFiles.
author: rxcontributorone

---
# When to use
Suppose you want to create a User form, which contains fields like totalImageFiles, totalDocumentFiles, minimumFiles,maximumFile,minMaxFiles and you want the user to upload files as per validation format. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow file validation on field of totalImageFiles based on maxFiles.</li>
    <li>Apply  validation based on minFiles on totalDocumentFiles</li>
    <li>Adding Custom Message on minMaxFiles field.</li>
   <li>Apply validation on maximumFile field based on matched condition in the form, like if the fileType is 'Document', then the maximumFile must be valid file count (Used as a function).</li>
   <li>Apply validation on minMaxFiles field based on matched condition in the form, like if the ImageType is 'Picture', then the minMaxFiles must be a Image format (Used as a string datatype).</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply file validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how file  {{validatorType}}  fulfil the need.

# fileConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@file()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.file()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `file` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  title="maxFiles">maxFiles</a></td><td>The Maximum Number of files that can be uploaded</td></tr>
<tr><td><a  title="minFiles">minFiles</a></td><td>The Minimum Number of files that can be uploaded</td></tr>
<tr><td><a  title="conditionalExpression">conditionalExpression</a></td><td>file validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## maxFiles
Type :  `string` 

The Maximum Number of files that can be uploaded

<div component="app-code" key="file-maxFilesExample-model"></div> 
<div component="app-example-runner" ref-component="app-file-max-files" title="file {{validatorType}} with maxFiles" key="maxFiles"></div>

## maxFiles
Type :  `string` 

The Minimum Number of files that can be uploaded

<div component="app-code" key="file-minFilesExample-model"></div> 
<div component="app-example-runner" ref-component="app-file-min-files" title="file {{validatorType}} with minFiles" key="minFiles"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

file validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="file-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="file-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-file-conditionalExpression" title="file {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="file-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-file-message" title="file {{validatorType}} with message" key="message"></div>

# Complete file Example

This Complete file example which includes all the fileConfig properties will fulfil the requirement of scenarios 1, 2, 3,4 and 5

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-file-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="file-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="file-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="file-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic file Example

This Dynamic file example which execute based on json passed. conditional expression with function would be not apply in dynamic file example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-file-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="file-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="file-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="file-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="file-dynamic-html"></div> 
# [/Html]
***
</data-scope>
