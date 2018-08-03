---
title: Url Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/url
---
# url
Url validation decorator will check that value is url or not in the property. If user not enter url value then the property will become invalid. To use the url decorator on particular property.
 
# [Basic validation on WebSiteInfoModel add form  ](#tab/basic-validation-on-WebSiteInfoModel-add-form)
let's create a user add form with url validation. The form will check that `FormControl` of `adminWebsiteUrl` has url or not. 
Create user data model and set the url decorator on `adminWebsiteUrl` property.
<header class="header-tab-title">app/WebSiteInfoModel/web-site-info-model.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/rxweb-url-validation-add-angular-reactive-form/src/app/web-site-info-model/web-site-info-model.model.ts?highlight=5)]
Create user add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `User` data model in `ngOnInit` method.
<header class="header-tab-title">app/web-site-info-model/add/web-site-info-model-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/rxweb-url-validation-add-angular-reactive-form/src/app/web-site-info-model/add/web-site-info-model-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/web-site-info-model/add/web-site-info-model-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/url/rxweb-url-validation-add-angular-reactive-form/src/app/web-site-info-model/add/web-site-info-model-add.component.html)]

<h3>WebSiteInfoModel Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-url-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on WebSiteInfoModel edit  form](#tab/basic-validation-on-WebSiteInfoModel-edit-form)
let's create a user edit form with url validation. The form will check that `FormControl` of `adminWebsiteUrl` has url or not. 
Create user data model and set the url decorator on `adminWebsiteUrlS` property.
<header class="header-tab-title">app/WebSiteInfoModel/web-site-info-model.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/rxweb-url-validation-edit-angular-reactive-form/src/app/web-site-info-model/web-site-info-model.model.ts?highlight=5)]
Create user edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<WebSiteInfoModel>(WebSiteInfoModel,webSiteInfoModel)`
<header class="header-tab-title">app/web-site-info-model/edit/web-site-info-model-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/rxweb-url-validation-edit-angular-reactive-form/src/app/web-site-info-model/edit/web-site-info-model-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/web-site-info-model/edit/web-site-info-model-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/url/rxweb-url-validation-edit-angular-reactive-form/src/app/web-site-info-model/edit/web-site-info-model-edit.component.html)]

<h3>WebSiteInfoModel Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-url-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# DefaultConfig 
Below options are not mandatory to use in the `@url()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Url validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts#L7-L8)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">user.model.ts (User class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts#L10-L11)]


# url Validation Complete Example
# [User Model](#tab/complete-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/complete-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/url/complete-rxweb-url-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-url-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic url Validation Complete Example
# [User Model](#tab/dynamic-user)
<header class="header-tab-title">app/user/user.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/dynamic-rxweb-url-validation-add-angular-reactive-form/src/app/user/user.model.ts)]

# [Address Info Add Component](#tab/dynamic-user-add-component)
<header class="header-tab-title">app/user/add/user-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/url/dynamic-rxweb-url-validation-add-angular-reactive-form/src/app/user/add/user-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-user-add-html-component)
<header class="header-tab-title">app/user/add/user-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/url/dynamic-rxweb-url-validation-add-angular-reactive-form/src/app/user/add/user-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-url-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

<iframe src="http://gitlogin.azurewebsites.net/#!/issue/validator/url" width="100%" height="500">





