import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rx-app';
  ngOnInit() {
    ReactiveFormConfig.set({
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "alpha": "Only aphabelts are allowed.",
        "alphaNumeric": "Only Alpha Numerics are allowed.",
        "contains": "Input does not contain pre defined string",
        "compare": "Input does not match",
        "creditCard": "Input is not in the credit card format",
        "digit": "Only digits are allowed",
        "email": "Invalid email format",
        "greaterThan": "Input should be greater than pre defined field",
        "greaterThanEqualTo": "Input should be greater than or equal to pre defined field",
        "hexColor": "Invalid Hex Color format",
        "json": "Invalid json format",
        "lessThan": "Input should be less than pre defined field",
        "lessThanEqualTo": "Input should be less than or equal to pre defined field",
        "lowerCase": "Input must be in lower case",
        "maxLength": "Input exceeds the maximum length",
        "maxNumber": "Maximum number is not matched.",
        "maxDate": "Input date exceed the maximum date",
        "minDate": "Input date is less than the minimum date.",
        "minLength": "Input is less than the minimum length",
        "minNumber": "Minimum number is not matched.",
        "password": "Input does not match the password requirements",
        "pattern": "Input does not match the pattern requirements",
        "range": "Input exceeds the range",
        "required": "This field is required",
        "time": "Input must be a proper time",
        "upperCase": "Input must be in Uppercase",
        "url": "Input must be an url"
      }
    });
  }
}
