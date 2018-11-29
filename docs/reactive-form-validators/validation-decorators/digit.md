---
title: digit
description: Digit validation  {{validatorType}}  will allow only digits to be entered, It will not allow any alphabets or special character.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like Age, PhoneNumber, MobileNumber and you want the user to enter only numbers. Here depending upon the requirement these scenarios may arise.
<ol>
	<li>Allow only numbers in Age.</li>
	<li>Apply digit validation based on matched condition in the form, like if the Age is greater than equal to 25 then only the digit validation will be applied to the PhoneNumber value.</li>
	<li>Adding Custom Message on MobileNumber Field.</li>
	<li>Apply digit validation dynamically based on server rules.</li>
</ol>
Let’s see how digit validator fulfil the need.

# Basic digit Validation
<data-scope scope="['decorator']">
First we need to create a User class and define a property of Age in the model to achieve the functional need of point 1.
<div component="app-code" key="digit-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
<data-scope scope="['decorator']">
Here we have covered Add and Edit form operations. 
</data-scope>

<data-scope scope="['validator','template-driven']">
Here we have covered Add form operations. 
</data-scope>

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="digit-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="digit-add-html"></div> 
<div component="app-example-runner" ref-component="app-digit-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="digit-edit-component"></div>
The below code is `user-data.json` for getting data from the server 
<div component="app-code" key="digit-edit-json"></div>  
Next, we need to write html code.
<div component="app-code" key="digit-edit-html"></div> 
<div component="app-example-runner" ref-component="app-digit-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="digit-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="digit-add-html"></div> 
<div component="app-example-runner" ref-component="app-digit-add"></div>
</data-scope>

# DigitConfig 
Below options are not mandatory to use in the `@digit()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a   (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a   (click)='scrollTo("#message")' title="message">Message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

Digit validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="digit-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="digit-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-digit-conditionalExpression" title="digit decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="digit-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-digit-message" title="digit decorators with message" key="message"></div>

# Complete digit Example

This Complete digit example which includes all the DigitConfig properties will fulfil the requirement of scenarios 1, 2 and 3

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-digit-complete"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="digit-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="digit-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="digit-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Digit Example

This Dynamic Alpha example which execute based on json passed. conditional expression with function would be not apply in dynamic Digit example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-digit-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="digit-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="digit-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="digit-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="digit-dynamic-html"></div> 
# [/Html]
***
</data-scope>