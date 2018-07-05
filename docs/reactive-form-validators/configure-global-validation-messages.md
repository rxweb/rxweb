---
title: Introduction to Razor Pages in ASP.NET Core
uid: configure-global-validation-messages
nOjha: aOjha-cgvm
---

## Configure Global Validation Messages
Apply global validation messages throughout the application, then configure the validation messages globaly(whenever application starts it will initialized automatically). 
Below is the example to configure the validation messages in 'ReactiveFromConfig'.

```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { `ReactiveFormConfig` } from '@rxweb/reactive-form-validators'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: './app.component.css'
})
export class AppComponent implements OnInit {
  
	constructor() {  }
  
	ngOnInit(): void 
	{
		ReactiveFormConfig.set({ 
            "validationMessage": {
                "required": "this field is required.",
				//.... set key name of validator name and assign the message of that particular key.
            }
        });
  }
}
```
