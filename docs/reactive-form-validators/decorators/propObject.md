---
title: propObject
description: It is used to define an object of thes property of a field in the model class.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form, which contains fields like emailAddress,city and country.You want to create an object of the address class and access the properties of it in the user model class. 
Let's see how @propObject() decorator fulfil the need.

# Basic propObject decorator
First we need to create a user model and define a property of emailAddress in user class, create Address class in the user model and define property of city and country into it.Create propObject of address class in the user class to achieve the functional need.

<div component="app-code" class='showHideElement' key="propObject-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" class='showHideElement' key="propObject-add-component"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="propObject-add-html"></div> 
<div component="app-propObject-add" title="propObject Decorator for add Example"></div>

# Complete propObject Example

This Complete propObject example which will fulfil the requirement.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-propObject-complete"></div>
# [Model](#tab\completemodel)
<div component="app-code" class='showHideElement' key="propObject-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" class='showHideElement' key="propObject-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" class='showHideElement' key="propObject-complete-html"></div> 
***