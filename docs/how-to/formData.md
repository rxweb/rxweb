---
title: Post as FormData of Reactive Form value
author: rxcontributorone
category: how-to
type:tabs
linktitle: Post as FormData of Reactive Form value
---

As we are working large enterprise service oriented applications, There may need to post the data object as FormData instead of JSON.

Now, This can be easily done with the RxFormBuilder. This provides a 'toFormData()' method which converts the FormGroup value into the FormData. 

Let's create a FormGroup and use the method of 'toFormData' while posting the user data.

# Sending formData to server

To send the formData to server, You have to use RxFormBuilder service to create FormGroup in the component.

<data-scope scope="['decorator']">
First we need to create a user class and define properties in the model.
<div component="app-code" key="formadata-complete-model"></div> 
</data-scope>
<div component="app-code" key="formadata-complete-component"></div> 
Next, we need to write html code.
<div component="app-code" key="formadata-complete-html"></div> 
<div component="app-example-runner" ref-component="app-formadata-complete"></div>