<a name="1.8.1"></a>
# [1.8.1](https://github.com/rxweb/rxweb/releases/tag/v1.8.1) (02-18-2019)


### Bug Fixes
* Handle numeric value while converting into decimal format.


<a name="1.8.0"></a>
# [1.8.0](https://github.com/rxweb/rxweb/releases/tag/v1.8.0) (02-17-2019)


### Bug Fixes
* date, minDate and maxDate validation support date object([#127](https://github.com/rxweb/rxweb/issues/127) )
* Currency format corrections([#123](https://github.com/rxweb/rxweb/issues/123) )
* Currency format not working with decorator based validation ([#122](https://github.com/rxweb/rxweb/issues/122) )

### Features
* 'this' keyword support in decorator based validation([#120](https://github.com/rxweb/rxweb/issues/120) )
* @disable() decorator added to disable the FormControl conditionally([#124](https://github.com/rxweb/rxweb/issues/124) )
* @error() decorator added to bind the error message condtionally([#125](https://github.com/rxweb/rxweb/issues/125) )
* date, minDate and maxDate validation support ISO date and work without ReactiveFormConfig ([#126](https://github.com/rxweb/rxweb/issues/126) )
* locale with decimal format transformation of numeric value.


<a name="1.7.0"></a>
# [1.7.0](https://github.com/rxweb/rxweb/releases/tag/v1.7.0) (02-10-2019)


### Bug Fixes
* Pass updated value object in conditional expression ([#117](https://github.com/rxweb/rxweb/issues/117) )
* 'ymd' date format validation fixes([#118](https://github.com/rxweb/rxweb/issues/118) )

### Features
* Decorator based template driven validation ([#91](https://github.com/rxweb/rxweb/issues/94) )
* Non array value validation in noneOf validator ([#116](https://github.com/rxweb/rxweb/issues/116)  ) 
* Greater than support in min and max date validation([#119](https://github.com/rxweb/rxweb/issues/119)  ) 


<a name="1.6.0"></a>
# [1.6.0](https://github.com/rxweb/rxweb/releases/tag/v1.6.0) (02-04-2019)


### Bug Fixes
* required validation pass with the value of 'false' ([#111](https://github.com/rxweb/rxweb/issues/111))


### Features
* Binds the errorMessage property during initialization, if the FormControl is invalid([#109](https://github.com/rxweb/rxweb/issues/109))
* FormData object based on FormGroup value ([#90](https://github.com/rxweb/rxweb/issues/90) ) 
* Store the value of FileList object in FormControl([#104](https://github.com/rxweb/rxweb/issues/104) ) 
* Enhancement in @prop decorator ([#112](https://github.com/rxweb/rxweb/issues/112) )
* date validation decorator, validator and template driven ([#113](https://github.com/rxweb/rxweb/issues/113) )


<a name="1.5.0"></a>
# [1.5.0](https://github.com/rxweb/rxweb/releases/tag/v1.5.0) (01-29-2019)


### Bug Fixes
* mastero card validation fixes ([#84](https://github.com/rxweb/rxweb/issues/84) )


### Features
* Extended class properties included in FormGroup as FormControl ([#88](https://github.com/rxweb/rxweb/issues/88) )
* async validation decorator and custom async validation ([#70](https://github.com/rxweb/rxweb/issues/70) )
* CUSIP validation ([#80](https://github.com/rxweb/rxweb/issues/80) )
* GRId validation([#79](https://github.com/rxweb/rxweb/issues/79) )
