---
title: propArray
description: PropArray is used to define an array of the instances of a class.
author: rxcontributortwo
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
