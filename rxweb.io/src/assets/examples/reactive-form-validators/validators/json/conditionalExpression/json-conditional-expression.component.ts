import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-conditionalExpression-validator',
    templateUrl: './json-conditional-expression.component.html'
})
export class JsonConditionalExpressionValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
            location:['',], 
            locationJson:['', RxwebValidators.json({conditionalExpression:'x => x.location == "{CountryName:India}"'  ,message:'Enter the text in JSON format --> {key:value}' })], 
            addressJson:['', RxwebValidators.json({conditionalExpression:(x,y)=> x.location == "{CountryName:India}"  })], 
        });
    }
}
