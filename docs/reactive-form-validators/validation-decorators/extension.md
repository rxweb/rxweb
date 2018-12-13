---
title: extension
description: extension validation  {{validatorType}}  allows user to enter the input which is in the proper extension format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a UserInfo form, which contains fields like fileType, profilePicture ,imageFile ,documentFile ,contactFile and you want the user to enter input which is a proper extension format. Here depending upon the requirement, these scenarios may arise..
<ol class='showHideElement'>
   <li>Allow profilePicture which have proper extension format.</li>
   <li>Apply  extension validation on  documentFile field based on matched condition in the form, like if the fileType is 'Document', then the documentFile must be a extension format (Used as a function).</li>
   <li>Apply extension validation on imageFile field based on matched condition in the form, like if the fileType is 'Picture', then the imageFile must be a extension format (Used as a string datatype).</li>
   <li>Adding custom message on ContactFile</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply extension validation dynamically based on server rules.</li>
   </data-scope>
</ol>
Let's see how extension  {{validatorType}}  fulfil the need.
 
# Basic extension Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a storageCapacity model and define a property of profilePicture in the model to achieve the functional need of point 1.
<div component="app-code" key="extension-add-model"></div> 
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
<div component="app-code" key="extension-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="extension-add-html"></div> 
<div component="app-example-runner" ref-component="app-extension-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="extension-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="extension-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="extension-edit-html"></div> 
<div component="app-example-runner" ref-component="app-extension-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="extension-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="extension-add-html"></div> 
<div component="app-example-runner" ref-component="app-extension-add"></div>
</data-scope>

# ExtensionConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@extension()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.extension()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `extension` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#extensions")'  title="extensions">extensions</a></td><td>Multiple extensions which are allowed to be entered by the user. It is in form of array.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")'  title="conditionalExpression">conditionalExpression</a></td><td>extension validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## extensions
Type :  `string[]` 

extensions parameter is the array of multiple extensions which are allowed to be entered by the user.

<div component="app-code" key="extension-extensionsExample-model"></div> 
<div component="app-example-runner" ref-component="app-extension-extensions" title="extension {{validatorType}} with extensions" key="extensions"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

extension validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="extension-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="extension-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-extension-conditionalExpression" title="extension {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="extension-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-extension-message" title="extension {{validatorType}} with message" key="message"></div>

# Complete extension Example

This Complete extension example which includes all the ExtensionConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-extension-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="extension-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="extension-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="extension-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic extension Example

This Dynamic extension example which execute based on json passed. conditional expression with function would be not apply in dynamic extension example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-extension-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="extension-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="extension-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="extension-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="extension-dynamic-html"></div> 
# [/Html]
***
</data-scope>
