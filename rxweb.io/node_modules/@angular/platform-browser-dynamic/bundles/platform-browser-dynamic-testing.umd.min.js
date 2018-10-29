/**
 * @license Angular v6.1.10
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("@angular/core"),require("@angular/core/testing"),require("@angular/platform-browser"),require("@angular/compiler"),require("@angular/compiler/testing"),require("@angular/platform-browser-dynamic"),require("@angular/platform-browser/testing")):"function"==typeof define&&define.amd?define("@angular/platform-browser-dynamic/testing",["exports","@angular/core","@angular/core/testing","@angular/platform-browser","@angular/compiler","@angular/compiler/testing","@angular/platform-browser-dynamic","@angular/platform-browser/testing"],r):r((e.ng=e.ng||{},e.ng.platformBrowserDynamic=e.ng.platformBrowserDynamic||{},e.ng.platformBrowserDynamic.testing={}),e.ng.core,e.ng.core.testing,e.ng.platformBrowser,e.ng.compiler,e.ng.compiler.testing,e.ng.platformBrowserDynamic,e.ng.platformBrowser.testing)}(this,function(e,r,t,o,n,i,c,a){"use strict";var s=function(e,r){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(e,r)};function l(e,r,t,o){var n,i=arguments.length,c=i<3?r:null===o?o=Object.getOwnPropertyDescriptor(r,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,r,t,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(c=(i<3?n(c):i>3?n(r,t,c):n(r,t))||c);return i>3&&c&&Object.defineProperty(r,t,c),c}
/**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
var p=function(e){function t(r){var t=e.call(this)||this;return t._doc=r,t}return function n(e,r){function t(){this.constructor=e}s(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)}(t,e),t.prototype.insertRootElement=function(e){for(var r=o.ɵgetDOM().firstChild(o.ɵgetDOM().content(o.ɵgetDOM().createTemplate('<div id="'+e+'"></div>'))),t=o.ɵgetDOM().querySelectorAll(this._doc,"[id^=root]"),n=0;n<t.length;n++)o.ɵgetDOM().remove(t[n]);o.ɵgetDOM().appendChild(this._doc.body,r)},l([r.Injectable(),function i(e,r){return function(t,o){r(t,o,e)}}(0,r.Inject(o.DOCUMENT)),function c(e,r){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,r)}("design:paramtypes",[Object])],t)}(t.TestComponentRenderer),u=0,f=function(){function e(){this._references=new Map}return e.prototype.overrideMetadata=function(e,t,o){var n={};if(t&&function i(e){var r=[];Object.keys(e).forEach(function(e){e.startsWith("_")||r.push(e)});for(var t=e;t=Object.getPrototypeOf(t);)Object.keys(t).forEach(function(e){var o=Object.getOwnPropertyDescriptor(t,e);!e.startsWith("_")&&o&&"get"in o&&r.push(e)});return r}
/**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */(t).forEach(function(e){return n[e]=t[e]}),o.set){if(o.remove||o.add)throw new Error("Cannot set and add/remove "+r.ɵstringify(e)+" at the same time!");!function c(e,r){for(var t in r)e[t]=r[t]}(n,o.set)}return o.remove&&function a(e,r,t){var o=new Set,n=function(e){var n=r[e];n instanceof Array?n.forEach(function(r){o.add(d(e,r,t))}):o.add(d(e,n,t))};for(var i in r)n(i);var c=function(r){var n=e[r];n instanceof Array?e[r]=n.filter(function(e){return!o.has(d(r,e,t))}):o.has(d(r,n,t))&&(e[r]=void 0)};for(var i in e)c(i)}(n,o.remove,this._references),o.add&&function s(e,r){for(var t in r){var o=r[t],n=e[t];e[t]=null!=n&&n instanceof Array?n.concat(o):o}}(n,o.add),new e(n)},e}();
/**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */function d(e,t,o){return e+":"+JSON.stringify(t,function(e,t){return"function"==typeof t&&(t=function n(e,t){var o=t.get(e);return o||(o=""+r.ɵstringify(e)+u++,t.set(e,o)),o}(t,o)),t})}var m=[{provide:i.MockPipeResolver,deps:[n.CompileReflector]},{provide:n.PipeResolver,useExisting:i.MockPipeResolver},{provide:i.MockDirectiveResolver,deps:[n.CompileReflector]},{provide:n.DirectiveResolver,useExisting:i.MockDirectiveResolver},{provide:i.MockNgModuleResolver,deps:[n.CompileReflector]},{provide:n.NgModuleResolver,useExisting:i.MockNgModuleResolver}],v=function(){function e(e,r){this._injector=e,this._compilerFactory=r}return e.prototype.createTestingCompiler=function(e){var r=this._compilerFactory.createCompiler(e);return new g(r,r.injector.get(i.MockDirectiveResolver),r.injector.get(i.MockPipeResolver),r.injector.get(i.MockNgModuleResolver))},e}(),g=function(){function e(e,r,t,o){this._compiler=e,this._directiveResolver=r,this._pipeResolver=t,this._moduleResolver=o,this._overrider=new f}return Object.defineProperty(e.prototype,"injector",{get:function(){return this._compiler.injector},enumerable:!0,configurable:!0}),e.prototype.compileModuleSync=function(e){return this._compiler.compileModuleSync(e)},e.prototype.compileModuleAsync=function(e){return this._compiler.compileModuleAsync(e)},e.prototype.compileModuleAndAllComponentsSync=function(e){return this._compiler.compileModuleAndAllComponentsSync(e)},e.prototype.compileModuleAndAllComponentsAsync=function(e){return this._compiler.compileModuleAndAllComponentsAsync(e)},e.prototype.getComponentFactory=function(e){return this._compiler.getComponentFactory(e)},e.prototype.checkOverrideAllowed=function(e){if(this._compiler.hasAotSummary(e))throw new Error(r.ɵstringify(e)+" was AOT compiled, so its metadata cannot be changed.")},e.prototype.overrideModule=function(e,t){this.checkOverrideAllowed(e);var o=this._moduleResolver.resolve(e,!1);this._moduleResolver.setNgModule(e,this._overrider.overrideMetadata(r.NgModule,o,t)),this.clearCacheFor(e)},e.prototype.overrideDirective=function(e,t){this.checkOverrideAllowed(e);var o=this._directiveResolver.resolve(e,!1);this._directiveResolver.setDirective(e,this._overrider.overrideMetadata(r.Directive,o,t)),this.clearCacheFor(e)},e.prototype.overrideComponent=function(e,t){this.checkOverrideAllowed(e);var o=this._directiveResolver.resolve(e,!1);this._directiveResolver.setDirective(e,this._overrider.overrideMetadata(r.Component,o,t)),this.clearCacheFor(e)},e.prototype.overridePipe=function(e,t){this.checkOverrideAllowed(e);var o=this._pipeResolver.resolve(e,!1);this._pipeResolver.setPipe(e,this._overrider.overrideMetadata(r.Pipe,o,t)),this.clearCacheFor(e)},e.prototype.loadAotSummaries=function(e){this._compiler.loadAotSummaries(e)},e.prototype.clearCache=function(){this._compiler.clearCache()},e.prototype.clearCacheFor=function(e){this._compiler.clearCacheFor(e)},e.prototype.getComponentFromError=function(e){return e[n.ERROR_COMPONENT_TYPE]||null},e.prototype.getModuleId=function(e){return this._moduleResolver.resolve(e,!0).id},e}(),y=r.createPlatformFactory(c.ɵplatformCoreDynamic,"coreDynamicTesting",[{provide:r.COMPILER_OPTIONS,useValue:{providers:m},multi:!0},{provide:t.ɵTestingCompilerFactory,useClass:v,deps:[r.Injector,r.CompilerFactory]}]),h=r.createPlatformFactory(y,"browserDynamicTesting",c.ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS),_=function(){return l([r.NgModule({exports:[a.BrowserTestingModule],providers:[{provide:t.TestComponentRenderer,useClass:p}]})],function e(){})}();
/**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
/**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
e.ɵangular_packages_platform_browser_dynamic_testing_testing_a=m,e.ɵangular_packages_platform_browser_dynamic_testing_testing_b=v,e.platformBrowserDynamicTesting=h,e.BrowserDynamicTestingModule=_,e.ɵDOMTestComponentRenderer=p,e.ɵplatformCoreDynamicTesting=y,Object.defineProperty(e,"__esModule",{value:!0})});