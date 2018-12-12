---
title: prop
description: It is used to define a property of a field in the model class.
author: rxcontributorone

---
# When to use
Suppose you want to create a user form, which contains fields like emailAddress and you want to use the prop decorator on that field.
Let's see how @prop() decorator fulfil the need.

# Basic prop decorator  
First we need to create a user model and define a property of emailAddress in the model to achieve the functional need.
<div component="app-code" class='showHideElement' key="prop-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" class='showHideElement' key="prop-add-component"></div> 
Next, we need to write html code.
<div component="app-code" class='showHideElement' key="prop-add-html"></div> 
<div component="app-prop-add" title="prop Decorator for add Example"></div>

# Complete prop Example

This Complete prop example which will fulfil the requirement.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-prop-complete"></div>
# [Model](#tab\completemodel)
<div component="app-code" class='showHideElement' key="prop-complete-model"></div> 
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" class='showHideElement' key="prop-complete-component"></div> 
# [Html](#tab\completehtml)
<div component="app-code" class='showHideElement' key="prop-complete-html"></div> 
***
