---
title: Url Validation in Angular Reactive Forms
description: Url validation decorator will check that value is url or not in the property. If user not enter url value then the property will become invalid. To use the url decorator on particular property.
author: rxcontributorone

---
# When to use
 Let’s assume that you are creating a User form, which contains fields like AdminWebsiteUrl,CustomerWebsiteUrl,MaintenanceWebsiteUrl and you want the user to enter valid url. Here depending upon the requirement these scenarios may arise.
1.  Adding AdminWebsiteUrl without any conditional expression.
2.	Apply url validation based on matched condition in the form, like if the adminWebsiteUrl is ‘https://google.co.in’ then the customerWebsiteUrl value should be in proper format of url .
3.	Adding Custom Message on MaintenanceWebsiteUrl Field.
4.	Apply dynamic validation, If the validation will be changed based on some criteria in the application.

# Basic url Validation
First we need to create a User class and define a property of AdminWebsiteUrl in the model to achieve the functional need of point 1.
[!code-typescript[](../../examples/reactive-form-validators/url/rxweb-url-validation-add-angular-reactive-form/src/app/web-site-info-model/web-site-info-model.model.ts?highlight=5)]

Now, we need to create a FormGroup in the component. To achieve this we need to add RxFormBuilder. The RxFormBuilder is an injectable service that is provided with the RxReactiveFormsModule. Inject this dependency by adding it to the component constructor.
Here we have covered Add and Edit form operations. 

# urlConfig
 Below options are not mandatory to use in the `@url()` decorator. If needed then use the below options.

|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 
Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 
To override the global configuration message and show the custom message on particular control property.

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]

# Complete url Numeric Example

# Dynamic url Numeric Example




