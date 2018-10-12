---
title: creditCard 
description: creditCard validation validator will check property value is creditcardtype or not, It will not allow to enter any value other than credit card format.
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
We need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

[!code-typescript[](\assets\examples\validators\creditCard\add\credit-card-add.component.ts?type=section)]

Next, we need to write html code.
[!code-typescript[](\assets\examples\validators\creditCard\add\credit-card-add.component.html?type=section)]

[!example(?title=creditCard validator for add Example)]
<app-creditCard-add-validator></app-creditCard-add-validator>

# CreditCardConfig
Below options are not mandatory to use in the `RxwebValidators.creditcard()` validator. If needed then use the below options.
|Option | Description |
|--- | ---- |
|[creditCardTypes](#creditcardtypes) | Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. |
|[conditionalExpression](#conditionalexpression) | Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## creditCardTypes 
Type :  `CreditCardType[]` 
Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. 

[!codeExample(?title=creditCardTypesExample)]

[!TabGroup(?showHideCondition="creditCardTypesShow")]
# [Component](#tab\creditCardTypesComponent)
[!code-typescript[](\assets\examples\validators\creditCard\creditCardTypes\credit-card-credit-card-types.component.ts)]
# [Html](#tab\creditCardTypesHtml)
[!code-typescript[](\assets\examples\validators\creditCard\creditCardTypes\credit-card-credit-card-types.component.html)]
***

[!example(?type=section&clickEventCode="creditCardTypesShow=!creditCardTypesShow")]
<app-creditCard-creditCardTypes-validator></app-creditCard-creditCardTypes-validator>


## conditionalExpression 
Type :  `Function`  |  `string`
Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!codeExample(?title=conditionalExpressionExampleFunction)]

[!codeExample(?title=conditionalExpressionExampleString)]

[!TabGroup(?showHideCondition="conditionalExpression")]
# [Component](#tab\conditionalExpressionComponent)
[!code-typescript[](\assets\examples\validators\creditCard\conditionalExpression\credit-card-conditional-expressions.component.ts)]
# [Html](#tab\conditionalExpressionHtml)
[!code-typescript[](\assets\examples\validators\creditCard\conditionalExpression\credit-card-conditional-expressions.component.html)]
***

[!example(?type=section&clickEventCode="conditionalExpression=!conditionalExpression"&title=creditCard validator with conditionalExpression)]
<app-creditCard-conditionalExpression-validator></app-creditCard-conditionalExpression-validator>

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 

[!codeExample(?title=messageExample)]

[!TabGroup(?showHideCondition="message")]
# [Component](#tab\messageComponent)
[!code-typescript[](\assets\examples\validators\alpha\message\credit-card-message.component.ts)]
# [Html](#tab\messageHtml)
[!code-typescript[](\assets\examples\validators\creditCard\message\credit-card-message.component.html)]
***

[!example(?type=section&clickEventCode="message=!message"&title=creditCard validator with custom message)]
<app-creditCard-message-validator></app-creditCard-message-validator>

# Complete CreditCard Example
[!TabGroup]
# [Example](#tab\completeexample)
<app-creditCard-complete-validator></app-creditCard-complete-validator>
# [Component](#tab\completecomponent)
[!code-typescript[](\assets\examples\validators\creditCard\complete\credit-card-complete.component.ts)]
# [Html](#tab\completehtml)
[!code-typescript[](\assets\examples\validators\creditCard\complete\credit-card-complete.component.html)]
***

# Dynamic CreditCard Example
[!TabGroup]
# [Example](#tab\dynamicexample)
<app-creditCard-dynamic-validator></app-creditCard-dynamic-validator>
# [Component](#tab\dynamiccomponent)
[!code-typescript[](\assets\examples\validators\creditCard\dynamic\credit-card-dynamic.component.ts)]
# [Html](#tab\dynamichtml)
[!code-typescript[](\assets\examples\validators\creditCard\dynamic\credit-card-dynamic.component.html)]
***