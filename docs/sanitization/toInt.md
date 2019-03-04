---
title: toInt
description: Convert the input to an integer, or NAN if the input is not an integer.
author: ajayojha
category: sanitization
type:decorators
linktitle: toInt
---
# When to use
Suppose you want to the convert the value to the int
<ol class='showHideElement'>
   <li>Apply `toInt` sanitization on `amount` field</li>
   <li>Apply `toInt` sanitization on `totalAmount` represents the radix (the base in mathematical numeral systems).</li>
</ol>
Let's see how toInt sanitization fulfil the need.

# radix toInt Example
Let's create a user model and define a property of 'radix' in the model.
<div component="app-code" key="toInt-radix-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="toInt-radix-component"></div> 
Next, we need to write html code.
<div component="app-code" key="toInt-radix-html"></div> 
<div component="app-example-runner" ref-component="app-toInt-radix"></div>

# Complete toInt Example  
Let's create a user model and define a property of 'amount' in the model.
<div component="app-code" key="toInt-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="toInt-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="toInt-add-html"></div> 
<div component="app-example-runner" ref-component="app-toInt-add"></div>
