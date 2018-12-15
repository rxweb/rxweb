---
title: dataUri
description: dataUri validation  {{validatorType}}  allows user to enter the input which is a valid data Uri.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which dataUri fields like scheme, AudioDataUri, VideoDataUri and ImageDataUri and you want the user to enter input which is a proper data URI format. depending on the requirements, these scenarios may arise..
<ol class='showHideElement'>
   <li>Allow the user to enter valid dataUri in the field of AudioDataUri with custom error message.</li>
   <li>Apply validation on VideoDataUri  field based on matched condition in the form, like if the scheme is 'DataUri', then the VideoDataUri  must be a data URI format (Used as a function).</li>
   <li>Apply validation on ImageDataUri based on matched condition in the form, like if the scheme is 'DataUri', then the ImageDataUri must be a data URI format (Used as a string datatype).</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply dataUri validation dynamically based on server rules.</li>
   </data-scope>
</ol>
Let's see how dataUri  {{validatorType}}  fulfil the need.

# Basic dataUri Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a user model and define a property of htmlDataUri in the model to achieve the functional need of point 1.
<div component="app-code" key="dataUri-add-model"></div> 
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
<div component="app-code" key="dataUri-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="dataUri-add-html"></div> 
<div component="app-example-runner" ref-component="app-dataUri-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="dataUri-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="dataUri-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="dataUri-edit-html"></div> 
<div component="app-example-runner" ref-component="app-dataUri-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="dataUri-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="dataUri-add-html"></div> 
<div component="app-example-runner" ref-component="app-dataUri-add"></div>
</data-scope>

# BaseConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@dataUri()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.dataUri()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `dataUri` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>DataUri validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

DataUri validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="dataUri-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="dataUri-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-dataUri-conditionalExpression" title="dataUri {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="dataUri-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-dataUri-message" title="dataUri {{validatorType}} with message" key="message"></div>

# Complete dataUri Example

This Complete dataUri example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-dataUri-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="dataUri-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="dataUri-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="dataUri-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic dataUri Example

This Dynamic dataUri example which execute based on json passed. conditional expression with function would be not apply in dynamic dataUri example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-dataUri-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="dataUri-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="dataUri-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="dataUri-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="dataUri-dynamic-html"></div>
# [/Html]
***
</data-scope>
