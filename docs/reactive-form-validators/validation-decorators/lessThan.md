---
title: LessThan Validation in Angular Reactive Forms
description: Less than validation decorator will check that input property is less than value. If user tries to enter greater than equal to value then the property will become invalid. To use the lessThan decorator on particular property.
author: rxcontributortwo
---
# When to use?
Let’s assume that you are creating a User form, which contains fields like ObtainedMarks, PassingMarks, OtherMarks and you want the user to enter the numbers which are less than a related field. Here depending upon the requirement these scenarios may arise.
1.	Allow numbers which are less than a perticular field like in PassingMarks.
2.	Apply lessThan validation based on matched condition in the form, like if the ObtainedMarks is less than 35, then only the greater than validation will be applied to PassingMarks field.
3.	Adding Custom Message on OtherMarks Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

Let’s see how lessThan validator fulfil the need.

# Basic LessThan Validation
First we need to create a User class and define a property of Marks and PasdsingMarks with the requirement of PassingMarks must be less than Marks field in the model to achieve the functional need of point 1.

[!code-typescript[](../../examples/reactive-form-validators/lessThan/rxweb-lessThan-validation-add-angular-reactive-form/src/app/user/user.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this, we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.

# RelationalOperatorConfig 
message and conditionalExpression options are not mandatory but fieldName is mandatory to use in the `@lessThan()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[fieldName](#fieldname) | Less than validation should be applied based on the `fieldName` for compare other field value |
|[conditionalExpression](#conditionalexpression) | Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## fieldName 
Type :  `string` 

Less than validation should be applied based on the `fieldName` for compare other field value

[!code-typescript[](../../examples/reactive-form-validators/lessThan/complete-rxweb-lessThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## conditionalExpression 
Type :  `Function`  |  `string` 

Less than validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
[!code-typescript[](../../examples/reactive-form-validators/lessThan/complete-rxweb-lessThan-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# lessThan Validation Complete Example

# Dynamic lessThan Validation Complete Example
