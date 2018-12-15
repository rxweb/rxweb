---
title: ascii
description: ascii validation  {{validatorType}}  allows user to enter the input which is in the proper ascii format.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form in which you want the user to enter an  input which is in form of valid ascii code. The form contains fields like language, numberAsciiCode, alphabetAsciiCode and specialCharAsciiCode. depending on requirements these scenarios may arise..
<ol class='showHideElement'>
     <li>Allow valid ascii code input in field of specialCharAsciiCode and add custom error message to it.</li>
     <li>Apply validation on numberAsciiCode field based on matched condition in the form, like if the language is 'Java', then the numberAsciiCode must be an ascii code (Used as a function).</li>
     <li>Apply validation on specialCharAsciiCode field validation based on matched condition in the form, like if the language is 'Java', then the alphabetAsciiCode must be an ascii code (Used as a string datatype).</li>
     <data-scope scope="['decorator','validator']">
          <li>Apply ascii validation dynamically based on server rules.</li>
     </data-scope>
</ol>
Let's see how ascii  {{validatorType}}  fulfil the need.

# Basic Ascii Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a model and define a property of specialCharAsciiCode in the model to achieve the functional need of point 1.
<div component="app-code" key="ascii-add-model"></div> 
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
<div component="app-code" key="ascii-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="ascii-add-html"></div> 
<div component="app-example-runner" ref-component="app-ascii-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="ascii-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="ascii-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="ascii-edit-html"></div> 
<div component="app-example-runner" ref-component="app-ascii-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="ascii-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="ascii-add-html"></div> 
<div component="app-example-runner" ref-component="app-ascii-add"></div>
</data-scope>

# DefaultConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@ascii()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.ascii()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `ascii` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a   (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Ascii validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")'  title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Ascii validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object. 
<div component="app-code" key="ascii-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="ascii-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-ascii-conditionalExpression" title="ascii {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="ascii-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-ascii-message" title="ascii {{validatorType}} with message" key="message"></div>

# Complete Ascii Example

This Complete Ascii example which includes all the DefaultConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-ascii-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="ascii-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="ascii-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="ascii-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Ascii Example

This Dynamic Ascii example which execute based on json passed. conditional expression with function would be not apply in dynamic Ascii example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-ascii-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="ascii-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="ascii-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="ascii-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="ascii-dynamic-html"></div> 
# [/Html]
***
</data-scope>
