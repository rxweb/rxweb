<p align="center">
  <img height="200px" width="200px" style="text-align: center" src="https://cdn.rawgit.com/MurhafSousli/ngx-highlightjs/b8b00ec3/src/assets/logo.svg">
  <h1 align="center">Angular Highlight.js</h1>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-highlightjs/)
[![npm](https://img.shields.io/npm/v/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs) 
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-highlightjs.svg?branch=master)](https://www.npmjs.com/package/ngx-highlightjs) 
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Instant code highlighting, auto-detect language, super easy to use
___

<p align="center">
  <img style="text-align: center;" src="src/assets/preview.gif?raw=true">
</p>

## Table of Contents

- [Live Demo](https://MurhafSousli.github.io/ngx-highlightjs/) | [Stackblitz](https://stackblitz.com/edit/ngx-highlightjs)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Issues](#issues)
- [Author](#author)
- [More plugins](#more-plugins)

<a name="installation"/>

## Installation

1. Install it with npm

```bash
$ npm install --save ngx-highlightjs
```

2. Head to [highlight.js download page](https://highlightjs.org/download/) and get your custom package bundle including only the languages you need.

3. Create new folder in `src/assets/lib/hljs` and extract the downloaded zip file there.

<a name="usage"/>

## Usage

Import `HighlightModule` library from any module:

```ts
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    // ...
    HighlightModule.forRoot()
  ]
})
export class AppModule { }
```

The function **forRoot** accepts 1 optional parameters, `forRoot(options?: HighlightOptions)`

With `options` parameter you can set:

- **theme**: select the theme, use theme's name without the extension, default: `'github'`
- **path**: hljs library location, default: `'assets/lib/hljs'`
- **auto**: Enable observer mutation to auto-highlight on text changes, default: `true`
- **config**: Configures global options, see [configure-options](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options), default: null.

 Choose highlighting theme:

```ts
HighlightModule.forRoot({ theme: 'agate'});
```

_[List of all available themes from highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)_

 Import highlight.js library from a custom path
 ```ts
const options: HighlightOptions = {
  theme: 'agate',
  path: 'assets/js/highlight-js'
};

HighlightModule.forRoot(options);
 ```

---

Now you can use the directive `highlight`, you can:

- Highlight a code element

```html
<!-- Highlight directly -->
<pre><code highlight [code]="someCode"></code></pre>
<!-- Or -->
<pre><code highlight [textContent]="someCode"></code></pre>
```

Check this [stackblitz](https://stackblitz.com/edit/ngx-highlightjs)

- Highlight all child code elements

```html
<!-- Highlight child elements with 'pre code' selector -->
<div highlight="all">
  <pre><code [textContent]="htmlCode"></code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>
```

Check this [stackblitz](https://stackblitz.com/edit/ngx-highlightjs-all)

- Highlight custom elements

```html
<!-- Highlight child elements with custom selector -->
<div highlight="section code">
  <section><code [textContent]="pythonCode"></code></section>
  <section><code [textContent]="swiftCode"></code></section>
</div>
```

## Options

- **[highlight]**: (string), default `null`

  - Use just `highlight` without a value to highlight the element.
  - Use `highlight="all"` to highlight child elements with 'pre code' selector.
  - Use `highlight="{selector}"` to highlight child elements with custom selector.

- **[code]**: (string), code content, default `null`

- **[language]**: (string[]), an array of language names and aliases restricting auto detection to only these languages, default: `null`

- **(highlighted)**: Stream that emits highlight result, you can use `HighlightResult` interface for the response

<a name="development"/>

## Development

This project uses [ng-packagr](https://github.com/dherges/ng-packagr) for development.

Use the following command to build

```bash
$ npm run packagr
```

<a name="issues"/>

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-highlightjs/issues).

<a name="author"/>

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="more-plugins"/>

## More plugins

- [ngx-sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons)
- [ng-gallery](https://github.com/MurhafSousli/ng-gallery)
- [ngx-progressbar](https://github.com/MurhafSousli/ngx-progressbar)
- [ngx-scrollbar](https://github.com/MurhafSousli/ngx-scrollbar)
- [ngx-bar-rating](https://github.com/MurhafSousli/ngx-bar-rating)
- [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus)
- [ngx-wordpress](https://github.com/MurhafSousli/ngx-wordpress)
- [ngx-highlightjs](https://github.com/MurhafSousli/ngx-highlightjs)
- [ng-teximate](https://github.com/MurhafSousli/ng-teximate)
