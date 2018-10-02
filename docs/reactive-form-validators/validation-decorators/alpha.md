---
title: Alpha Validation in Angular Reactive Forms
description: Alpha validation decorator will allow only alphabets to be entered. It will not allow any number or special character. If user tries to do so the property will become invalid. To use the alpha decorator on particular property.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a Country form, which contains fields like CountryName, CountryCode, StateName, StateCode and you want the user to enter only alphabets Here depending upon the requirement these scenarios may arise.
1.	Allow only alphabets in CountryCode without space.
2.	Allowing WhiteSpace in CountryName
3.	Apply alpha validation based on matched condition in the form, like if the CountryName  is ‘Australia’ then the StateCode value should be in alphabets.
4.	Adding Custom Message on StateName Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how alpha validator fulfil the need.
 
# Basic Alpha Validation
First we need to create a Country class and define a property of CountryCode in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\alpha\add\country.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\alpha\edit\country.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\alpha\add\alpha-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\alpha\edit\alpha-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\alpha\add\alpha-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\alpha\edit\alpha-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-alpha-add></app-alpha-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-alpha-edit></app-alpha-edit>

# AlphaConfig
Below options are not mandatory to use in the `@alpha()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[allowWhiteSpace](#allowwhitespace) | This will allow whitespace in particular control property.The default value is `false`. |
|[conditionalExpressions](#conditionalexpression) | Alpha validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## allowWhiteSpace 
Type :  `boolean` 

This will allow whitespace in particular control property.The default value is `false`.

[!TabGroup(?showHideCondition="allowWhiteSpaceShow")]
# [Model](#tab\allowWhiteSpacemodel)
[!code-typescript[](\assets\examples\alpha\allowWhiteSpace\address-info.model.ts)]
# [Component](#tab\allowWhiteSpaceComponent)
[!code-typescript[](\assets\examples\alpha\allowWhiteSpace\alpha-allow-white-space.component.ts)]
# [Html](#tab\allowWhiteSpaceHtml)
[!code-typescript[](\assets\examples\alpha\allowWhiteSpace\alpha-allow-white-space.component.html)]
***

[!example(?type=section&clickEventCode="allowWhiteSpaceShow=!allowWhiteSpaceShow")]
<app-alpha-allowWhiteSpace></app-alpha-allowWhiteSpace>

## conditionalExpressions 
Type :  `Function`  |  `string` 

AlphaNumeric validation should be applied if the condition is matched in the `conditionalExpressions` function. Validation framework will pass two parameters at the time of `conditionalExpressions` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpressions` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpressions")]
# [Model](#tab\conditionalExpressionsmodel)
[!code-typescript[](\assets\examples\alpha\conditionalExpressions\address-info.model.ts)]
# [Component](#tab\conditionalExpressionsComponent)
[!code-typescript[](\assets\examples\alpha\conditionalExpressions\alpha-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionsHtml)
[!code-typescript[](\assets\examples\alpha\conditionalExpressions\alpha-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpressions=!conditionalExpressions")]
<app-alpha-conditionalExpressions></app-alpha-conditionalExpressions>

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\alpha\message\address-info.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\alpha\message\alpha-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\alpha\message\alpha-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message")]
<app-alpha-message></app-alpha-message>

# Complete Alpha Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-alpha-complete></app-alpha-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\alpha\complete\address-info.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\alpha\complete\alpha-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\alpha\complete\alpha-complete.component.html)]
***
