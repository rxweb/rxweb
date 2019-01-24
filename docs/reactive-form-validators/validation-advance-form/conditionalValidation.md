---
title: Conditional Validation  
description: Conditional validation is used when the user wants to apply validation on the field depending upon the condition of some other field
author: rxcontributorone
category: decorators
type:decorators
linktitle: conditionalValidation
---   

<data-scope scope="['validators']">
# Conditional Validation
In The large enterprise application while working with large forms with multiple validations on one formControl or there may arise need to validate the control based on some other control values. In such case conditional validation is applied on the field depending upon the input of the other field, If the condition is not fulfilled the validation will not be applied.  
 
By using conditional validation we can restrict the validation based upon the condition set according to the requirement. Conditional validation can be binded in two ways either by using function object or by using string datatype.Validation framework will pass two parameters at the time of conditionalexpression check.These two parameters are current formGroup value and root formGroup value.

For example, you are creating a user form having fields fullName,age,licenseNo and you want to apply conditional validation on licenseNo field such that age such be greater than equal to 18.You don’t need to do anything on the age field, the validation framework automatically manage when the value has been changed in age then automatically it will mark licenseNo field is valid or invalid.

Binding Conditional Expression with function object is used when the validation is fixed on the client side.

# Example

<div component="app-tabs" key="complete"></div>
[!TabGroup]
# [Example](#tab\completeexample)
<div component="app-example-runner" ref-component="app-conditional-complete"></div>
# [/Example]
# [Component](#tab\completecomponent)
<div component="app-code" key="conditional-complete-component"></div> 
# [/Component]
# [Html](#tab\completehtml)
<div component="app-code" key="conditional-complete-html"></div> 
# [/Html]
***
</data-scope>
