[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	
### A extensible library of ngx-translate for Angular Internationalization with spectacular features 🌈.

> The objective of this library adds the features of those which are not available in the ngx-translate or enhance the current features as well as fix the bugs, which are opened since long on ngx-translate project. 

#### For Existing ngx-translate developer community
##### How much code change is required to avail the ngx-translate-extension features.
1. You have to replace the package name <b>@ngx-translate/core</b> to <b>@rxweb/ngx-translate-extesion</b>.
2. ```TranslateModule.forChild``` will not work anymore, you have to use ```@componentTranslate``` or ```@translate``` decorator on component level with translation name(folder name). Don't worry nothing will break even you will get more 😎.
3. Add ```RxTranslateModule``` on Root level.
That's it.
##### How can be sure that after replacing the package name, everything will work as expected?
We have copied the spec from [@ngx-translate/core](https://github.com/ngx-translate/core/tree/master/projects/ngx-translate/core/tests) project and follows the above mentioned steps, [it's working as expected](https://github.com/rxweb/rxweb/tree/master/test/ngx-translate-extension). Please refer the [Spec Code Comparision Page](https://docs.rxweb.io/ngx-translate-extension/comparison/translate-store).

# 💪 Features
<table width="100%" bgcolor="#f6f8fa">
	<tr>
		<td colspan="2"><b>Attribute Directive</b></td>
	</tr>
<tr style="background-color:white!important;">
<td width="80%">

```html
<span translate="introduction"></span>
```
</td>
<td width="20%">
	
[Example](https://stackblitz.com)
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
<span translate="notification" [translateParams]="{name:'John'}"></span>
```
</td>
<td>
	
[Example](https://stackblitz.com)
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
<span translate="note" translateLang="fr"></span>
```
</td>
<td>
	
<b>[Example](https://stackblitz.com)</b>
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
<span translate="dashboardHeading" translationName="dashboard"></span>
```
</td>
<td>
	
<b>[Example](https://stackblitz.com)</b>
</td>
</tr>

<tr>
	<td colspan="2"><b>Pipe</b></td>
	</tr>
	
<tr style="background-color:white!important;">
<td width="80%">

```html
{{'introduction' | translate}}
```
</td>
<td width="20%">
	
[Example](https://stackblitz.com)
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
{{'notification' | translate:{name:'John'} }}
```
</td>
<td>
	
[Example](https://stackblitz.com)
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
{{'note' | translate:{lang:'fr'} }}
```
</td>
<td>
	
<b>[Example](https://stackblitz.com)</b>
</td>
</tr>
<tr></tr>
<tr>
<td>
		
```html
{{'dashboardHeading' | translate:{translationName:'dashboard'} }}
```
</td>
<td>
	
<b>[Example](https://stackblitz.com)</b>
</td>
</tr>

<tr>
	<td colspan="2"><b>Decorator</b></td>
</tr>

<tr>
<td>
COMPONENT	
	
```js
@translate() global:{[key:string]:any};
```
HTML

```html
{{global.introduction}}
{{global.notification}} // Not required to passing the parameter, automatically managed.
```
</td>
<td>
	
<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>
<tr>
<td>
	
```js
@translate({languageCode:'fr'}) global:{[key:string]:any}; // HTML binding is same as above.
```
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>

<tr></tr>
<tr>
<td>
	
```js
@translate({translationName:'dashboard'}) dashboard:{[key:string]:any}; 
```
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>
<tr>
<td>
	
```js
@translate({ filePath:"..."}) global:{[key:string]:any}; 
```
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>
<tr>
<td>
	
```js
@translateAsync({
    serviceModel: LanguageService,
    serviceMethod: LanguageService.prototype.get
}) languages : any[];
```
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>

<tr>
	<td colspan="2"><b>FormControl Validation Message Translation</b></td>
</tr>
<tr>
<td>
Binds Validation message in ```errors``` object of FormControl, as per active language.
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>
<tr>
<td>
Binds Validation message with custom parameter.
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>

<tr></tr>
<tr>
<td>
Binds Validation message with array values.
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr>
	<td colspan="2"><b>Change Language</b></td>
</tr>
<tr>
<td>
By URL
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>

<tr>
<td>
Through Code
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>

<tr>
	<td colspan="2"><b>Structrual Directive</b></td>
</tr>
<tr>
<td>
	
```html
<app-child *rxTranslate="true"></app-child>
```
</td>
<td>

<b>[Working Example](https://stackblitz.com)</b></td>
</tr>
<tr>
	<td colspan="2"><b>Other Intuitive Features</b></td>
</tr>
<tr>
<td>
Lazy Load Translation Files as per Angular PreLoadModule Stratergy.
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
<tr></tr>
<tr>
<td>
Automatically set the page title.
</td>
<td>

<b>[Example](https://stackblitz.com)</b></td>
</tr>
</table>

Ohh! We missed the initial configuration like module registration and all 😜, Don't worry that won't take much time, it's a one time configuration for accessing the services of translation.

Here, First we are going to create a ```TranslateLoader```, which resolves our translation content.
```js
import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@rxweb/ngx-translate-extension";
import { isObject } from 'util';

export class TranslateHttpLoader implements TranslateLoader {
    constructor(private http: HttpClient) { }

    public getTranslation(lang: any): Observable<Object> {
        if (isObject(lang) && lang.translationName)
            return this.http.get(`assets/i18n/${lang.translationName}/${lang.lang}.json`);
	else if(isObject(lang) && lang.filePath)
	    return this.http.get(lang.filePath);
        return this.http.get(`assets/i18n/${lang}.json`);
    }
}
```

Now we are going to register the module in the root module of the application.
```js
@NgModule({
  declarations: [...],
  imports: [
	TranslateModule.forRoot({ provide: TranslateLoader, useClass: TranslateHttpLoader }),
      	RxTranslateModule.forRoot({
          controlErrorMessage: {path: 'validationErrorMessages'},
          forNgxTranslate: true,
          cacheLanguageWiseObject: true,
      })
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
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
