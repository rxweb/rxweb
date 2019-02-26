---
title: Disabled Control Conditionally
description: It is used for disabled control conditionally
category: decorators
type: decorators
linktitle: disabledControlConditionally
---
# When to use
We checked conditionalExpression with validators .but now there is scenario, based on condition we need to enable or disabled control. As a standard angular approach, we are putting `[disabled]` and its condition. Once the condition is a success, then it will disabled the control.
Here, we will manage the disabled control through the @disable decorator. Where we have to set the conditional expressions.

Let's see how to disabled control conditionally.

# Basic disable decorator  
> Scenario : In our reactive form, we have two fields modeType and fullName. whenever the user clicks on the Change Mode button at that time, it will disabled the control or enable control based on modeType = view or modeType = edit.

# Example
First we need to create a user model and define a property of modeType and fullName in the model to achieve the functional need.
<div component="app-code" key="disabledControlConditionally-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="disabledControlConditionally-add-component"></div> 

Next, we need to write html code. for toggle condition based on button click and enable or disabled control
<div component="app-code" key="disabledControlConditionally-add-html"></div> 
<div component="app-example-runner" ref-component="app-disabledControlConditionally-add"></div>
