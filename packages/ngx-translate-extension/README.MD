[![Build Status](https://travis-ci.org/rxweb/rxweb.svg?branch=master)](https://travis-ci.org/rxweb/rxweb)
[![Gitter](https://badges.gitter.im/rx-web/Lobby.svg)](https://gitter.im/rxweb-project/rxweb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6af5855682524d39a0d88bade210facd)](https://www.codacy.com/app/rxweb/rxweb?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rxweb/rxweb&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/3217/projects/4745/branches/37870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3217&pid=4745&bid=37870)
[![GitHub license](https://img.shields.io/github/license/rxweb/rxweb.svg)](https://github.com/rxweb/rxweb/blob/master/LICENSE)
	
### A extensible library of ngx-translate for Angular Internationalization with spectacular features.

> Ngx-translate is superb library, but less activly managed and this library adds the features of those which are not available in the ngx-translate or enhance the current features as well as fix the bugs.

#### For Existing ngx-translate developer community
##### How much code change is required to avail the ngx-translate-extension features.
1. You have to replace the package name <b>@ngx-translate/core</b> to <b>@rxweb/ngx-translate-extesion</b>.
2. ```TranslateModule.forChild``` will not work anymore, you have to use ```@componentTranslate``` or ```@translate``` decorator on component level with translation name(folder name). Don't worry nothing will break even you will get more 😎.
3. Add ```RxTranslateModule``` on Root level.
That's it.
##### How can be sure that after replacing the package name, everything will work as expected?
We have copied the spec from [@ngx-translate/core](https://github.com/ngx-translate/core/tree/master/projects/ngx-translate/core/tests) project and follows the above mentioned steps, [it's working as expected](https://github.com/rxweb/rxweb/tree/master/test/ngx-translate-extension). Please refer the [Spec Code Comparision Page](https://docs.rxweb.io/ngx-translate-extension/comparison/translate-store).

# 💪 Features
<table width="100%">
	<tr>
		<td colspan="2">Attribute Directive</td>
	</tr>
<tr>
<td width="80%">

```html
<span translate="introduction"></span>
```
</td>
<td width="20%">
	
[Working Example](https://stackblitz.com)
</td>
</tr>
<tr>
<td>
		
```html
<span translate="notification" [translateParams]="{name:'John'}"></span>
```
</td>
<td>
	
[Working Example](https://stackblitz.com)
</td>
</tr>
</table>



	
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
