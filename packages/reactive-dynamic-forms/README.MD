[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	


<h3>rxweb</h3>
Build Model Driven Dynamic Form Approach in Angular Reactive Form. 



# Prerequisites
Reactive Dynamic Forms will work in angular projects.

## Table of Contents

* [Step By Step Dynamic Reactive Form Design](#step-by-step)
* [Controls](#controls)
* [Static Binding](#static-binding)
* [Conditional Binding](#conditional-binding)
* [Cascading Dropdown](#cascading-dropdown)
* [Need Help](#need-help) 
* [Feature Request](#feature-request)
* [License](#license)

## Step By Step Dynamic Form Design
##### 1. Install Package
 First you need to install `@rxweb/reactive-form-validators` as the dynamic form package dependent on this package.
 
    > npm install @rxweb/reactive-form-validators
    
 Now, You have to install `@rxweb/reactive-dynamic-forms` for building the dynamic forms.
 
    > npm install @rxweb/reactive-dynamic-forms
    

##### 2. Register the Module
We have to register `ReactiveFormsModule` from `@angular/forms` package and then `RxReactiveFormsModule` as well as `RxReactiveDynamicFormsModule`  from the mentioned packages as below.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; // <-- #2 import module
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms'; // <-- #3 import module


import {AppComponent} from './app.component';

@NgModule({
  declarations:[AppComponent],
  imports:[ BrowserModule, 
	FormsModule,
	ReactiveFormsModule, 
	RxReactiveFormsModule,  
  RxReactiveDynamicFormsModule
	] 
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
```

##### 3. Design the Json
The second step is to define the json data which comes from the server. The Json data is stored in the form of `serverData`.

Just a quick start here we create textbox by mentioning `type` and `name`.

```js
serverData: Array<{ [key: string]: any }> = [{
            name:"firstName",
            type:"text"
        }]
```

##### 4. Create the Form
To Bind the formControl to the user interface, you have to define in the `uiBindings`.

> Note : If you want to change the order of the formControls in the user Interface. You must do it in `uiBindings`

```js
uiBindings:string[] = ["firstName"];
```

The Next Step is to create a form using `formGroup` method of `RxDynamicFormBuilder`. In that you pass the serverData and dynamicFormConfiguration as below.

```js
ngOnInit() {
     this.dynamicFormBuildConfig = this.formBuilder.formGroup(this.serverData,this.dynamicFormBuilderConfiguration)
  }
```

##### 5. Html Implementation
The Fourth and last step is to pass the html tag in the template using `rxweb-dynamic-form` and pass the dynamicFormBuildConfig as `rxDynamicForm` in the form tag

You must specify `viewMode` which can be basic, horizontal and advance, based on the bootstrap layout you want.

```html
<form [formGroup]="dynamicFormBuildConfig.formGroup">
        <div viewMode="basic" [rxwebDynamicForm]="dynamicFormBuildConfig" [uiBindings]="uiBindings">
        </div>      
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
```
***

## Controls
### TextBox
To set a control as a textbox pass `name` and `type` in serverData.
```js
    serverData = [
        {
            name: "firstName",
            type: "text",
            ui: {
                label: 'First Name'
            }
        }
    ]
 ``` 

### Dropdown
To bind a control as a dropdwon pass `source` in serverData.
```js
 serverData= [{
        name: "gender",
        type: "select",
        source: [{ value: 1, text: "Male" },{ value: 2, text: "Female" }],
        ui: {
            label: 'Gender',
            placeholder: 'Select',
        }
    }]
```
> Note : If you want to bind cascading dropdown please refer this [example](https://stackblitz.com/edit/angular-bs5yqt?file=src/app/dropdown-sync.component.ts)

### checkbox
To bind a control as a checkbox pass `source` in serverData.

```js
 serverData= [
        {
            name: "confirm",
            type: "checkbox",
            source: [{ value: 1, text: "I accept the terms and conditions" }]
        }
    ]
  ``` 
> Note : If you want to bind a multiselect checkbox please refer this [example](https://stackblitz.com/edit/angular-niperm?file=src/app/checkbox-multiselect.component.ts)    
  
### date
To set a control as a date pass `name` and `type` in serverData.

```js
serverData = [{
            name: "dateOfBirth",
             type: "date",
             ui: {
                label: 'Date Of Birth',                      
            }
        
    }]
 ```
### email
To set a control as a email pass `name` and `type` in serverData.

```js
 serverData = [{
            name: "email",
             type: "email",
             ui: {
                label: 'Email Address',                      
            }        
    }]
```

### file
To set a control as a file pass `name` and `type` in serverData.

```js
 serverData = [{
        name: "profilePhoto",
        type: "file",
        ui: {
            label: 'Profile Photo'
        }
    }]
```  

### password
To set a control as a password pass `name` and `type` in serverData.

```js
serverData = [{
        name: "password",
        type: "password",
        ui: {
            label: 'Password'
        }
    }]
```

### radio
To bind a control as a radio pass `source` in serverData.

```js
   serverData = [{
        name: "gender",
         type: "radio",
         source: [{ value: 1, text: "Male"},{ value: 2, text: "Female" }],
         ui: {
            label: 'Gender'                            
        }
    }]
```

### range
To set a control as a range pass `name` and `type` in serverData.

```js
serverData = [{
        name: "price",
        type: "range",
        ui: {
            label: 'Price'
        }
    }]
```

### textarea
To set a control as a textarea pass `name` and `type` in serverData.
```js
   serverData = [
        {
            name: "address",
            type: "textarea",
            ui: {
                label: 'Address'
            }
        }
    ]
```

### url
To set a control as a url pass `name` and `type` in serverData.
```js
   serverData = [{
        name: "url",
        type: "url",
        ui: {
            label: 'Website Url'
        }
    }]
```

## Static Binding
### Class
To apply css class on the particular control, you must pass it in class property.
```js
 serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "class":["form-control-lg"]
            }
        }]
```

### Description
description can be used inside ui binding to display description for the particular formControl in the dynamic-form, To set the description for a particular control object in your dynamic form, you can set the description property statically inside the ui property.
```js
  serverData = [{
            "name":"firstName",
            "type":"text",
            "ui":{
              "description":"Please Enter FirstName"
            }
        }]
```

### Disabled
disabled can be used inside ui binding of to disable the particular control object in the dynamic-form.
```js
    serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "disabled": true
            }
        }]  
```

### focus
focus can be used inside ui binding to set focus on particular control object in the dynamic-form.
```js
  serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "focus": true
            }
        }]
```
### hide
hide can be used inside ui feature to hide the particular control object in the dynamic-form.
```js
  serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "hide": true
            }
        },
        {
            name:"lastName",
            type:"text",
            "ui":{
              "label": "LastName"
            }
        }]
```
### label
label can be used inside ui binding of to generate a label in the dynamic-form.
```js
 serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "label": "FirstName"
            }
        }]
```

### placeholder
placeholder can be used inside ui binding to display placeholder for the particular control object in the dynamic-form.
```js
serverData = [{
            name:"firstName",
            type:"text",
            ui:{
              "placeholder": "FirstName"
            }
        }]
```

### readonly
readonly can be used inside ui binding to convert the particular control object in readonly state in your dynamic-form.
```js
 serverData = [{
            name:"firstName",
            type:"text",
            "ui":{
              "readonly": true
            }
        }]
```
### source
source can be used inside ui binding to bind the sourcedata in the particular control object in your dynamic-form, It can be used in radio, dropdown and checkbox.
```js
 serverData = [ {
      type: 'select',
      name: 'Skills',
      source: [{ text: "Angular", value: "1" }, { text: "MVC", value: "2" }, { text: "React", value: "3" }],
      ui: {
        label: 'Skills',
      }
    }]
```
### value
value property can be used in the ui binding to set a default value for particular control object.
```js
    serverData = [{
            name:"firstName",
            type:"text",            
            value: "John"
            
        }] 
```
## Conditional Binding

### Conditional Disable
To disable a control conditionally, You need to pass modelName and pass it into controlConfigModels along with formGroup method.
First we need to create a model class and apply condition into it.

user.model.ts
```js
import { FormControlConfig } from '@rxweb/reactive-dynamic-forms';

export class UserModel extends FormControlConfig {

    private _disabled: boolean;

    get disabled() {
        if (this.controlsConfig.age.value >= 18) {
            return false
        }
        else {
            return true
        }
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }
}
```

Pass the modelName in server json to apply the validation conditionally.

```js
serverData = [
        {
            name: 'age',
            type: 'text',
            ui: {
                label: 'Enter Your age'
            }
        },
        {
            name: 'licenseNumber',
            type: 'text',
            ui: {
                placeholder: "Enter License Number"
            },
            modelName: 'userModel'
        }

    ]
```

## Conditional placeholder
To bind placeholder on the particular control conditionally, You need to pass modelName and pass it into controlConfigModels along with formGroup method.

user.model.ts
```js
import { FormControlConfig } from '@rxweb/reactive-dynamic-forms';

export class UserModel extends FormControlConfig {

    private _placeholder: string;

    get placeholder() {
        if (this.controlsConfig.firstName.value) {
            return "Hi " +this.controlsConfig.firstName.value  + ", Please enter your bio"
        }
        else {
            return "Please enter your bio"
        }
    }

    set placeholder(value: string) {
        this._placeholder = value;
    }
}


```

Pass the modelName in server json to apply the validation conditionally.

```js
    serverData = [
        {
            name: 'firstName',
            type: 'text',
            ui: {
                label: 'Enter Your First Name'
            }
        },
        {
            name: 'bio',
            type: 'text',
            ui: {
                placeholder: "Enter bio"
            },
            modelName: 'userModel'
        }

    ]
 ```
## Cascading Dropdown
You can create cascading dropdown with sync and async source binding.

user.model.ts
```js
import { FormControlConfig } from "@rxweb/reactive-dynamic-forms"

export class SourceSyncConditionalModel extends FormControlConfig{

    private _filter: any[];
    
    set filter(value: any[]) {
        this._filter = value;
    }

    get filter() {
        return this._filter.filter(t => t.countryId == this.controlsConfig.country.value);
    }
}



```

Pass the modelName in server json to bind the cascading value.

```js
   serverData = [
    {
      name: "country", 
      type: "select", 
      source: [{ text: "India", value: 1 }, { text: "US", value: 2 }, { text: "Canada", value: 3 }], 
      ui: {
        label: 'Country',
        placeholder: 'select'
      }
    }, 
    {
      name: "state", 
      modelName: 'sourceSync', 
      type: "select", 
      filter: [{ text: "Gujarat", value: 1, countryId: 1 }, { text: "Delhi", value: 2, countryId: 1 }, { text: "NY", value: 3, countryId: 2 }], 
      ui: {
        label: 'State',
        placeholder: 'select'
      }
    }
  ]
 ```
 
Cascading Dropdown [Example](https://run.stackblitz.com/api/angular/v1?file=src/app/dropdown-sync.component.ts)

## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT
