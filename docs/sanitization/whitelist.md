---
title: whitelist
description: Remove characters that do not appear in the whitelist.
author: ajayojha
category: sanitization
type:decorators
linktitle: whitelist
---
# Example  
let's create a user model and define a property of freeText in the model.
<div component="app-code" key="whitelist-add-model"></div> 

Through Angular FormBuilder service we create FormGroup in the component.

<div component="app-code" key="whitelist-add-component"></div> 
Next, we need to write html code.
<div component="app-code" key="whitelist-add-html"></div> 
<div component="app-example-runner" ref-component="app-whitelist-add"></div>
