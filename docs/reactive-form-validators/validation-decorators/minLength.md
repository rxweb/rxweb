---
title: MinLength Validation in Angular Reactive Forms
author: ajayojha
uid: validation-decorators/minLength
---
# minLength
MinLength validation decorator will allow only minimum length be entered upto value parameter. If user tries to enter any string that length exceed then the value then the property will become invalid. To use the minLength decorator on particular property.
 
# [Basic validation on Contact add form  ](#tab/basic-validation-on-Contact-add-form)
let's create a contact add form with minLength validation. The form will allow only minimum length upto value parameter in the `FormControl` of `countryName`. 
Create contact data model and set the minLength decorator on `countryName` property.
<header class="header-tab-title">app/Contact/contact.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts?highlight=5)]
Create contact add component and add `RxFormBuilder` service parameter in constructor. Create a `FormGroup` object of `Contact` data model in `ngOnInit` method.
<header class="header-tab-title">app/contact/add/contact-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/contact/add/contact-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.html)]

<h3>Contact Add Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-minlength-validation-add-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

# [Basic validation on Contact edit  form](#tab/basic-validation-on-Contact-edit-form)
let's create a contact edit form with minLength validation. The form will allow only minimum length upto value parameter in the `FormControl` of `countryName`. 
Create contact data model and set the minLength decorator on `countryName` property.
<header class="header-tab-title">app/Contact/contact.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-edit-angular-reactive-form/src/app/contact/contact.model.ts?highlight=5)]
Create contact edit component and add `RxFormBuilder` and `HttpClient` service parameter  in constructor. On `ngOnInit` method get request method for getting data from json or server and that data pass in `this.formBuilder.formGroup<Contact>(Contact,contact)`
<header class="header-tab-title">app/contact/edit/contact-edit.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-edit-angular-reactive-form/src/app/contact/edit/contact-edit.component.ts?highlight=17,21-22)]
<header class="header-tab-title">app/contact/edit/contact-edit.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minLength/rxweb-minLength-validation-edit-angular-reactive-form/src/app/contact/edit/contact-edit.component.html)]

<h3>Contact Edit Form Validation Example</h3>
<iframe src="https://stackblitz.com/edit/rxweb-minlength-validation-edit-angular-reactive-form?embed=1&file=src/styles.css&hideExplorer=1&hideNavigation=1&view=preview" width="100%" height="300">

---

# NumberConfig 
message and conditional expression options are not mandatory to use in the `@minLength()` decorator but value is mandatory. If needed then use the below options.


|Option | Description |
|--- | ---- |
|[conditionalExpression](#conditionalExpression) | Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function. |
|[message](#message) | To override the global configuration message and show the custom message on particular control property. |
|[value](#value) | enter value which you want to restrict string length in the property |

## conditionalExpression 
Type :  `Function`  |  `string` 

Min Length validation should be applied if the condition is matched in the `conditionalExpression` function. Validation framework will pass two parameters at the time of `conditionalExpression` check. Those two parameters are current `FormGroup` value and root `FormGroup` value. You can apply the condition on respective object value.
If there is need of dynamic validation means it is not fixed in client code, it will change based on some criterias. In this scenario you can bind the expression based on the expression value is coming from the web server in `string` format. The `conditionalExpression` will work as same as client function.
 
> Binding `conditionalExpression` with `Function` object.
<header class="header-title">contact.model.ts (Contact class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L13-L14)]

 
> Binding `conditionalExpression` with `string` datatype.
<header class="header-title">contact.model.ts (Contact class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L13-L14)]

## message 
Type :  `string` 

To override the global configuration message and show the custom message on particular control property.
 
<header class="header-title">contact.model.ts (Contact class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L10-L11)]

## value 
Type :  `number` 

enter value which you want to restrict string length in the property
 
<header class="header-title">contact.model.ts (Contact class property)</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts#L10-L11)]


# minLength Validation Complete Example
# [Contact Model](#tab/complete-contact)
<header class="header-tab-title">app/contact/contact.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts)]

# [Address Info Add Component](#tab/complete-contact-add-component)
<header class="header-tab-title">app/contact/add/contact-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.ts)]

# [Address Info Add Html Component](#tab/complete-contact-add-html-component)
<header class="header-tab-title">app/contact/add/contact-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minLength/complete-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.html)]

# [Working Example](#tab/complete-working-example)
<iframe src="https://stackblitz.com/edit/complete-rxweb-minlength-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---

# Dynamic minLength Validation Complete Example
# [Contact Model](#tab/dynamic-contact)
<header class="header-tab-title">app/contact/contact.model.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/dynamic-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/contact.model.ts)]

# [Address Info Add Component](#tab/dynamic-contact-add-component)
<header class="header-tab-title">app/contact/add/contact-add.component.ts</header>

[!code-typescript[](../../examples/reactive-form-validators/minLength/dynamic-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.ts)]

# [Address Info Add Html Component](#tab/dynamic-contact-add-html-component)
<header class="header-tab-title">app/contact/add/contact-add.component.html</header>

[!code-html[](../../examples/reactive-form-validators/minLength/dynamic-rxweb-minLength-validation-add-angular-reactive-form/src/app/contact/add/contact-add.component.html)]

# [Working Example](#tab/dynamic-working-example)
<iframe src="https://stackblitz.com/edit/dynamic-rxweb-minlength-validation-add-angular-reactive-form?embed=1&file=src/app/address-info/address&hideNavigation=1&view=preview" width="100%" height="500">

---






