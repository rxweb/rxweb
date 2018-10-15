import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-complete-validator',
    templateUrl: './json-complete.component.html'
})
export class JsonCompleteValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
										location:['',], 
													addressJson:['', RxwebValidators.json({conditionalExpression:(x,y)=> x.location == "{CountryName:India}"  })], 
													locationJson:['', RxwebValidators.json({conditionalExpression:'x => x.location == "{CountryName:India}"'  ,message:'Enter the text in JSON format --> {key:value}' })], 
													contactJson:['', RxwebValidators.json({message:'Enter only JSON type data' })], 
								});
    }
}
