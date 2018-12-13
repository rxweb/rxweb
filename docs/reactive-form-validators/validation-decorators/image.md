---
title: image
description: image validation  {{validatorType}}  allows user to validate image like height,width etc .
author: rxcontributorone

---
# When to use
Suppose you want to create a User form, which contains fields like ProfilePhoto, Signature, DrivingLicense,IdentityCard,DrvingLicense,VoterId,AadharCard, and you want the user to enter only the hex color format. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow validation using maxwidth on field of ProfilePhoto.</li>
    <li>Apply image validation based on maxheight in Signature</li>
    <li>Adding Custom Message on VoterId field.</li>
   <li>Apply validation on AadharCard field based on matched condition in the form, like if the ImageType is 'IdentityCard', then the AadharCard must be a Image format (Used as a function).</li>
   <li>Apply validation on PanCard field based on matched condition in the form, like if the ImageType is 'IdentityCard', then the PanCard must be a Image format (Used as a string datatype).</li>
    <data-scope scope="['decorator','validator']">
    <li>Apply image validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how image  {{validatorType}}  fulfil the need.

# Basic image Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User class and define a property of ProfilePhoto in the model to achieve the functional need of point 1.
<div component="app-code" key="image-add-model"></div> 
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
<div component="app-code" key="image-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="image-add-html"></div> 
<div component="app-example-runner" ref-component="app-image-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="image-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="image-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="image-edit-html"></div> 
<div component="app-example-runner" ref-component="app-image-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="image-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="image-add-html"></div> 
<div component="app-example-runner" ref-component="app-image-add"></div>
</data-scope>

# imageConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@image()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.image()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `image` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  title="maxWidth">maxWidth</a></td><td>To set the maximum Width of the Image</td></tr>
<tr><td><a title="maxHeight">maxHeight</a></td><td>To set the maximum Height of the Image</td></tr>
<tr><td><a title="minWidth">minWidth</a></td><td>To set the minimum Width of the Image</td></tr>
<tr><td><a title="minHeight">minHeight</a></td><td>To set the minimum Height of the Image</td></tr>
<tr><td><a  title="conditionalExpression">conditionalExpression</a></td><td>image validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## maxWidth
Type :  `string` 

To set the maximum Width of the Image.

<div component="app-code" key="image-maxWidthExample-model"></div> 
<div component="app-example-runner" ref-component="app-image-maxWidth" title="image {{validatorType}} with maxWidth" key="maxWidth"></div>

## maxHeight
Type :  `string` 

To set the maximum Height of the Image.

<div component="app-code" key="image-maxHeightExample-model"></div> 
<div component="app-example-runner" ref-component="app-image-maxHeight" title="image {{validatorType}} with maxHeight" key="maxHeight"></div>

## minWidth
Type :  `string` 

To set the minimum Width of the Image.

<div component="app-code" key="image-minWidthExample-model"></div> 
<div component="app-example-runner" ref-component="app-image-minWidth" title="image {{validatorType}} with minWidth" key="minWidth"></div>

## minHeight
Type :  `string` 

To set the minimum Height of the Image.

<div component="app-code" key="image-minHeightExample-model"></div> 
<div component="app-example-runner" ref-component="app-image-minHeight" title="image {{validatorType}} with minHeight" key="minHeight"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

image validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="image-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="image-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-image-conditionalExpression" title="image {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="image-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-image-message" title="image {{validatorType}} with message" key="message"></div>

# Complete image Example

This Complete image example which includes all the imageConfig properties will fulfil the requirement of scenarios 1, 2, 3,4 and 5

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-image-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="image-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="image-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="image-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic image Example

This Dynamic image example which execute based on json passed. conditional expression with function would be not apply in dynamic image example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-image-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="image-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="image-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="image-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="image-dynamic-html"></div> 
# [/Html]
***
</data-scope>

