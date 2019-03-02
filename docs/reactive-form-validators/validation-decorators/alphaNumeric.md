---
title: alphaNumeric
description: Alpha Numeric validation {{validatorType}} will allow only alphabets and numbers to be entered. It will not allow any special character. 
author: rxcontributortwo
category: form-validations
type: tabs
linktitle: alphaNumeric
---

# When to use
Suppose you want to create a Location form, which contains fields like AreaName, FlatAddress, PostalAddress, countryCode, CityCode and you want the user to enter only alphabets and numbers. Here depending upon the requirement these scenarios may arise.

<ol class='showHideElement'>
    <li>Allow only alphabets and numbers in AreaName without space.</li>
    <li>Allowing WhiteSpace in FlatAddress.</li>
    <li>Apply alphaNumeric validation based on matched condition in the form, like if the AreaName is `Delhi` then the countryCode value should be in alphabets and numbers.</li>
    <li>Apply alphaNumeric validation based on matched condition in the form, like if the AreaName is `Delhi` then the CityCode value should be in alphabets and numbers.</li>
    <li>Adding Custom Message on PostalAddress Field.</li>
    <data-scope scope="['decorator','validator']">
        <li>Apply alphaNumeric validation dynamically based on server rules. </li>
    </data-scope>
</ol>

Let’s see how alphaNumeric {{validatorType}} fulfil the need.

# Basic AlphaNumeric Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a Location class and define a property of AreaName in the model to achieve the functional need of point 1.
<div component="app-code" key="alphaNumeric-add-model"></div> 
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
<div component="app-code" key="alphaNumeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="alphaNumeric-add-html"></div> 
<div component="app-example-runner" ref-component="app-alphaNumeric-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="alphaNumeric-edit-component"></div> 

The below default data which is coming from the server in this example of edit form which is set in the `location-data.json` in json format like this:
<div component="app-code" key="alphaNumeric-edit-json"></div>  
Next, we need to write html code.
<div component="app-code" key="alphaNumeric-edit-html"></div> 
<div component="app-example-runner" ref-component="app-alphaNumeric-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="alphaNumeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="alphaNumeric-add-html"></div> 
<div component="app-example-runner" ref-component="app-alphaNumeric-add"></div>
</data-scope>

# AlphaConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@alphaNumeric()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.alphaNumeric()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `alphaNumeric` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#allowwhitespace")' title="allowWhiteSpace">allowWhiteSpace</a></td><td>This will allow whitespace in particular control property. The default value is `false`.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular FormControl value .The default value is `false`.

<div component="app-code" key="alphaNumeric-allowWhiteSpaceExample-model"></div> 
<div component="app-example-runner" ref-component="app-alphaNumeric-allowWhiteSpace" title="AlphaNumeric {{validatorType}} with allowWhiteSpace" key="allowWhiteSpace"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="alphaNumeric-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="alphaNumeric-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-alphaNumeric-conditionalExpression" title="AlphaNumeric {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom error message on respective FormControl

<div component="app-code" key="alphaNumeric-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-alphaNumeric-message" title="AlphaNumeric {{validatorType}} with message" key="message"></div>

# Complete AlphaNumeric Example

This Complete AlphaNumeric example which includes all the AlphaConfig properties will fulfil the requirement of scenarios 1, 2, 3, 4 and 5.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-alphaNumeric-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="alphaNumeric-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="alphaNumeric-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="alphaNumeric-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic AlphaNumeric Example

This Dynamic AlphaNumeric example is executed on the basis of json passed in the formBuilderConfiguration which comes under `RxFormBuilder` of reactive-form-validators. `conditionalExpression` with function would not be applied in dynamic alphaNumeric example. This example will fulfil the requirement of our last point.

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-alphaNumeric-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="alphaNumeric-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="alphaNumeric-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="alphaNumeric-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="alphaNumeric-dynamic-html"></div> 
# [/Html]
***
</data-scope>
