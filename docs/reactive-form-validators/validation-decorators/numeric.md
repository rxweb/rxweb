---
title: numeric
description: numeric validation  {{validatorType}}  will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like DataType, integerNumber, integerNumber and you want the user to enter only numeric value depending on validation of the property. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
<li>Allow only positive numbers in integerNumber.</li>
<li>Allow only Negative numbers in integerNumber.</li>
<li>Allow decimal value in integerNumber  </li>
<li>Apply numeric validation based on matched condition in the form, like if the dataType  is ‘Integer’ then the number value should be Integer number.</li>
<li>Adding Custom Message on Negative value Field.</li>
<data-scope scope="['decorator','validator']">
<li>Apply numeric validation dynamically based on server rules.</li>
</data-scope>
</ol>
Let’s see how Numeric {{validatorType}} fulfil the need.

# Basic Numeric Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User class and define a property of Integer Number in the model to achieve the functional need of point 1.
<div component="app-code" key="numeric-add-model"></div> 
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
<div component="app-code" key="numeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-add-html"></div> 
<div component="app-example-runner" ref-component="app-numeric-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="numeric-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="numeric-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-edit-html"></div> 
<div component="app-example-runner" ref-component="app-numeric-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="numeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-add-html"></div> 
<div component="app-example-runner" ref-component="app-numeric-add"></div>
</data-scope>

# NumericConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@numeric()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.numeric()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `numeric` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#acceptValue")' title="acceptValue">acceptValue</a></td><td> To apply validation based on checking positive or negative value or both. </td></tr>
<tr><td><a   (click)='scrollTo("#allowDecimal")' title="allowDecimal">allowDecimal</a></td><td>This will allow decimal in particular control property.The default value is `false`.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## acceptValue 
Type :  `NumericValueType` 

<div component="app-code" key="numeric-acceptValueExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-acceptValue" title="numeric {{validatorType}} with acceptValue" key="acceptValue"></div>

## allowDecimal 
Type :  `boolean` 

This will allow decimal in particular control property.The default value is `false`.

<div component="app-code" key="numeric-allowDecimalExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-allowDecimal" title="numeric {{validatorType}} with allowDecimal" key="allowDecimal"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="numeric-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="numeric-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-numeric-conditionalExpression" title="numeric {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="numeric-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-message" title="numeric {{validatorType}} with message" key="message"></div>

# Complete numeric Example

This Complete numeric example which includes all the NumericConfig properties will fulfil the requirement of scenarios 1, 2, 3, 4 and 5.

<div component="app-tabs" key="complete"></div>

[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-numeric-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="numeric-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="numeric-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="numeric-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic numeric Example

This Dynamic numeric example which execute based on json passed. conditional expression with function would be not apply in dynamic numeric example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-numeric-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="numeric-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="numeric-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="numeric-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="numeric-dynamic-html"></div> 
# [/Html]
***
</data-scope>
