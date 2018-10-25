---
title: Better Way To Show Error Messages 
description: RxFormBuilder provide a property of `errorMessage` in every FormControl which will show the current error message of the control.
author: rxcontributortwo

---

## When To Use
Let's assume you are creating a form with some client side validations and you want to display error message according to the perticular validation. In that case, if you are using simple FormGroup then you have to use complex ngIf conditions for displaying those error message. 
 
### Old Way To Show Error Message
```html
<div *ngIf=" studentFormGroup.controls['firstName'].errors && (studentFormGroup.controls['firstName'].dirty || studentFormGroup.controls['firstName'].touched"></div>
```

## Better Way To Show Error Messages
To simplify these complex ngIf condition, you can generate a FormGroup via `RxFormBuilder`. RxFormBuilder provide a property of `errorMessage` in every FormControl which will show the current error message of the control. 


# Example

Start by creating model

[!code-typescript[](\app\betterWayToShowErrorMessage\better-way-to-show-error-message.model.ts)]

Now we need to declare fields in the user-info.component.ts

[!code-typescript[](\app\betterWayToShowErrorMessage\better-way-to-show-error-message.ts)]

Next, we need to write html code.

[!code-typescript[](\app\betterWayToShowErrorMessage\better-way-to-show-error-message.ts)]

***
