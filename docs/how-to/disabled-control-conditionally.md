---
title: Disabled Control Conditionally
author: rxcontributorone
category: how-to
type:tabs
linktitle: Best way to show error messages 
---
Showing error messages conditionally is a bit clumsy on the UI. As a standard angular approach, we are putting *ngIf conditional and write the error message. Once the condition is a success, then it will show the error message.
Here, we will manage the error message through the @error decorator. Where we have to set the conditional expressions.

Let's see how to show the error messages conditionally.

> Scenario : In our reactive form, we have two fields firstName and userName. The primary requirement is the submit is not disabled, whenever the user clicks on the submit at that time, it will show the error message of invalid form fields.

To Configure message globally in your application, Please refer <a href="/api/reactive-form-config">`ReactiveFormConfig`</a>

# Example
let's create a user model and define a property of freeText in the model.
<div component="app-code" key="error-conditionalMessage-model"></div> 

You have to use RxFormBuilder service to create FormGroup in the component.

<div component="app-code" key="error-conditionalMessage-component"></div> 
Next, we need to write html code. For showing error message you have to use 'errorMessage' property.
<div component="app-code" key="error-conditionalMessage-html"></div> 
<div component="app-example-runner" ref-component="app-disable-add"></div>

