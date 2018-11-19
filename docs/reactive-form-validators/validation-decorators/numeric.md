---
title: numeric
description: numeric validation decorator will check whether the value entered is a valid numberic value or not.The validation can be set according to requirement, it can be either decimal,negative number or positive number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a user form, which contains fields like DataType, integerNumber, integerNumber and you want the user to enter only numeric value depending on validation of the property. Here depending upon the requirement these scenarios may arise.
<ol>
<li>Allow only positive numbers in integerNumber.</li>
<li>Allow only Negative numbers in integerNumber.</li>
<li>Allow decimal value in integerNumber  </li>
<li>Apply numeric validation based on matched condition in the form, like if the dataType  is ‘Integer’ then the number value should be Integer number.</li>
<li>Adding Custom Message on Negative value Field.</li>
<li>Apply dynamic validation, If the validation will be changed based on some criteria in the application.</li>
</ol>
Let’s see how Numeric validator fulfil the need.

# Basic Numeric Validation

<data-scope scope="['decorator']">
First we need to create a User class and define a property of Integer Number in the model to achieve the functional need of point 1.
<div component="app-code" key="numeric-add-model"></div> 
</data-scope>
Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="numeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-add-html"></div> 
<div component="app-numeric-add" title="numeric Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="numeric-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-edit-html"></div> 
<div component="app-numeric-add" title="numeric Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="numeric-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="numeric-add-html"></div> 
<div component="app-numeric-add" title="numeric Decorator for add Example"></div>
</data-scope>

# NumericConfig
Below options are not mandatory to use in the `@numeric()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#value" (click)='scrollTo("#acceptValue")' title="acceptValue">acceptValue</a></td><td> To apply validation based on checking positive or negative value or both. </td></tr>
<tr><td><a href="#allowDecimal" (click)='scrollTo("#allowDecimal")' title="allowDecimal">allowDecimal</a></td><td>This will allow decimal in particular control property.The default value is `false`.</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom message on respective FormControl.</td></tr>
</table>

## acceptValue 
Type :  `NumericValueType` 

<div component="app-code" key="numeric-acceptValueExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-acceptValue" title="numeric decorators with acceptValue" key="acceptValue"></div>

## allowDecimal 
Type :  `boolean` 

This will allow decimal in particular control property.The default value is `false`.

<div component="app-code" key="numeric-allowDecimalExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-allowDecimal" title="numeric decorators with allowDecimal" key="allowDecimal"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Numeric validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="numeric-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="numeric-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="numeric-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="numeric-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-numeric-conditionalExpression" title="numeric decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="numeric-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-numeric-message" title="numeric decorators with message" key="message"></div>

# Complete numeric Example

This Complete numeric example which includes all the NumericConfig properties will fulfil the requirement of scenarios 1, 2, 3, 4 and 5.

<div component="app-tabs" key="complete"></div>

[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-numeric-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="numeric-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="numeric-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="numeric-complete-html"></div> 
***

# Dynamic numeric Example

This Dynamic numeric example which execute based on json passed. conditional expression with function would be not apply in dynamic numeric example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-numeric-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="numeric-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="numeric-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="numeric-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="numeric-dynamic-html"></div> 
***
