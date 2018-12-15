---
title: creditCard 
description: creditCard validation {{validatorType}} will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.
author:  rxcontributortwo

---
# When to use
Supppose you want to create a user form and you want details like CreditCard and you have fields like CardType, VisaCard, AmericanExpress,MaestroCard, JCBcard, DiscoverCard, MasterCard  Here depending upon the requirement these scenarios may arise.
<ol class='showHideElement'>  
    <li>CreditCard Type has different Card Types like Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard.</li>
    <li>Apply CreditCard validation based on matched condition in the form, like if the CardType  is `visa` then the VisaCard value should be in VisaCard format.</li>
    <li>The Custom Message on VisaCard field.  </li>
    <data-scope scope="['decorator','validator']">
    <li>Apply creditCard validation dynamically based on server rules.</li>
    </data-scope>
</ol>

Let’s see how credit card {{validatorType}} fulfil the need.

# Basic CreditCard Validation
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create User model class define a property of CreditCardNo in the model to achieve the functional need of point 1.
<div component="app-code" key="creditCard-add-model"></div> 
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
<div component="app-code" key="creditCard-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="creditCard-add-html"></div> 
<div component="app-example-runner" ref-component="app-creditCard-add"></div>
# [/Add]
# [Edit](#tab\basicedit)
<div component="app-code" key="creditCard-edit-component"></div> 
The below code is `user-data.json` for getting data from the server
<div component="app-code" key="creditCard-edit-json"></div> 
Next, we need to write html code.
<div component="app-code" key="creditCard-edit-html"></div>
<div component="app-example-runner" ref-component="app-creditCard-edit"></div>
# [/Edit]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="creditCard-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="creditCard-add-html"></div> 
<div component="app-example-runner" ref-component="app-creditCard-add"></div>
</data-scope>

# CreditCardConfig
<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@creditCard()` decorator. If needed then use the below options.
</data-scope>
<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.creditCard()` validator. If needed then use the below options.
</data-scope>
<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `creditCard` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#creditCardTypes")' title="creditCardTypes">creditCardTypes</a></td><td>CreditCardTypes is used to define the type of CreditCard enterred by user.</td></tr>
<tr><td><a  (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>CreditCard validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## creditCardTypes 
Type :  `string[]` 

CreditCardTypes is used to define the type of CreditCard enterred by user.

<div component="app-code" key="creditCard-creditCardTypesExample-model"></div> 
Please refer creditcard with complete example which contains creditcardTypes parameter.

## conditionalExpression 
Type :  `Function`  |  `string`
Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

<data-scope scope="['validator','decorator']">
> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="creditCard-conditionalExpressionExampleFunction-model"></div> 
</data-scope>

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="creditCard-conditionalExpressionExampleString-model"></div> 

<div component="app-example-runner" ref-component="app-creditCard-conditionalExpression" title="creditCard {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

## message 
Type :  `string` 
To override the global configuration message and set the custom error message on respective FormControl 

<div component="app-code" key="creditCard-messageExample-model"></div>
<div component="app-example-runner" ref-component="app-creditCard-message" title="creditCard {{validatorType}} with message" key="message"></div>

# Complete CreditCard Example

This Complete CreditCard example which includes all the CreditCardConfig properties will fulfil the requirement of scenarios 1, 2 and 3 

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-creditCard-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="creditCard-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="creditCard-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="creditCard-complete-html"></div> 
# [/Html]
***

<data-scope scope="['decorator','validator']">
# Dynamic CreditCard Example

This Dynamic CreditCard example which execute based on json passed. conditional expression with function would be not apply in dynamic creditCard example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-creditCard-dynamic"></div>
# [/Example]
<data-scope scope="['decorator']">
# [Model](#tab\dynamicmodel)
<div component="app-code" key="creditCard-dynamic-model"></div>
# [/Model]
</data-scope>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="creditCard-dynamic-component"></div>
# [/Component]
# [Json](#tab\dynamicjson)
<div component="app-code" key="creditCard-dynamic-json"></div>
# [/Json]
# [Html](#tab\dynamichtml)
<div component="app-code" key="creditCard-dynamic-html"></div> 
# [/Html]
***
</data-scope>
