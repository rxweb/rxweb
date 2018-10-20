import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-add-validator',
    templateUrl: './contains-add.component.html'
})
export class ContainsAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										emailAddress:['', RxwebValidators.contains({value:'@gmail.com' })], 
								});
    }
}
