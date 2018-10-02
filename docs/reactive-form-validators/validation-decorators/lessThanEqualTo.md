---
title: LessThanEqualTo Validation in Angular Reactive Forms
description: Less than equal to validation decorator will check that input property is less than equal to value. If user tries to enter greater than value then the property will become invalid. To use the lessThanEqualTo decorator on particular property.
author: rxcontributorone

---
# When to use
Let's assume that you are creating a user form and you have fields like TotalMarks,ObtainedMarks,OtherMarks and you want user to enter ObtainedMarks,OtherMarks such that they should be less than or equal to TotalMarks Here depending upon the requirement these scenarios may arise
1. Specify TotalMarks as fieldName such that LessThanEqualTo validation should be applied to the fieldname for comparing other fields.
2. Apply LessThanEqualTo validation based on matched condition in the form, like if the TotalMarks is ‘100’ then the ObtainedMarks,OtherMarks value should be less than or equal to 100.
3. Adding Custom Message on OtherMarks Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.


Let’s see how lessThanEqualTo validator fulfil the need.

# Basic LessThanEqualTo Validation
First we need to create User model class define a property of Marks and TotalMarks model to achieve the functional need of point 1. 
[!code-typescript[](../../examples/reactive-form-validators/lessThanEqualTo/rxweb-lessThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 


# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@lessThanEqualTo()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Less than Equal to validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |


## fieldName 
Type :  `string` 
Less than Equal to validation should be applied based on the `fieldName` for compare other field value. 
[!code-typescript[](../../examples/reactive-form-validators/lessThanEqualTo/complete-rxweb-lessThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 
Less than Equal to validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. 
[!code-typescript[](../../examples/reactive-form-validators/lessThanEqualTo/complete-rxweb-lessThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]


## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property. 
[!code-typescript[](../../examples/reactive-form-validators/lessThanEqualTo/complete-rxweb-lessThanEqualTo-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]

# Complete lessThanEqualTo Example

# Dynamic lessThanEqualTo Example




 




