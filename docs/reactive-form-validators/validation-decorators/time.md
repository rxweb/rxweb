---
title: Time Validation in Angular Reactive Forms
description: time validation decorator will allow only time format to be entered. If user tries to enter any string except json then the property will become invalid. To use the json decorator on particular property.
author: rxcontributorone

---
# When to use
Let’s assume that you are creating a AttendanceDetail form, which contains field of EntryPlace,EntryTime,TotalTimeOut and Exit Time you want the user to enter valid time. Here depending upon the requirement these scenarios may arise.	
1.	Allow time in EntryTime without seconds.
2.	Allowing seconds in TotalTimeOut.
3.	Apply time validation based on matched condition in the form, like if the EntryPlace is ‘Lunch room’ then the EntryTime value should be in proper format of time .
4.	Adding Custom Message on exitTime Field.
5.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

# Basic time Validation
First we need to create a AttendanceDetail class and define a property of EntryTime in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/time/rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

# TimeConfig 
Below options are not mandatory to use in the `@time()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[allowSeconds](#allowseconds) | If you are allowed seconds in time format then you need to put this as true. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 
time validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L7-L8)]


## allowSeconds 
Type :  `boolean` 
If you are allowed seconds in time format then you need to put this as true.
[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L10-L11)]

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.
[!code-typescript[](../../examples/reactive-form-validators/time/complete-rxweb-time-validation-add-angular-reactive-form/src/app/attandance-detail/attandance-detail.model.ts#L13-L14)]


# Complete time Example

# Dynamic time Example







