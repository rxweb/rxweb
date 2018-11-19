---
title: primeNumber
description: primeNumber validation decorator allows user to enter only prime number.
author: rxcontributortwo

---
# When to use
Suppose you want to create a numberInfo form, which contains fields like numberType, firstNumber, secondNumber and thirdNumber and you want the user to enter input which is a prime number. Here depending upon the requirement, these scenarios may arise..
<ol>
<li>Allow firstNumber which have proper primeNumber format and adding Custom Message on firstNumber.</li>
<li>Apply validation on secondNumber field based on matched condition in the form, like if the numberType is 'Prime', then the secondNumber must be a primeNumber (Used as a function).</li>
<li>Apply validation on thirdNumber field based on matched condition in the form, like if the numberType is 'Prime', then the thirdNumber must be a primeNumber (Used as a string datatype).</li>
<li>Apply dynamic validation, If the validation is changed based on some criteria in the application.</li>
</ol>
Let's see how primeNumber decorator fulfil the need.

# Basic primeNumber Validation

<data-scope scope="['decorator']">
First we need to create a numberInfo model and define a property of firstNumber in the model to achieve the functional need of point 1.
<div component="app-code" key="primeNumber-add-model"></div> 
</data-scope>
Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>
[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="primeNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="primeNumber-add-html"></div> 
<div component="app-primeNumber-add" title="primeNumber Decorator for add Example"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="primeNumber-edit-component"></div> 
The below code is `numberInfo-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="primeNumber-edit-html"></div> 
<div component="app-primeNumber-add" title="primeNumber Decorator for edit Example"></div>
***
</data-scope>

<data-scope scope="['validator','templateDriven']">
<div component="app-code" key="primeNumber-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="primeNumber-add-html"></div> 
<div component="app-primeNumber-add" title="primeNumber Decorator for add Example"></div>
</data-scope>

# BaseConfig
message and conditionalExpression are not mandatory to use in the `@primeNumber()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a href="#message" (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and show the custom message on particular control property.</td></tr>
</table>

## conditionalExpression 
Type :  `Function`  |  `string` 

primeNumber validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<div component="app-note" key="primeNumber-conditionalExpressionExampleFunction-model"></div>
<div component="app-code" key="primeNumber-conditionalExpressionExampleFunction-model"></div> 
<div component="app-note" key="primeNumber-conditionalExpressionExampleString-model"></div> 
<div component="app-code" key="primeNumber-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-primeNumber-conditionalExpression" title="primeNumber decorators with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

<div component="app-code" key="primeNumber-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-primeNumber-message" title="primeNumber decorators with message" key="message"></div>

# Complete primeNumber Example

This Complete primeNumber example which includes all the PatternConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-primeNumber-complete"></div>
<data-scope scope="['decorator']">
# [Model](#tab\completemodel)
<div component="app-code" key="primeNumber-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="primeNumber-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="primeNumber-complete-html"></div> 
***

# Dynamic primeNumber Example

This Dynamic primeNumber example which execute based on json passed. conditional expression with function would be not apply in dynamic primeNumber example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-primeNumber-dynamic"></div>
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="primeNumber-dynamic-model"></div>
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="primeNumber-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="primeNumber-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="primeNumber-dynamic-html"></div> 
***
