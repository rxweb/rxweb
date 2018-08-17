---
title: Range Validation in Angular Reactive Forms
description: Range validation decorator will allow only in specify range will be entered. If EmployeeInfo tries to enter any value without in range then the property will become invalid. To use the range decorator on particular property.
author: rxcontributorone

---
# When to use
 Let’s assume that you are creating a employeeInfo form, which contains field of employeeAge,employeeExperience,salary and you want the user to enter value in a specified range. Here depending upon the requirement these scenarios may arise.
1. Adding value which you want to restrict number in the property. The minimum number is 18 and maximum number is 60 . 
2. 	Apply range validation based on matched condition in the form, like if the age is greater than ‘25’ then the employeeExperience value should be between 2 to 20 .
3. Adding Custom Message on Salary Field.
4. Apply dynamic validation, If the validation will be changed based on some criteria in the application.

# Basic range Validation
First we need to create employeeInfo model class define a property of employeeAge in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/range/rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations.

# RangeConfig 
conditionalExpression and message options are not mandatory to use in the `@range()` decorator but the minimum number and maximum number is mandatory parameter. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[minimumNumber](#minimumnumber) | Minimum number is for define a minimum number of range |
|[maximumNumber](#maximumnumber) | Maximum number is for define a maximum number of range |

## conditionalExpression 
Type :  `Function`  |  `string`
Email validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.

[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L7-L8)]

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.
[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]

## minimumNumber 
Type :  `string` 
Minimum number is for define a minimum number of range
[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]

## maximumNumber 
Type :  `string` 
Maximum number is for define a maximum number of range
[!code-typescript[](../../examples/reactive-form-validators/range/complete-rxweb-range-validation-add-angular-reactive-form/src/app/employee-info/employee-info.model.ts#L10-L11)]

# Complete range Example

# Dynamic range Example




