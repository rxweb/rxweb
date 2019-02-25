---
title: Change Log
author: ajayojha
type:simple
linktitle:changelog
---

# <a name="1.8.1" href="https://github.com/rxweb/rxweb/releases/tag/v1.8.1">1.8.1</a>(02-18-2019)

### Bug Fixes
<ul>
<li>Handle numeric value while converting into decimal format.</li>
</ul>

# <a name="1.8.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.8.0">1.8.0</a>(02-17-2019)

### Bug Fixes
<ul>
<li>date, minDate and maxDate validation support date object(<a href="https://github.com/rxweb/rxweb/issues/127">#127</a>)</li>
<li>Currency format corrections(<a href="https://github.com/rxweb/rxweb/issues/123">#123</a> )</li>
<li>Currency format not working with decorator based validation (<a href="https://github.com/rxweb/rxweb/issues/122">#122</a>)</li>
</ul>

### Features
<ul>
<li>'this' keyword support in decorator based validation(<a href="https://github.com/rxweb/rxweb/issues/120">#120</a>)</li>
<li>@disable() decorator added to disable the FormControl conditionally(<a href="https://github.com/rxweb/rxweb/issues/124">#124</a>)</li>
<li>@error() decorator added to bind the error message condtionally(<a href="https://github.com/rxweb/rxweb/issues/125">#125</a>)</li>
<li>date, minDate and maxDate validation support ISO date and work without ReactiveFormConfig (<a href="https://github.com/rxweb/rxweb/issues/126">#126</a>)</li>
<li>locale with decimal format transformation of numeric value.</li>
</ul>


# <a name="1.7.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.7.0">1.7.0</a>(02-10-2019)

### Bug Fixes
<ul>
<li>Pass updated value object in conditional expression (<a href="https://github.com/rxweb/rxweb/issues/117">#117</a>)</li>
<li>'ymd' date format validation fixes(<a href="https://github.com/rxweb/rxweb/issues/118">#118</a>)</li>
</ul>

### Features
<ul>
<li>Decorator based template driven validation (<a href="https://github.com/rxweb/rxweb/issues/94">#94</a>)</li>
<li>Non array value validation in noneOf validator (<a href="https://github.com/rxweb/rxweb/issues/116">#116</a>)</li> 
<li>Greater than support in min and max date validation(<a href="https://github.com/rxweb/rxweb/issues/119">#119</a>)</li> 
</ul>


# <a name="1.6.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.6.0">1.6.0</a> (02-04-2019)


### Bug Fixes
<ul>
<li>required validation pass with the value of 'false' (<a href="https://github.com/rxweb/rxweb/issues/111">#111</a>)</li>
</ul>


### Features
<ul>
<li>Binds the errorMessage property during initialization, if the FormControl is invalid(<a href="https://github.com/rxweb/rxweb/issues/109">#109</a>)</li>
<li>FormData object based on FormGroup value (<a href="https://github.com/rxweb/rxweb/issues/90">#90</a>)</li> 
<li>Store the value of FileList object in FormControl(<a href="https://github.com/rxweb/rxweb/issues/104">#104</a>)</li> 
<li>Enhancement in @prop decorator (<a href="https://github.com/rxweb/rxweb/issues/112">#112</a>) </li>
<li>date validation decorator, validator and template driven (<a href="https://github.com/rxweb/rxweb/issues/113">#113</a>)</li>
</ul>


<a name="1.5.0"></a>
<li>[1.5.0](https://github.com/rxweb/rxweb/releases/tag/v1.5.0) (01-29-2019)


### Bug Fixes
<li>mastero card validation fixes ([#84](https://github.com/rxweb/rxweb/issues/84) )</li>


### Features
<li>Extended class properties included in FormGroup as FormControl (<a href="https://github.com/rxweb/rxweb/issues/88">#88</a>)</li>
<li>async validation decorator and custom async validation (<a href="https://github.com/rxweb/rxweb/issues/70">#70</a>)</li>
<li>CUSIP validation (<a href="https://github.com/rxweb/rxweb/issues/80">#80</a>)</li>
<li>GRId validation(<a href="https://github.com/rxweb/rxweb/issues/79">#79</a>)</li>