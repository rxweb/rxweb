import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-conditionalExpression-validator',
    templateUrl: './json-conditional-expression.component.html'
})
export class JsonConditionalExpressionValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
										location:['',], 
													locationJson:['', RxwebValidators.json({conditionalExpression:'x => x.location == "{CountryName:India}"'  ,message:'Enter the text in JSON format --> {key:value}' })], 
													addressJson:['', RxwebValidators.json({conditionalExpression:(x,y)=> x.location == "{CountryName:India}"  })], 
								});
    }
}
