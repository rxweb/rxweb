---
title: CreditCard Validation in Angular Reactive Forms
description: creditCard validation decorator will check property value is creditcardtype or not. It will not allow to enter any value rather than credit card. If user tries to do so the property will become invalid. To use the credit card decorator on particular property.
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
[!code-typescript[](../../examples/reactive-form-validators/creditCard/rxweb-creditCard-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

# CreditCardConfig
Below options are not mandatory to use in the `@CreditCard()` decorator. If needed then use the below options.
|Option | Description |
|--- | ---- |
|[creditCardTypes](#creditcardtypes) | Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. |
|[conditionalExpression](#conditionalexpression) | Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## creditCardTypes 
Type :  `CreditCardType[]` 
Credit card type has different Card types e.g. Visa, AmericanExpress, Maestro, JCB, Discover, DinersClub, MasterCard. 
[!code-typescript[](../../examples/reactive-form-validators/creditCard/complete-rxweb-creditCard-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string`
Credit Card validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
[!code-typescript[](../../examples/reactive-form-validators/creditCard/complete-rxweb-creditCard-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)] 

[!code-typescript[](../../examples/reactive-form-validators/creditCard/complete-rxweb-creditCard-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 
[!code-typescript[](../../examples/reactive-form-validators/creditCard/complete-rxweb-creditCard-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

# Complete CreditCard Example

# Dynamic CreditCard Example




