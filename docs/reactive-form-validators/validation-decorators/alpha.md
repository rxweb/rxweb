---
title: alpha
description: Alpha validation decorator will allow only alphabets to be entered. It will not allow any digit or special character.
author: rxcontributorone

---
# When to use
Suppose you want to create a Country form, which contains fields like CountryName, CountryCode, StateName, StateCode and you want the user to enter only alphabets. Here depending upon the requirement these scenarios may arise.
1.	Allow only alphabets in CountryName without space.
2.	Allowing WhiteSpace in StateName
3.	Apply alpha validation based on matched condition in the form, like if the CountryName is 'India' then the StateCode value should be in alphabets.
4.	Adding Custom Message on StateCode Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how alpha decorator fulfil the need.
 
# Basic Alpha Validation
<data-scope scope="['decorator']">
First we need to create a Country class and define a property of CountryName in the model to achieve the functional need of point 1.
<div component="app-code" key="alpha-add-model"></div> 
</data-scope>
Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

<div component="app-tabs" key="basic-operations"></div>

[!TabGroup]
# [Add](#tab\basicadd)
<div component="app-code" key="alpha-add-component"></code-example> 
Next, we need to write html code.
<div component="app-code" key="alpha-add-html"></div> 
<div component="app-alpha-add" title=""></div>
# [Edit](#tab\basicedit)
<div component="app-code" key="alpha-edit-component"></code-example> 
The below code is `country-data.json` for getting data from the server
<div component="app-code" key="data-json"></div> 
Next, we need to write html code.
<div component="app-code" key="alpha-edit-html"></div> 
<div component="app-alpha-add" title="app-alpha-edit"></div>
***

# AlphaConfig
Below options are not mandatory to use in the `@alpha()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowwhitespace) | This will allow whitespace in particular control property. The default value is `false`. |
|[conditionalExpression](#conditionalExpression) | Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.

<div component="app-code" key="alpha-allowWhiteSpace-example-model"></div> 
<div component="app-example-runner" ref-component="app-alpha-allowWhiteSpace" title="app-alpha-edit" key="allowWhiteSpace"></div>


## conditionalExpression 
Type :  `Function`  |  `string` 

Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.



## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\message\address-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\message\alpha-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\message\alpha-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=alpha decorator with custom message)]
<app-alpha-message></app-alpha-message>

# Complete Alpha Example

This Complete Alpha example which includes all the AlphaConfig properties will fulfil the requirement of scenarios 1, 2, 3 and 4.

[!TabGroup]
# [Example](#tab\completeexample)
<app-alpha-complete></app-alpha-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\complete\address-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\complete\alpha-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\complete\alpha-complete.component.html)]
***

# Dynamic Alpha Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-alpha-dynamic></app-alpha-dynamic>
# [Model](#tab\dynamicmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\dynamic\address-info.model.ts)]
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\dynamic\alpha-dynamic.component.ts)]
# [Json](#tab\dynamicjson)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\dynamic\dynamic.json)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\dynamic\alpha-dynamic.component.html)]
***
