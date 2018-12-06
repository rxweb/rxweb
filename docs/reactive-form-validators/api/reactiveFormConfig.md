---
title: ReactiveFormConfig
description: ReactiveFormConfig is used to configure date format,validation messages globally at the start of the application. 
author: rxcontributorone

---
# About ReactiveFormConfig

ReactiveFormConfig is used to globally set date format,validation messages whenever the application starts it will initialized automatically. we have to set "validationMessage" for setting global validation message ,"baseConfig" for setting dateformat globally and "internationalization" for setting dateformat for worldwide applications. 
Let's see how ReactiveFormConfig will fulfil the need.

# baseConfig
To set the date format throughtout the application for date validation check, the `baseConfig` of ReactiveFormConfig is a configuration if you set then the applied the value prameter 'value' in 'minDate' and 'maxDate' validation works accordingly otherwise it will take the default format of 'mm/dd/yyyy'.Suppose date format in your country is 'mm/dd/yy', Set the dateformat as "mdy" or if it is 'dd/mm/yy' Set the dateformat as "dmy" and the format will be set globally.

```js
 ReactiveFormConfig.set({
            "baseConfig":{
              "dateFormat": "mdy",
               "seperator": "/"
            }          
        });
```
# internationalization 
Suppose You want the application to work worldwide and you want the date format to change according to country and login ,In that case you can set `internationalization` if your system supports it.

```js
ReactiveFormConfig.set({
      "baseConfig":{
              "dateFormat": "mdy",
               "seperator": "/"
            },     
      "internationalization": {
                "dateFormat": "mdy",
                "seperator": "/"
            }
  });
```
# Validation messages
Apply global validation messages throughout the application, then configure the validation messages globaly, You must set message for every validator you use.

```js
  ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "only alpha value you enter",
                "alphaNumeric": "only alpha Numeric value you enter",
                "contains": "you should contains ",
                "onlyDigit": "abc",
                "required":"this field is required",
                "min":"minimum number are allowed {{0}}",
                "minLength":"minimum length is {{0}}"

            }
        });
```




