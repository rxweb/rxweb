---
title: toBoolean
description: Convert the input to a boolean.
author: ajayojha
category: sanitization
type:decorators
linktitle: toBoolean
---
# When to use
Suppose you want to the convert the value to the boolean
<ol class='showHideElement'>
   <li>Apply `toBoolean` sanitization on `active` field</li>
   <li>Apply `toBoolean` sanitization on `strictActive`. which strictly applied on which if input value is boolean only.</li>
</ol>
Let's see how toBoolean sanitization fulfil the need.

# Strict toBoolean Example
Let's create a user model and define a property of 'strictActive' in the model.
<div component="app-code" key="toBoolean-strict-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="toBoolean-strict-component"></div> 
Next, we need to write html code.
<div component="app-code" key="toBoolean-strict-html"></div> 
<div component="app-example-runner" ref-component="app-toBoolean-strict"></div>


# Complete toBoolean Example

This Complete Factor example which includes all the strict and without strict properties will fulfil the requirement of scenarios 1, 2.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-toBoolean-complete"></div>
# [/Example]
# [Model](#tab\completemodel)
<div component="app-code" key="toBoolean-complete-model"></div> 
# [/Model]
</data-scope>
# [Component](#tab\completecomponent)
<div component="app-code" key="toBoolean-complete-component"></div>
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="toBoolean-complete-html"></div> 
# [/Html]
***
