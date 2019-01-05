---
title: unique
description: Unique validation {{validatorType}} is used to validate unique input based on formArray.
author: rxcontributortwo
category: form-validations
type:tabs
linktitle: unique
---

# When to use
Suppose you want to create a Employee form, which contains fields like fullName, skillName, projectDomain, companyName and hobbies and you want the user to enter unique values which are not previously mentioned in the array. Here depending upon the requirement these scenarios may arise.
<ol class = 'showHideElement'>
<li>Apply unique validation on skillName field.</li>
<li>Apply unique validation based on matched condition in the form, like if the fullName is 'Bharat Patel' then the projectDomain input values must be unique.</li>
<li>Apply unique validation based on matched condition in the form, like if the fullName is 'Bharat Patel' then the companyName input values must be unique.</li>
<li>Adding Custom Message on hobbies Field.</li>
	<data-scope scope="['decorator','validator']">
		<li>Apply unique validation dynamically based on server rules. </li>
	</data-scope>
</ol>

Let's see how unique {{validatorType}} fulfil the need.

# Basic Unique Validation

<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
First we need to create a Employee class and define a property of skillName in the model to achieve the functional need of point 1.
<div component="app-code" key="unique-add-model"></div> 
</data-scope>
Through Angular FormBuilder service we create FormGroup in the component.

<data-scope scope="['decorator, validator','template-driven-directives','template-driven-decorators']">
Here we have covered Add form operations. 
</data-scope> 

<data-scope scope="['decorator']">
<div component="app-tabs" key="basic-operations"></div>

[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="unique-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="unique-add-html"></div> 
<div component="app-example-runner" ref-component="app-unique-add"></div>
# [/Add]
***
</data-scope>

<data-scope scope="['validator','template-driven-directives','template-driven-decorators']">
<div component="app-code" key="unique-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="unique-add-html"></div> 
<div component="app-example-runner" ref-component="app-unique-add"></div>
</data-scope>

# UniqueConfig

<data-scope scope="['decorator']">
Below options are not mandatory to use in the `@unique()` decorator. If needed then use the below options.
</data-scope>

<data-scope scope="['validator']">
Below options are not mandatory to use in the `RxwebValidators.unique()` validator. If needed then use the below options.
</data-scope>

<data-scope scope="['template-driven-directives','template-driven-decorators']">
Below options are not mandatory to use in the `unique` validation. If needed then use the below options.
</data-scope>

<table class="table table-bordered table-striped showHideElement">
<tr><th>Option</th><th>Description</th></tr>
<tr><td><a  (click)='scrollTo("#additionalValidation")' title="additionalValidation">additionalValidation</a></td><td>if user wants to validate the colum based on some other values of the row as well, then additional validation comes into the picture</td></tr>
<tr><td><a  (click)='scrollTo("#message")' title="message">message</a></td><td>To override the global configuration message and set the custom error message on respective FormControl</td></tr>
</table>

## additionalValidation
Type :  `Function`

If user wants to validate the colum based on some other values of the row as well, then additional validation comes into the picture

<div component="app-code" key="unique-additionalValidationExample-model"></div> 
<div component="app-example-runner" ref-component="app-unique-additionalValidation" title="unique {{validatorType}} with additionalValidation" key="additionalValidation"></div>

## message 
Type :  `string` 

To override the global configuration message and set the custom message on respective FormControl.

<div component="app-code" key="unique-messageExample-model"></div> 
<div component="app-example-runner" ref-component="app-unique-message" title="unique {{validatorType}} with message" key="message"></div>


# Complete Unique Example

This Complete Unique example which includes all the BaseConfig properties will fulfil the requirement of scenarios 1 ,2 and 3.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-unique-complete"></div>
# [/Example]
<data-scope scope="['decorator','template-driven-directives','template-driven-decorators']">
# [Model](#tab\completemodel)
<div component="app-code" key="unique-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="unique-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="unique-complete-html"></div> 
# [/Html]
***
