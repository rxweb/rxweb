---
title: hexColor  
description: HexColor validation decorator will allow user to enter only the input in proper Hex Color format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like ColorPicker, HeaderHexColorCode, BodyHexColorCode, StrictHexColorCode and you want the user to enter only the hex color format. Here depending upon the requirement these scenarios may arise.

<ol>
    <li>Allow string which is a hex color format like in ColorPicker field.</li>
    <li>Apply hexColor validation based on matched condition in the form, like if the ColorPicker is `#AFAFAF`, then only the HeaderHexColorCode field will be validated to hexColor validator.</li>
    <li>Adding Custom Message on BodyHexColorCode field.</li>
    <li>Applying strict format of hexCode in StrictHexCode field.</li>
    <li>Apply HexColor validation dynamically based on server rules.</li>
</ol>

Let’s see how hexColor decorator fulfil the need.

# Basic HexColor Validation

<data-scope scope="['decorator']">
First we need to create a User class and define a property of Color in the model to achieve the functional need of point 1.
<div component="app-code" key="hexColor-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="hexColor-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="hexColor-add-html"></div> 
<div component="app-example-runner" ref-component="app-hexColor-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="hexColor-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="hexColor-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="hexColor-edit-html"></div> 
<div component="app-example-runner" ref-component="app-hexColor-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="hexColor-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="hexColor-add-html"></div> 
<div component="app-example-runner" ref-component="app-hexColor-add"></div>
</data-scope>

# HexColorConfig 
Below options are not mandatory to use in the `@hexColor()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a title="conditionalExpression">[conditionalExpression](#conditionalExpression)</a></td><td>HexColor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a title="message">[message](#message)</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

HexColor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="hexColor-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="hexColor-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-hexColor-conditionalExpression" title="hexColor decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="hexColor-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-hexColor-message" title="hexColor decorators with message" key="message"></div>

# Complete hexColor Example

This Complete hexColor example which includes all the HexColorConfig properties will fulfil the requirement of scenarios 1, 2, 3,4 and 5

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-hexColor-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="hexColor-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="hexColor-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="hexColor-complete-html"></div>
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic hexColor Example

This Dynamic hexColor example which execute based on json passed. conditional expression with function would be not apply in dynamic hexColor example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-hexColor-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="hexColor-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="hexColor-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="hexColor-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="hexColor-dynamic-html"></div> 
# [/Html]
***
</data-scope>
