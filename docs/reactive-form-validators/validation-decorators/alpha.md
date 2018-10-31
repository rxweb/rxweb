---
title: alpha
description: Alpha validation decorator will allow only alphabets to be entered. It will not allow any digit or special character.
author: rxcontributorone

---
# When to use
Suppose you want to create a Country form, which contains fields like CountryName, CountryCode, StateName, StateCode and you want the user to enter only alphabets Here depending upon the requirement these scenarios may arise.
1.	Allow only alphabets in CountryName without space.
2.	Allowing WhiteSpace in StateName
3.	Apply alpha validation based on matched condition in the form, like if the CountryName  is ‘Australia’ then the StateCode value should be in alphabets.
4.	Adding Custom Message on StateCode Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how alpha decorator fulfil the need.
 
# Basic Alpha Validation
First we need to create a Country class and define a property of CountryName in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\add\country.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\edit\country.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a `FormGroup` in the component. To achieve this we need to add `RxFormBuilder`. The `RxFormBuilder` is an injectable service that is provided with the `RxReactiveFormsModule`. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\add\alpha-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\edit\alpha-edit.component.ts)]
***

[conditional-paragraph?condition="tab_1=='basicedit'"]The below code is `country-data.json` for getting data from the server

[!code-typescript[](\assets\examples\alpha\edit\country-data.json?condition="tab_1=='basicedit'"&type=section)]


Next, we need to write html code.
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\add\alpha-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\edit\alpha-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab&title=alpha Decorator for add Example)]
<app-alpha-add></app-alpha-add>

[!example(?condition="tab_1=='basicedit'"&type=tab&title=alpha Decorator for edit Example)]
<app-alpha-edit></app-alpha-edit>

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

[!codeExample(?title=allowWhiteSpaceExample)]

[!TabGroup(?showHideCondition="allowWhiteSpaceShow")]
# [Model](#tab\allowWhiteSpacemodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\allowWhiteSpace\address-info.model.ts)]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\allowWhiteSpace\alpha-allow-white-space.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\allowWhiteSpace\alpha-allow-white-space.component.html)]
***

[!example(?type=section&clickEventCode="allowWhiteSpaceShow=!allowWhiteSpaceShow"&title=alpha decorator with allowWhiteSpace)]
<app-alpha-allowWhiteSpace></app-alpha-allowWhiteSpace>

## conditionalExpression 
Type :  `Function`  |  `string` 

Alpha validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\conditionalExpression\address-info.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\conditionalExpression\alpha-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\reactive-form-validators\decorators\alpha\conditionalExpression\alpha-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=alpha decorator with conditionalExpression)]
<app-alpha-conditionalExpression></app-alpha-conditionalExpression>

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
