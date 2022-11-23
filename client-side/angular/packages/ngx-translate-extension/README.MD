[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)


### An extensible library of ngx-translate for Angular Internationalization with more than 50+ [spectacular features](https://docs.rxweb.io/ngx-translate-extension/en/playground) 🌈.



> The objective of this library to extend the features of ngx-translate, fix the bugs which are opened since long on ngx-translate project. 



### For existing ngx-translate developer community
<img src="https://github.com/rxweb/rxweb.io/blob/master/src/assets/images/ngx-translate-extension.gif?raw=true"/>

And it's Done.

#### How can be sure that after replacing the package name, everything will work as expected?

We have copied the spec from [@ngx-translate/core](https://github.com/ngx-translate/core/tree/master/projects/ngx-translate/core/tests) project and follows the above mentioned steps, [it's working as expected](https://github.com/rxweb/rxweb/tree/master/examples/client-side/angular/ngx-translate-extension). Please refer the [Spec Code Comparision Page](https://docs.rxweb.io/ngx-translate-extension/spec-comparison/missing-translation-handler).



# 💪 Features
<b>Attribute Directive </b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/attribute-directive))
<hr/>

```html
<span translate="introduction"></span>
```

```html
<span translate="notification" [translateParams]="{name:'John'}"></span>
```

```html
<span translate="note" translateLang="fr"></span>
```

```html
<span translate="dashboardHeading" translationName="dashboard"></span>
```

<b>Impure Pipe</b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/pipe))
<hr/>

```html
{{'greet' | translate}}
```
```html
{{'notification' | translate:{name:'John'} }}
```

```html
{{'note' | translate:{lang:'fr'} }}
```

```html
{{'dashboardHeading' | translate:{translationName:'dashboard'} }}
```

<b>Pure Pipe</b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/pure-pipe))
<hr/>

```html
{{global.raw.notification | rxTranslate:{'name':'Munad'} }}
```
```html
{{global.raw.notification | rxTranslate:{'name':name} }}
```


<b>Decorator</b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/decorator))
<hr/>

COMPONENT	
	
```js
@translate() global:{[key:string]:any};
```
HTML

```html
{{global.introduction}}
{{global.notification}} // Not required to passing the parameter, automatically managed.
```

```js
@translate({languageCode:'fr'}) global:{[key:string]:any}; // HTML binding is same as above.
```

```js
@translate({translationName:'dashboard'}) dashboard:{[key:string]:any}; 
```

```js
@translate({ filePath:"..."}) global:{[key:string]:any}; 
```

```js
@translate({
  translationName: 'inliners',
  inlineTranslations: {
      en: () => import('./i18n/en.json'),
      fr: () => import('./i18n/fr.json')
  }
}) inline: any; // inline loader
```

```js
@translateAsync({
    serviceModel: LanguageService,
    serviceMethod: LanguageService.prototype.get
}) languages : any[];
```

<b>FormControl Validation Message Translation</b>
<hr/>

1. [Binds Validation message in ```errors``` object of FormControl, as per active language.](https://docs.rxweb.io/ngx-translate-extension/validation-message)
2. [Binds Validation message with custom parameter.](https://docs.rxweb.io/ngx-translate-extension/validation-message)
3. [Binds Validation message with array values.](https://docs.rxweb.io/ngx-translate-extension/validation-message)

<b>Runtime Change Language By</b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/en/change-language))
<hr/>

1. [URL](https://docs.rxweb.io/ngx-translate-extension/en/change-language)
2. [Code](https://docs.rxweb.io/ngx-translate-extension/en/change-language)

<b>Structrual Directive</b> ([Working Example of below features](https://docs.rxweb.io/ngx-translate-extension/structural-directive))
<hr/>

```html
<app-child *rxTranslate="true"></app-child>
```

<b>Other Intuitive Features</b>
<hr/>

1. [Automatically set the page title.](https://docs.rxweb.io/ngx-translate-extension/other-intuitive-features)
2. [Lazy Load Translation Files as per Angular PreLoadModule Stratergy.](https://docs.rxweb.io/ngx-translate-extension/other-intuitive-features)

<b>Sanitizers</b>
<hr/>

1. [Currency](https://docs.rxweb.io/ngx-translate-extension/sanitize/currency)
2. [Date](https://docs.rxweb.io/ngx-translate-extension/sanitize/date)
3. [Decimal](https://docs.rxweb.io/ngx-translate-extension/sanitize/decimal)
4. [Percent](https://docs.rxweb.io/ngx-translate-extension/sanitize/percent)
5. [LowerCase](https://docs.rxweb.io/ngx-translate-extension/sanitize/lower-case)
6. [UpperCase](https://docs.rxweb.io/ngx-translate-extension/sanitize/upper-case)
7. [TitleCase](https://docs.rxweb.io/ngx-translate-extension/sanitize/title-case)
8. [Custom](https://docs.rxweb.io/ngx-translate-extension/sanitize/custom)



Ohh! We missed the initial configuration like module registration and all 😜, Don't worry that won't take much time, it's a one time configuration for accessing the services of translation throughout the application.

#### Installation
This package have dependency of <b>@ngx-translate/core</b> and <b>@rxweb/translate</b>.

```js
npm install @rxweb/ngx-translate-extension
```


Now we are going to register the module in the root module of the application.

```js
@NgModule({
  declarations: [...],
  imports: [
	TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
```
one time component level code for setting up the default language and current language.
```js
export class AppComponent {
    constructor(public translate: TranslateService) {
        translate.addLangs(['en', 'es','fr']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        translate.use('en');
    }
}

```

All Done, Feel free to share your suggestions if something is missing or we enchance this package 🙂.

	
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
