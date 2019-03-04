import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl,FormControl } from "@angular/forms";
import {
RxwebValidators,RxFormBuilder ,ReactiveFormConfig
} from "@rxweb/reactive-form-validators";




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {

    }

    
  ngOnInit() {
           ReactiveFormConfig.set({
            "baseConfig":{
              "dateFormat": "mdy",
               "seperator": "/"
            },
            "internationalization": {
                "dateFormat": "mdy",
                "seperator": "/"
            },
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
          }
}


