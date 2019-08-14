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

* [Step By Step Design](#step-by-step)
* [More Documentation](#more-documentation)
* [Need Help](#need-help) 
* [Feature Request](#feature-request)
* [License](#license)

## Step By Step Design Dynamic Form
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

## More Documentation
	Documentation work is going :)...

  
## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT
