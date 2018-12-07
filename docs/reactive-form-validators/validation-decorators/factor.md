---
title: factor 
description: factor validation {{validatorType}} will allow user to enter factor of a number which is called dividend.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form in which you want user to enter factor of a particular value which contains fields like firstNumber, secondNumber, ThirdNumber and fourthNumber. Here depending upon the requirement these scenarios may arise.
<ol>
   <li>Apply factor validation on firstNumber field by setting  dividend property as 50 so the validation will allow only factors of 50</li>
   <li>Apply factor validation based on matched condition in the form, like if the firstNumber  is `25` then the Fourthyear value should be factor.</li>
   <li>The Custom Message on ThirdNumber field.</li>
   <li>Apply factor validation based of dividend, dividend is the value for which factors are calculated.</li>
   <data-scope scope="['decorator','validator']">
   <li>Apply factor validation dynamically based on server rules.</li>
   </data-scope>
</ol>
Let’s see how factor {{validatorType}} fulfil the need.

# Basic Factor Validation

<data-scope scope="['decorator','template-driven']">
First we need to create a User Model class and define property of firstNumber and secondNumber in the model to achieve the functional need of point 1.
<div component="app-code" key="factor-add-model"></div> 
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
<div component="app-code" key="factor-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="factor-add-html"></div> 
<div component="app-example-runner" ref-component="app-factor-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="factor-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="factor-edit-html"></div> 
<div component="app-example-runner" ref-component="app-factor-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven']">
<div component="app-code" key="factor-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="factor-add-html"></div> 
<div component="app-example-runner" ref-component="app-factor-add"></div>
</data-scope>

# FactorConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@factor()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.factor()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven']">
Below options are not mandatory to use in the `factor` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#dividend" (click)='scrollTo("#dividend")' title="dividend">dividend</a></td><td>Dividend is the value for which factors are calculated.</td></tr>
<tr><td><a href="#fieldName" (click)='scrollTo("#fieldName")' title="fieldName">fieldName</a></td><td>Current property is matched with the particular property. so we need to pass particular property name.</td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>Factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## dividend 
Type :  `string` 
 Dividend is the value for which factors are calculated.

<div component="app-code" key="factor-dividendExample-model"></div> 
<div component="app-example-runner" ref-component="app-factor-dividend" title="factor {{validatorType}} with dividend" key="dividend"></div>

## fieldName 
Type :  `string` 
Current property is matched with the particular property. so we need to pass particular property name.

<div component="app-code" key="factor-fieldNameExample-model"></div> 
<div component="app-example-runner" ref-component="app-factor-fieldName" title="factor {{validatorType}} with fieldName" key="fieldName"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

factor validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="factor-conditionalExpressionExampleFunction-model"></div> 
> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="factor-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-factor-conditionalExpression" title="factor {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="factor-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-factor-message" title="factor {{validatorType}} with message" key="message"></div>

# Complete Factor Example

This Complete Factor example which includes all the FactorConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-factor-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven']">
# [Model](#tab\completemodel)
<div component="app-code" key="factor-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="factor-complete-component"></div>
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="factor-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic Factor Example

This Dynamic Factor example which execute based on json passed. conditional expression with function would be not apply in dynamic factor example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-factor-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="factor-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="factor-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="factor-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="factor-dynamic-html"></div> 
# [/Html]
***
</data-scope>
