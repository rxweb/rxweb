---
title: Post Image through formData
author: rxcontributorone
category: how-to
type:tabs
linktitle: Post Image through formData
---

To pass image data through FormData object to the server, Let's see the below steps, First of all we have to create a FormGroup through RxFormBuilder service that provides a `toFormData()` method, which we can use to convert the JSON value into the FormData. But our need is to pass the image data. So passing the image data we have to set  `writeFile="true"` attribute on the HTMLInputFileElement.

That's it. other things can be managed by the framework it self. Let's see the below code example.

# Sending Image through formData to server

To send the formData to server, You have to use RxFormBuilder service to create FormGroup in the component.

<data-scope scope="['decorator']">
First we need to create a user class and define properties in the model.
<div component="app-code" key="fileobject-complete-model"></div> 
</data-scope>
<div component="app-code" key="fileobject-complete-component"></div> 
Next, we need to write html code.
<div component="app-code" key="fileobject-complete-html"></div> 
<div component="app-example-runner" ref-component="app-fileobject-complete"></div>