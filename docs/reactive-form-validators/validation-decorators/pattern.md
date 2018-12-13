---
title: pattern 
description: Pattern validation {{validatorType}} will allow user to enter the input which match the predefined pattern value parameter.
author: rxcontributortwo

---
# When to use
Suppose you want to create a User form, which contains fields like Username, Zipcode, Age and you want the user to enter the input which contains the predefined value. Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>
<li>Allow input which contains only Alphabet in Username.</li>
<li>Apply pattern validation based on matched condition in the form, like if the Username is `John`, then only the the pattern validation must be applied to Age value(i.e., Age field must only be a digit).</li>
<li>Adding Custom Message on Zipcode Field.</li>
<data-scope scope="['decorator','validator']">
<li>Apply pattern validation dynamically based on server rules.</li>
</data-scope>
</ol>
Let’s see how pattern {{validatorType}} fulfil the need.

# Basic Pattern Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a User class and define a property of UserName in the model to achieve the functional need of point 1.
<div component="app-code" key="pattern-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="pattern-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-add-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="pattern-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="pattern-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-edit-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="pattern-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="pattern-add-html"></div> 
<div component="app-example-runner" ref-component="app-pattern-add"></div>
</data-scope>

# PatternConfig 
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@pattern()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.pattern()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `pattern` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#expression")' title="expression">expression</a></td><td>Enter specific regex expression </td></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## expression 
Type :  `string` 

enter specific regex expression

<div component="app-code" key="pattern-expressionExample-model"></div> 
<div component="app-example-runner" ref-component="app-pattern-expression" title="pattern {{validatorType}} with expression" key="expression"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="pattern-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-pattern-message" title="pattern {{validatorType}} with message" key="message"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

Pattern validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="pattern-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object. 
<div component="app-code" key="pattern-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-pattern-conditionalExpression" title="pattern {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

# Complete pattern Example

This Complete pattern example which includes all the PatternConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-pattern-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="pattern-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="pattern-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="pattern-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic pattern Example

This Dynamic pattern example which execute based on json passed. conditional expression with function would be not apply in dynamic pattern example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-pattern-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="pattern-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="pattern-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="pattern-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="pattern-dynamic-html"></div> 
# [/Html]
***
</data-scope>
