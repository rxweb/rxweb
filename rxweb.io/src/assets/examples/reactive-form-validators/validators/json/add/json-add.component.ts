import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-add-validator',
    templateUrl: './json-add.component.html'
})
export class JsonAddValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
										locationJson:['', RxwebValidators.json()], 
								});
    }
}
