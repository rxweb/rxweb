---
title: prop
description: It is used to define a property of a field in the model class.
author: rxcontributorone
category: decorators
type: decorators
linktitle: prop
---
# When to use
Suppose you want to create a user form, which contains fields like emailAddress and you want to use the prop decorator on that field.
Let's see how @prop() decorator fulfil the need.

# Basic prop decorator  
First we need to create a user model and define a property of emailAddress in the model to achieve the functional need.
<div component="app-code" key="prop-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="prop-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="prop-add-html"></div> 
<div component="app-example-runner" ref-component="app-prop-add"></div>

# Binding Name of server side property
If the client property name and server property name is different. Then to bind the server property name to client side.

<div component="app-example-runner" ref-component="app-prop-server" title="Binding server side name with prop" key="server"></div>

# Set Default Value
When you want to set the default value of the property, you have to set the default value in multiple components white creating the FormGroup,Instead of that use an efficient way to set default value,It should be applied via decorator on property.

<div component="app-example-runner" ref-component="app-prop-default" title="Setting default value with prop" key="default"></div>