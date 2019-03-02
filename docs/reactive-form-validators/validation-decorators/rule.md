---
title: rule 
description: Rule validation {{validatorType}} will allow the user to set custom rules on a particular field.
author: rxcontributorone
category: form-validations
type:tabs
linktitle: rule
---

# When to use
Suppose you want to create an Address Info form, which contains fields like Zipcode, countryName, stateName, cityName and colonyName and you want the user to enter value based upon your custom rules. Here depending upon the requirement, these scenarios may arise..
<ol class='showHideElement'>
  <li>Allow colonyName which is based on the custom rules.</li>
  <li>Apply rule validation on stateNAme field based on matched condition in the form, like if the Zipcode is '4000', then the stateName must be a according to the rule (Used as a function).</li>
  <li>Apply rule validation on cityNAme field based on matched condition in the form, like if the Zipcode is '4000', then the cityName must be a according to the rule (Used as a function).</li>
</ol>
Let's see how rule {{validatorType}} fulfil the need.

# Basic rule Validation
First we need to create a Address Model and define a property of zipCode and colonyName in the model to achieve the functional need of point 1.
<div component="app-code" key="rule-add-model"></div>
Through Angular FormBuilder service we create FormGroup in the component.
Here we have covered Add form operations.

<div component="app-code" key="rule-add-component"></div>
Next, we need to write html code.
<div component="app-code" key="rule-add-html"></div> 
<div component="app-example-runner" ref-component="app-rule-add"></div>
***

# RuleConfig
Below options are not mandatory to use in the `@rule()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a (click)='scrollTo("#customRules")' title="customRules">customRules</a></td><td>customRules are used to set custom rules on a particular field.</td></tr>
<tr><td><a (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>rule validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.</td></tr>
</table>

## customRules 
Type :  `Function[]` 

customRules are used to set custom rules on a particular field.

<div component="app-code" key="rule-customRulesExample-model"></div> 
<div component="app-example-runner" ref-component="app-rule-customRules" title="rule {{validatorType}} with customRules" key="customRules"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

rule validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work same as client function. For boolean variables, if you want to apply conditionalExpression, you must use `===` instead of `==`.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="rule-conditionalExpressionExampleFunction-model"></div> 

> Binding `conditionalExpression` with `string` object.
<div component="app-code" key="rule-conditionalExpressionExampleString-model"></div>

<div component="app-example-runner" ref-component="app-rule-conditionalExpression" title="rule {{validatorType}} with conditionalExpression" key="conditionalExpression"></div>

# Complete rule Example

This Complete rule example which includes all the ArrayConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-rule-complete"></div>
# [/Example]
# [Model](#tab\completemodel)
<div component="app-code" key="rule-complete-model"></div> 
# [/Model]
# [Component](#tab\completecomponent)
<div component="app-code" key="rule-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="rule-complete-html"></div>
# [/Html]
***

