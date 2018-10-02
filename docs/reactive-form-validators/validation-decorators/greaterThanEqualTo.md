---
title: GreaterThanEqualTo Validation in Angular Reactive Forms
description: Greater than equal to validation decorator will check that input property is greater than equal to value. If user tries to enter less than value then the property will become invalid. To use the greaterThanEqualTo decorator on particular property. 
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you have fields like Age,VoterAge,OtherAge and you want user to enter Age such that VoterAge,OtherAge should be greater than or equal to Age Here depending upon the requirement these scenarios may arise.
1. Specify Age as fieldName such that greaterThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply greaterThanEqualTo validation based on matched condition in the form, like if the Age is ‘18’ then the VoterAge,OtherAge value should be Greater than or equal to 18.
3. Adding Custom Message on OtherAge Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how greaterThanEqualTo validator fulfil the need.

# Basic GreaterThanEqualTo Validation
First we need to create User model class define a property of Age and VoterAge  in the model to achieve the functional need of point 1. 
[!code-typescript[](../../examples/reactive-form-validators/greaterThanEqualTo/rxweb-greaterThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

#RelationalOperatorConfig

Below options are not mandatory to use in the `@greaterThanEqualTo()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Greater than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 
Greater than Equal to validation should be applied based on the `fieldName` for compare other field value 
> Binding `fieldName` with `string` datatype.
[!code-typescript[](../../examples/reactive-form-validators/greaterThanEqualTo/complete-rxweb-greaterThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 
Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
[!code-typescript[](../../examples/reactive-form-validators/greaterThanEqualTo/complete-rxweb-greaterThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string`
To override the global configuration message and show the custom message on particular control property. 
<header class="header-title">user.model.ts (User class property)</header>
[!code-typescript[](../../examples/reactive-form-validators/greaterThanEqualTo/complete-rxweb-greaterThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]



# Complete greaterThanEqualTo Example

# Dynamic greaterThanEqualTo Example

