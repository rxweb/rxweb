---
title: Conditional Validation  
description: Conditional validation is used when the user wants to apply validation on the field depending upon the condition of some other field
author: rxcontributorone
category: decorators
type:decorators
linktitle: conditionalValidation
---     

# Conditional Validation.
In The large enterprise application there may need to validate the control based on some other control values. In such case conditional validation is applied on the field depending upon the input of the other field, If the condition is not fulfilled the validation will not be applied.  
 
By using conditional validation we can restrict the validation based upon the condition set according to the requirement. Conditional validation can be binded in two ways either by using function object or by using string datatype.Validation framework will pass two parameters at the time of conditionalexpression check.These two parameters are current formGroup value and root formGroup value.

For example, you are creating a user form having field of firstName and lastName and you want the field of lastName to be alphabets based on the firstName value ,like if the firstName field contains the value of 'John' then the lastName field should be alphabets.

Binding Conditional Expression with function object is used when the validation is fixed on the client side.

# Example
Start by creating fields firstName and lastName in the user-info.component.ts

[!code-typescript[](\app\conditional-validation\conditional-validation.ts)]

Next, we need to write html code.

[!code-typescript[](\app\conditional-validation\conditional-validation.html)]

***
