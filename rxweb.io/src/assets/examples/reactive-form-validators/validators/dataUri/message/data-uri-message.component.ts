import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-message-validator',
    templateUrl: './data-uri-message.component.html'
})
export class DataUriMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										htmlDataUri:['', RxwebValidators.dataUri({message:'{{0}} is not a proper data URI' })], 
								});
    }
}
