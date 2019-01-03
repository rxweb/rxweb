---
title: rule 
description: Rule validation decorator will allow the user to set custom rules on a particular field.
author: rxcontributorone
---

# When to use
Suppose you want to create a Address Info form, which contains fields like Zipcode, City, Country and you want the user to enter value based upon your custom rules. Here depending upon the requirement, these scenarios may arise..
<ol>
  <li>Allow Zipcode which is based on the custom rules.</li>
  <li>Apply rule validation on City field based on matched condition in the form, like if the Zipcode is '10001', then the zipCode must be a according to the rule (Used as a function).</li>
</ol>
Let's see how rule decorator fulfil the need.

# Basic rule Validation
First we need to create a Address Model and define a property of zipCode in the model to achieve the functional need of point 1.
<div component="app-code" key="rule-add-model"></div> 
Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="rule-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="rule-add-html"></div> 
<div component="app-example-runner" ref-component="app-rule-add"></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="rule-edit-component"></div> 
The below code is `employee-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="rule-edit-html"></div> 
<div component="app-example-runner" ref-component="app-rule-edit"></div>
***

# RuleConfig
Below options are not mandatory to use in the `@rule()` decorator. If needed then use the below options.

<table class="table table-bordered table-striped">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a href="#customRules" (click)='scrollTo("#customRules")' title="#customRules">customRules</a></td><td>customRules are used to set custom rules on a particular field. </td></tr>
<tr><td><a href="#conditionalExpression" (click)='scrollTo("#conditionalExpression")' title="conditionalExpression">conditionalExpression</a></td><td>rule validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.</td></tr>
</table>

## customRules 
Type :  `any[]` 

customRules are used to set custom rules on a particular field.

<div component="app-code" key="rule-matchValueExample-model"></div> 
<div component="app-example-runner" ref-component="app-rule-matchValue" title="rule decorators with matchValue" key="matchValue"></div>

## conditionalExpression 
Type :  `Function`  |  `string` 

rule validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

> Binding `conditionalExpression` with `Function` object.
<div component="app-code" key="rule-conditionalExpressionExampleFunction-model"></div> 
<div component="app-example-runner" ref-component="app-rule-conditionalExpression" title="rule decorators with conditionalExpression" key="conditionalExpression"></div>

# Complete rule Example

This Complete rule example which includes all the ArrayConfig properties will fulfil the requirement of scenarios 1, 2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-rule-complete"></div>
# [Model](#tab\completemodel)
<div component="app-code" key="rule-complete-model"></div> 
# [Component](#tab\completecomponent)
<div component="app-code" key="rule-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" key="rule-complete-html"></div> 
***

# Dynamic rule Example

This Dynamic rule example which execute based on json passed. conditional expression with function would be not apply in dynamic rule example. 

<div component="app-tabs" key="dynamic"></div>

[!TabGroup]
# [Example](#tab\dynamicexample)
<div component="app-example-runner" ref-component="app-rule-dynamic"></div>
# [Model](#tab\dynamicmodel)
<div component="app-code" key="rule-dynamic-model"></div>
# [Component](#tab\dynamiccomponent)
<div component="app-code" key="rule-dynamic-component"></div>
# [Json](#tab\dynamicjson)
<div component="app-code" key="rule-dynamic-json"></div>
# [Html](#tab\dynamichtml)
<div component="app-code" key="rule-dynamic-html"></div> 
***

