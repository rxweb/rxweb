import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-add-validator',
    templateUrl: './ascii-add.component.html'
})
export class AsciiAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										specialCharAsciiCode:['', RxwebValidators.ascii()], 
								});
    }
}
