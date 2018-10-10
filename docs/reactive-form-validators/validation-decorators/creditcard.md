---
title: creditCard 
description: creditCard validation decorator will check property value is creditcardtype or not, It will not allow to enter any value rather than credit card. If user tries to do so the property will become invalid.
author:  rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you want details like CreditCard and you have fields like CardType,VisaCard,AmericanExpress,MaestroCard,JCBcard,DiscoverCard,MasterCard  Here depending upon the requirement these scenarios may arise.  
1.  CreditCard Type has different Card Types like Visa,AmericanExpress,Maestro,JCB,Discover,DinersClub,MasterCard.
2. 	Apply CreditCard validation based on matched condition in the form, like if the CardType  is ‘visa’ then the VisaCard value should be in VisaCard format.
3.  The Custom Message on VisaCard field.  
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how credit card validator fulfil the need.

# Basic CreditCard Validation
First we need to create User model class define a property of CreditCardNo in the model to achieve the functional need of point 1.
[!code-typescript[](\assets\examples\creditCard\add\user.model.ts?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\creditCard\edit\user.model.ts?condition="tab_1=='basicedit'"&type=section)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!TabGroup]
# [Add](#tab\basicadd)
[!code-typescript[](\assets\examples\creditCard\add\credit-card-add.component.ts)]
# [Edit](#tab\basicedit)
[!code-typescript[](\assets\examples\creditCard\edit\credit-card-edit.component.ts)]
***

Next, we need to write html code.
[!code-typescript[](\assets\examples\creditCard\add\credit-card-add.component.html?condition="tab_1=='basicadd'"&type=section)]
[!code-typescript[](\assets\examples\creditCard\edit\credit-card-edit.component.html?condition="tab_1=='basicedit'"&type=section)]

[!example(?condition="tab_1=='basicadd'"&type=tab)]
<app-creditCard-add></app-creditCard-add>

[!example(?condition="tab_1=='basicedit'"&type=tab)]
<app-creditCard-edit></app-creditCard-edit>

# CreditCardConfig
Below options are not mandatory to use in the `@CreditCard()` decorator. If needed then use the below options.
|Option | Description |
|--- | ---- |
|[creditCardTypes](#creditcardtypes) | Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. |
|[conditionalExpression](#conditionalexpressions) | Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## creditCardTypes 
Type :  `CreditCardType[]` 
Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. 

[!TabGroup(?showHideCondition="creditCardTypesShow")]
# [Model](#tab\creditCardTypesmodel)
[!code-typescript[](\assets\examples\creditCard\creditCardTypes\user.model.ts)]
# [Component](#tab\creditCardTypesComponent)
[!code-typescript[](\assets\examples\creditCard\creditCardTypes\credit-card-credit-card-types.component.ts)]
# [Html](#tab\creditCardTypesHtml)
[!code-typescript[](\assets\examples\creditCard\creditCardTypes\credit-card-credit-card-types.component.html)]
***

[!example(?type=section&clickEventCode="creditCardTypesShow=!creditCardTypesShow")]
<app-creditCard-creditCardTypes></app-creditCard-creditCardTypes>


## conditionalExpression 
Type :  `Function`  |  `string`
Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Model](#tab\conditionalExpressionmodel)
[!code-typescript[](\assets\examples\creditCard\conditionalExpression\user.model.ts)]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\creditCard\conditionalExpression\credit-card-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\creditCard\conditionalExpression\credit-card-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=creditCard decorator with conditionalExpression)]
<app-creditCard-conditionalExpression></app-creditCard-conditionalExpression>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!TabGroup(?showHideCondition="message")]
# [Model](#tab\messageModel)
[!code-typescript[](\assets\examples\creditCard\message\user.model.ts)]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\alpha\message\credit-card-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\creditCard\message\credit-card-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=creditCard decorator with custom message)]
<app-creditCard-message></app-creditCard-message>

# Complete CreditCard Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-creditCard-complete></app-creditCard-complete>
# [Model](#tab\completemodel)
[!code-typescript[](\assets\examples\creditCard\complete\user.model.ts)]
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\creditCard\complete\credit-card-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\creditCard\complete\credit-card-complete.component.html)]
***
