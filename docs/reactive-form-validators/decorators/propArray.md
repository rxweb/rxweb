---
title: propArray
description: PropArray is used to define an array of the instances of a class.
author: rxcontributortwo 
category: decorators
type: decorators
linktitle: propArray
---

# When to use
Suppose you want to create a User form, which contains fields like CourseName in `User` class,
 which is an array of the instances of a class `Course` and you want to add the `@required` validation, then you can use @propArray() for this.

Let's see how @propArray() decorator fulfil the need.

# Basic PropArray Decorator
First, we need to create a Course class and create a property of `courseName` in it of the type string. Create a User class and create a property of `courses` in it of the type `Array<Course>` using the @propArray() decorator with it.

<div component="app-code" key="propArray-add-model"></div> 
</data-scope>

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="propArray-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="propArray-add-html"></div> 
<div component="app-example-runner" ref-component="app-propArray-add"></div>

# Binding Server Property Name
If the client property name and server property name is different. Then to bind the server property name to client side using propArray.

<div component="app-example-runner" ref-component="app-propArray-server" title="Binding server side name with propArray" key="server"></div>

# Set Default Value
When you want to set the default value of the property, you have to set the default value in multiple components white creating the FormGroup,Instead of that use an efficient way to set default value,It should be applied via decorator on property.

<div component="app-example-runner" ref-component="app-propArray-default" title="Setting default value with propArray" key="default"></div>