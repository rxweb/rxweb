import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { HostListener } from "@angular/core";
import { NavigationStart } from "@angular/router";
import { RxSpinner } from "src/app/controls/spinner/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'rx.web.io';
  isHome = false;
  constructor(private router: Router,private spinner:RxSpinner,private applicationBroadCast:ApplicationBroadcaster) {
    this.applicationBroadCast.urlSubscriber.subscribe(t => {
      this.homeInit(t)
    });
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.spinner.hide();
        // (<any>window).ga('set', 'page', val.urlAfterRedirects);
        // (<any>window).ga('send', 'pageview');
        if (val.url == "/" || val.url == "/home")
          this.isHome = true;
        else
          this.isHome = false;
        var t = setTimeout(function () {
          const tree = router.parseUrl(router.url);
          if (tree.fragment) {
            const element = document.querySelector("#" + tree.fragment);
            if (element) {
              element.scrollIntoView({behavior: "instant", block: "start", inline: "nearest"});
            }
          }
        }, 500);
      }
      if (val instanceof NavigationStart) {
        this.spinner.show();
      }
    });
  }



  ngOnInit() {
   
    ReactiveFormConfig.set({
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "allOf": "Please select all options",
        "onlyAlpha": "Only alphabets are allowed.",
        "zipCode": "Please enter zipcode.",
        "onlyDigit": "Only digit are allowed.",
        "alpha": "Only alphabets are allowed.",
        "alphaNumeric": "Only Alpha Numerics are allowed.",
        "ascii": "Please enter an ascii code",
        "choice": "Please choose options according to minLength and maxLength",
        "contains": "Input does not contain defined string",
        "compare": "Input does not match",
        "creditCard": "Input is not in the credit card format",
        "dataUri": "Please enter a proper data Uri",
        "different": "Please enter different values",
        "digit": "Only digits are allowed",
        "email": "Invalid email format",
        "endsWith": "Please enter a valid input",
        "even": "Please enter an even number",
        "factor": "Please enter valid factors",
        "fileSize": "Please enter a valid size of file",
        "greaterThan": "Input should be greater than pre defined field",
        "greaterThanEqualTo": "Input should be greater than or equal to pre defined field",
        "hexColor": "Invalid Hex Color format",
        "json": "Invalid json format",
        "latitude": "Please enter a valid latitude",
        "latLong": "Please enter a valid latLong",
        "leapYear": "Please enter a valid leap year",
        "lessThan": "Input should be less than pre defined field",
        "lessThanEqualTo": "Input should be less than or equal to pre defined field",
        "longitude": "Please enter a valid longitude",
        "lowerCase": "Input must be in lower case",
        "mac": "Invalid mac format",
        "maxLength": "Input exceeds the maximum length",
        "maxNumber": "Maximum number is not matched.",
        "maxDate": "Input date exceed the maximum date",
        "minDate": "Input date is less than the minimum date.",
        "minLength": "Input is less than the minimum length",
        "minNumber": "Minimum number is not matched.",
        "noneOf": "You can not select any option",
        "numeric": "Please enter valid number",
        "odd": "Please enter an odd number",
        "oneOf": "You can select only one option",
        "password": "Input does not match the password requirements",
        "pattern": "Input does not match the pattern requirements",
        "port": "Please enter a valid port number",
        "primeNumber": "Please enter a valid prime number",
        "range": "Input exceeds the range",
        "required": "This field is required",
        "startsWith": "Please enter a valid input",
        "time": "Input must be a proper time",
        "upperCase": "Input must be in Uppercase",
        "url": "Input must be an url",
        "extension": "Enter a valid extension.",
        "file": "Enter valid file count",
        "image": "Enter valid file height and width",

      }
    });
  }
  homeInit(isHome){
    this.isHome = isHome;
  }
}
