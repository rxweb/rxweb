---
title: async
description: Async validation {{validatorType}} will allow the field to validate the unique value from server for that perticular field. This async validation can be customized according to the need.
author: rxcontributortwo
category: form-validations
type:tabs
linktitle: async
---

# When to use
Suppose you want to create a user form, which contains field like userName and email and you want the user to enter unique Username. This unique value of username will be validated from server. You can make a custom validator function. Here depending upon the requirement these scenarios may arise. 

<ol class='showHideElement'>
    <li>Apply async validation on the userName field to check whether the input entered by the user is unique or not.</li>
    <li>You can customize this validator according to your need.</li>
</ol>
Let's see how async {{validatorType}} fulfil the need.

# Complete Async Example

This Complete Async example will fulfil the requirement of above scenario.

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-async-complete"></div>
# [/Example]
# [Model](#tab\completemodel)
<div component="app-code" key="async-complete-model"></div> 
# [/Model]
# [Component](#tab\completecomponent)
<div component="app-code" key="async-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="async-complete-html"></div> 
# [/Html]
***