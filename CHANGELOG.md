---
title: Change Log
author: ajayojha
type:simple
linktitle:changelog
---

# <a name="1.8.1" href="https://github.com/rxweb/rxweb/releases/tag/v1.8.1" target="_blank">1.8.1</a> (02-18-2019)

### Bug Fixes
<ul>
<li>Handle numeric value while converting into decimal format.</li>
</ul>
<hr />

# <a name="1.8.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.8.0" target="_blank">1.8.0</a> (02-17-2019)

### Bug Fixes
<ul>
<li>date, minDate and maxDate validation support date object(<a href="https://github.com/rxweb/rxweb/issues/127" target="_blank">#127</a>)</li>
<li>Currency format corrections(<a href="https://github.com/rxweb/rxweb/issues/123" target="_blank">#123</a> )</li>
<li>Currency format not working with decorator based validation (<a href="https://github.com/rxweb/rxweb/issues/122" target="_blank">#122</a>)</li>
</ul>

### Features
<ul>
<li>`this` keyword support in decorator based validation(<a href="https://github.com/rxweb/rxweb/issues/120" target="_blank">#120</a>)</li>
<li>@disable() decorator added to disable the FormControl conditionally(<a href="https://github.com/rxweb/rxweb/issues/124" target="_blank">#124</a>)</li>
<li>@error() decorator added to bind the error message condtionally(<a href="https://github.com/rxweb/rxweb/issues/125" target="_blank">#125</a>)</li>
<li>date, minDate and maxDate validation support ISO date and work without ReactiveFormConfig (<a href="https://github.com/rxweb/rxweb/issues/126" target="_blank">#126</a>)</li>
<li>locale with decimal format transformation of numeric value.</li>
</ul>
<hr />

# <a name="1.7.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.7.0" target="_blank">1.7.0</a> (02-10-2019)

### Bug Fixes
<ul>
<li>Pass updated value object in conditional expression (<a href="https://github.com/rxweb/rxweb/issues/117" target="_blank">#117</a>)</li>
<li>`ymd` date format validation fixes(<a href="https://github.com/rxweb/rxweb/issues/118" target="_blank">#118</a>)</li>
</ul>

### Features
<ul>
<li>Decorator based template driven validation (<a href="https://github.com/rxweb/rxweb/issues/94" target="_blank">#94</a>)</li>
<li>Non array value validation in noneOf validator (<a href="https://github.com/rxweb/rxweb/issues/116" target="_blank">#116</a>)</li> 
<li>Greater than support in min and max date validation(<a href="https://github.com/rxweb/rxweb/issues/119" target="_blank">#119</a>)</li> 
</ul>
<hr />

# <a name="1.6.0" href="https://github.com/rxweb/rxweb/releases/tag/v1.6.0" target="_blank">1.6.0</a> (02-04-2019)

### Bug Fixes
<ul>
<li>required validation pass with the value of `false` (<a href="https://github.com/rxweb/rxweb/issues/111" target="_blank">#111</a>)</li>
</ul>

### Features
<ul>
<li>Binds the errorMessage property during initialization, if the FormControl is invalid(<a href="https://github.com/rxweb/rxweb/issues/109" target="_blank">#109</a>)</li>
<li>FormData object based on FormGroup value (<a href="https://github.com/rxweb/rxweb/issues/90" target="_blank">#90</a>)</li> 
<li>Store the value of FileList object in FormControl(<a href="https://github.com/rxweb/rxweb/issues/104" target="_blank">#104</a>)</li> 
<li>Enhancement in @prop decorator (<a href="https://github.com/rxweb/rxweb/issues/112" target="_blank">#112</a>) </li>
<li>date validation decorator, validator and template driven (<a href="https://github.com/rxweb/rxweb/issues/113" target="_blank">#113</a>)</li>
</ul>
<hr />
		  
# <a name="1.5.0" target="_blank" href="https://github.com/rxweb/rxweb/releases/tag/v1.5.0" target="_blank">1.5.0</a> (01-29-2019)
		  
### Bug Fixes
<li>mastero card validation fixes (<a href="https://github.com/rxweb/rxweb/issues/84" target="_blank">#84</a>)</li>
		  
### Features
<li>Extended class properties included in FormGroup as FormControl (<a href="https://github.com/rxweb/rxweb/issues/88" target="_blank">#88</a>)</li>
<li>async validation decorator and custom async validation (<a href="https://github.com/rxweb/rxweb/issues/70" target="_blank">#70</a>)</li>
<li>CUSIP validation (<a href="https://github.com/rxweb/rxweb/issues/80" target="_blank">#80</a>)</li>
<li>GRId validation(<a href="https://github.com/rxweb/rxweb/issues/79" target="_blank">#79</a>)</li>