[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	


The most simplified and elegant library for Internationalization in Angular Application. It's easy to integrate in the application without much learning curve or overhead of implementation.
Internationalize your application by following the two simple steps.

> Overall objective of developing this library is to integration must simple and faster. Use as much as possible available features of Angular instead of reinventing the wheel.  

* [Install Package](#install-package)
* [Automatic Translation Configuration Through CLI](#automatic-translation-configuration-through-cli)
* [Strongly Typed](#strongly-typed)
* [Binding](#binding)
  * [Simple Binding](#simple-binding)
    * [Property](#property)
    * [Nested Object Property](#nested-object-property)
  * [Scope Parameter Binding](#scope-parameter-binding)
	  * [Component Scope](#component-scope)
    * [On Demand Scope](#on-demand-scope)
  * [Conditional Scoped Binding](#conditional-scope-binding)
  * [Binding By Key Name](#binding-by-key-name)
  
* [Translation Loading Stratergy](#translation-loading-strategy)
  * [Loading Page Translation](#loading-page-translation)
  * [Loading Shared Component Translation](#loading-shared-component)
  * [Preload Translation Stratergy](#preload-translation-strategy)
* [Language Content Translation](#language-content-translation) 
  * [By URL With Page Title](#by-url-with-page)
	* [By Manual](#by-manual)
  * [Fixed Language](#fixed-language)
* [Cache](#cache)
  * [Active Language](#active-language)
  * [Language Wise](#language-wise) 
* [Power Tool For Translation](#power-tool-for-translation)		
  * [Create Missing Keys](#create-missing-keys)
  * [Create Missing Files](#create-missing-files)
  * [Create Interface](#create-interface)
  * [Optimization After Build](#optimization-after-build)

## Install Package
```bash
$ npm install @rxweb/translate
```

## Automatic Translation Configuration Through CLI
If you want to configure all the translation configuration automatically, you must install `@rxweb/cli`

```bash
$ npm install @rxweb/cli
```

![Image](https://docs.rxweb.io/assets/images/rxweb-install-1.gif)

<ul>
<li><b>rxweb.module.ts</b>: This file resolves RxTranslateModule which contains caching and filePaths.</li> 
<li><b>rxweb.json</b>: This file contains internationalization related configuration.</li>
<li><b>rxweb.webpack.dev.js</b>: This file webpack configuration file which exports TranslationWebpackPlugin module.</li>
<li><b>assets/i18n</b> : This folder contains multilingual data in their respective language folders</li>
<li><b>src/app/i18n-models</b>: This folder contains models for strongly typed binding.</li>
</ul>

## @Translate
Translate decorator is used for resolving the translation data by given name of ```translationName```.
Here is example code:
```js
@translate({translationName:'user'}) translation:{[key:string]:any}
```

Another approach, Which I liked most to assign the respective translation model to the translation object property.
```js
@translate({translationName:'user'}) translation:UserTranslation
```
The ```UserTranslation``` will be generated automatically based upon the JSON data.


## Binding

### Simple Binding
Simple Binding consists of two types ie. property binding and nested object property

global.en.json:
```js
{
   "applicationTitle":"User Registration",
  "text":{   
    "Description":"Full Name"
  }
}
```
### Translation Property Declaration
The first step is to add `@translate` decorator in the component with the multilingual name 

```js
export class AppComponent  {
    @translate() multilingualContent:{[key:string]:any}
}
```

#### Property Binding

In the component html it is done using syntax

```html
 <h1>  {{multilingualContent.applicationTitle}} </h1>
```

#### Nested Object Property
Binding nested level object
```html
<div>
      <p>{{multilingualContent.text.Description}}</p>
</div>
```

### Scope Parameter Binding

#### Component Scope
This can be done by interpolating the property name in the content string.

Now we are going to define the content with interpolating the property name of freeText. See the below JSON

user.en.json

```js
{
"enteredText": "You have entered text is: {{freeText}}"
}
```

In the component, use the `@translate` decorator and passing the translationName 

```js
export class UserComponent {
    
    @translate({ translationName: "user" }) multilingualContent: { [key: string]: any }

    freeText: string = "India";
}
```

And in The html

```js
<p>{{multilingualContent.text.enteredText}}</p>
```

#### On Demand Scope

While defining a JSON content string you have to use `{` for on-demand object value changes from the TS file. Here is the example text.

```js
{
"selectedRecord": "You have selected record of '{name}'"
}
```
Now in the component, you have to call the function like as below:

```js
selectUser(user) {
// the user object json would be like : {name:"John" }
let message = RxTranslateModule.tranlate(this.multilingualContent.text.selectedRecord, user);
}
```
### Conditional Scoped Binding
For showing the multilingual content conditionally based upon the keys defined in the JSON.

Let’s consider a case where we want to show some information about the countries according to the input name of the country. If the user enters a value of India then it must show the content in English or French according to the user preferred language. Other than India it must show the information about the World.
So, as per the above case, we have to define two properties in the JSON file, which are as below:

```js
{    
"indiaInfo": "India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world.",
"worldInfo": "The World is Planet Earth and all life on it, including human civilization. In a philosophical context, the world is the whole of the physical Universe, or an ontological world.",
}
```

We have defined two properties and we need one more property that returns the content based upon the passed condition. So we have to write the code in string format, the code same as we write in the TS file. Here is the example

```js
{
"conditionalText": "this.freeText == 'India' ? this.multilingualContent.indiaInfo : this.multilingualContent.worldInfo",
}
```

On the HTML side, you have to use conditionalText property for conditionally showing the content. Here is the output:

```Html
  <mark>{{multilingualContent.text.conditionalText}}</mark>
```

### Binding By Key Name
This is another approach to get the key value from the object property by key name.
Here is the JSON, which we get the ```userName``` value by calling the get method.
```json
{
	"text":{
		"userName":"User Name"
	}
}
```
Here is the HTML.
```Html
  {{multilingualContent.get("text.userName")}}
```



## Translation Loading Stratergy
Loading translated content can be done using lazy loading and using shared component.

### Loading Page Translation
Lazy loading can be achieved using `@rxweb/translate` by configuration routes in app routing.  
Let’s create a UserComponent and map the route into app routing.

```js
    {
        path: 'user',
        component: UserComponent
    }
```

In the UserComponent TS:

```js
export class UserComponent {

    @translate({ translationName: "user" })
    multilingualContent: { [key: string]: any }
   
}
```

### Loading Shared Component Translation 
Shared component can be achieved using `rxTranslate`. So let’s create a AddressComponent and map the translate decorator on the component property.

```js
export class AddressComponent {
    @translate({ translationName: "address" }) multilingualContent: { [key: string]: any };
}
```

Next step is to apply on the component element which is a rxTranslate directive. The rxTranslate directive will resolve the content before initializing the component.

```Html
<app-address *rxTranslate=""></app-address>
```

### Preload Translation Stratergy
preload translation strategy can be set to NoPreloading or PreloadAllModules with the RouterModule

```js
 [
   RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules  })
 ]
```

And in RxWebModule define preloadingStrategy true into RxTranslateModule.  

```js
  RxTranslateModule.forRoot({
        preloadingStrategy:true
        })
```

## Language Content Translation
Language content translation can be done based upon url, manual language change and fixed language

### By URL With Page Title
For loading language content url wise the routing is configured as below:

```js
const routes: Routes = [
    {
        path: '',
        redirectTo: "fr/login",
        pathMatch: "full"
    },
    {
        path: ':languageCode/login',
        component: LoginComponent
    }];
```
The component TS code:
```js
export class LoginComponent {
    @translate({ translationName: "login" })
    multilingualContent: { [key: string]: any } 

    constructor(private route: Router) {

    } 

    navigate(languageCode: string) {
        this.route.navigate([languageCode, "login"]);
    }
}
```
For language change in the HTML 

```Html
 <p class="small text-center text-gray-soft">
               <a class="blue-link" [class.active-language]="multilingualContent.languageCode == 'en'"  (click)="navigate('en')">English</a>
              <a class="blue-link" [class.active-language]="multilingualContent.languageCode == 'fr'" (click)="navigate('fr')">French</a>
  </p>
```

### By Manual
Manual change of language on user selection can be done using changeLanguage of RxTranslateModule as below:


```js
 changeLanguage(languageCode){
   RxTranslateModule.changeLanguage(languageCode)
 }
```

### Fixed Language
In case where the content needs a fixed language to be set. It is done by defining language in @translate decorator. 

```js
export class UserComponent {
    @translate({ translationName: "user", language:"en" }) multilingualContent: { [key: string]: any };
}
```

## Cache

### Active Language
For setting active language cache true in the application set cacheActiveLanguageObject true.

```js
RxTranslateModule.forRoot({
  cacheActiveLanguageObject:true
      })
```

### Language Wise
For allowing language wise cache in the application we can set cacheLanguageWiseObject true.

```js
          RxTranslateModule.forRoot({
            cacheLanguageWiseObject: true,
          })
```

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
