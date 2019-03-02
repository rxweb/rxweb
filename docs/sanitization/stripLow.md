---
title: stripLow
description: Remove the characters with a numerical value < 32 and 127.
author: ajayojha
category: sanitization
type:decorators
linktitle: stripLow
---
# Example  
Let's create a user model and define a property of freeText in the model.
<div component="app-code" key="stripLow-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="stripLow-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="stripLow-add-html"></div> 
<div component="app-example-runner" ref-component="app-stripLow-add"></div>
