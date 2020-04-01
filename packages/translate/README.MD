[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	


The most simplified and elegant library for Internationalization in Angular Application. It's easy to integrate in the application without much learning curve or overhead of implementation.
Internationalize your application by following the two simple steps.

> Overall objective of developing this library is to integration must simple and faster. Use as much as possible available features of Angular instead of reinventing the wheel.

## Step By Step 

1 [Installation](#installation)
2 [Import Module](#import-module)
3 [Map Translate Property](#map-translate-property)

## Installation
```bash
$ npm install @rxweb/translate
```

## Import modules
After installing the package we have to register the ```RxTranslateModule``` in the main module of the application.
```js
import { NgModule } from '@angular/core';

import { RxTranslateModule } from "@rxweb/translate"

@NgModule({
  imports:      [ 
    RxTranslateModule.forRoot({filePath:'assets/i18n/{{language-code}}/{{translation-name}}.json',isCache:true})
  ],
})
export class AppModule { }
```
The ```filePath``` property is used for resolution of language content component wise at runtime.

## Map Translate Property
```js
import { Component, OnInit } from '@angular/core';
import { translate } from "@rxweb/translate"

@Component({
    templateUrl: './user.component.html'
})
export class UserComponent  {
    @translate({translationName:'user'}) multilingualContent:{[key:string]:any}
}
```
As per the above code, We have mapped ```@translate``` decorator on the property of ```multilingualContent```. This decorator resolves the internationalization data while initialization of the ```UserComponent```.

To know more, please refer the articles : 

## Contributing
If you are thinking to make rxweb framework better, that's truly great. You can contribute from a single character to core architectural work or significant documentation – all with the goal of making a robust rxweb framework which helps for everyone in their projects. Even if you are don’t feel up to writing code or documentation yet, there are a variety of other ways that you can contribute like reporting issues to testing patches.

Check out the <a href="https://docs.rxweb.io/community/where_to_start_contributing">docs</a> on how you can put your precious efforts on the rxweb framework and contribute in the respective area.

## Need Help
We highly recommend for help please ask your questions on our <a href="https://gitter.im/rxweb-project/rxweb?source=orgpage">gitter/rxweb-project</a> to get quick response from us. Otherthan our gitter channel you can ask your question on <a
href="https://stackoverflow.com/search?q=rxweb">StackOverflow</a> or <a href="https://github.com/rxweb/rxweb/issues/new/choose">create a new issue</a> in our Github Repository.

For, issue please refer our issue workflow wiki for better visibility our issue process.

## Feature Request
You can request a new feature by submitting an issue to our <a href="https://github.com/rxweb/rxweb">GitHub Repository</a>. If you would like to implement a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

# License
MIT
