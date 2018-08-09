---
title: Json Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/json
---
# json
json validation decorator will allow only Json to be entered. If user tries to enter any string except json then the property will become invalid. To use the json decorator on particular property.
 
# [Basic validation on JsonInfo add form  ](#tab/basic-validation-on-JsonInfo-add-form)
let's create a JsonInfo add form with json validation. The form will allow only json in the `FormControl` of `name`. 
Create JsonInfo data model and set the `json` decorator on `name` property.
<header class="header-tab-title">app/JsonInfo/json-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts?highlight=5)]
Create JsonInfo add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `JsonInfo` data model in `ngOnInit` method.
<header class="header-tab-title">app/json-info/add/json-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/json-info/add/json-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/json/rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.html)]

<h3>JsonInfo Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-json-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on JsonInfo edit  form](#tab/basic-validation-on-JsonInfo-edit-form)
let's create a JsonInfo edit form with json validation. The form will allow only json in the `FormControl` of `name`. 
Create JsonInfo data model and set the `json` decorator on `name` property.
<header class="header-tab-title">app/JsonInfo/json-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/rxweb-json-validation-edit-angular-reactive-form/src/app/json-info/json-info.model.ts?highlight=5)]
Create JsonInfo edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<JsonInfo>(JsonInfo,jsonInfo)`
<header class="header-tab-title">app/json-info/edit/json-info-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/rxweb-json-validation-edit-angular-reactive-form/src/app/json-info/edit/json-info-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/json-info/edit/json-info-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/json/rxweb-json-validation-edit-angular-reactive-form/src/app/json-info/edit/json-info-edit.component.html)]

<h3>JsonInfo Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-json-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# DefaultConfig 
Below options are not mandatory to use in the `@json()` decorator. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalexpression) | Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |

## conditionalExpression 
Type :  `Function`  |  `string` 

Json validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">json-info.model.ts (JsonInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts#L7-L11)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">json-info.model.ts (JsonInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts#L7-L11)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">json-info.model.ts (JsonInfo class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts#L13-L14)]


# json Validation Complete Example
# [JsonInfo Model](#tab/complete-json-info)
<header class="header-tab-title">app/json-info/json-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts)]

# [Address Info Add Component](#tab/complete-json-info-add-component)
<header class="header-tab-title">app/json-info/add/json-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-json-info-add-html-component)
<header class="header-tab-title">app/json-info/add/json-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/json/complete-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-json-validation-add-angular-reactive-form?embed=1&file=src/app/json-info/json-info.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic json Validation Complete Example
# [JsonInfo Model](#tab/dynamic-json-info)
<header class="header-tab-title">app/json-info/json-info.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/dynamic-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/json-info.model.ts)]

# [Address Info Add Component](#tab/dynamic-json-info-add-component)
<header class="header-tab-title">app/json-info/add/json-info-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/json/dynamic-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-json-info-add-html-component)
<header class="header-tab-title">app/json-info/add/json-info-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/json/dynamic-rxweb-json-validation-add-angular-reactive-form/src/app/json-info/add/json-info-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-json-validation-add-angular-reactive-form?embed=1&file=src/app/json-info/json-info.model.ts&hideNavigation=1&view=preview" width="100%" height="500">

---





