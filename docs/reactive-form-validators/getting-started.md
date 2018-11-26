---
title: Getting Started
uid: getting-started
---
## Introduction
The most powerful validation framework for angular based enterprise application. This provides all type of complex validation including dynamic validation likewise Reactive Form Validation, Template Driven Form Validation and Model Based Form Validation.

Angular forms provides good feature, but at some level code become messy to fulfil the complex scenarios, so the core objective is to provide optimum solution for basic, complex and dynamic validation for angular based enterprise applications. 
This validation framework is an extension of angular forms library, which will help to fulfil the need by following angular standard practices with less lines of code. 



## Quick Start
To start using rxweb reactive form validation framework, you need to install the package from npm/yarn.

## Import Modules
To work on reactive form it is require to import angular modules (FormsModule & ReactiveFormsModule) and for rxweb reactive form validation to import 'RxReactiveFormsModule' module and register that in the NgModule decorator imports property.
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import {AppComponent} from './app.component';

@NgModule({
  declarations:[AppComponent],
  imports:[ BrowserModule, 
	FormsModule,
	ReactiveFormsModule, 
	RxReactiveFormsModule
	] 
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Global Validation Messages
Apply global validation messages throughout the application, then configure the validation messages globaly(whenever application starts it will initialized automatically). 
Below is the example to configure the validation messages in 'ReactiveFromConfig'.
```js
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ReactiveFormConfig } from '@rxweb/reactive-form-validators'; 

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
## Basic Example
For basic example, I am covering only required validation with respective form based validation approaches.

### Reactive Form Based Validation 
Quick, to give you highlevel understanding about how rxweb validation apply on reactive forms.


### Template Form Based Validation
Quick, to give you highlevel understanding about how rxweb validation apply on template driven forms.

### Model Based Form Validation
This is the new way to validate the form based on your configured validation on model properties. To give you quick highlight about how validation will work based on configured validation on model properties.
You can use model based validation on reactive form and template driven form.


## Goal 
Provides all type of clientside validations.
Easy way to create Angular Reactive Form Group & Template Driven Form Validation with less lines of code.
Easy to create Dynamic Reactive Form / Template Driven Form.

