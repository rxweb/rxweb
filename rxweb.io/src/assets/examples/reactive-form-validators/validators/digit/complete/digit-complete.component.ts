import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-digit-complete-validator',
    templateUrl: './digit-complete.component.html'
})
export class DigitCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										age:['', RxwebValidators.digit()], 
													phoneNumber:['', RxwebValidators.digit({conditionalExpression:(x,y) => x.age >= 25  })], 
													faxNumber:['', RxwebValidators.digit({conditionalExpression:'x => x.age ==25' })], 
													mobileNumber:['', RxwebValidators.digit({message:'Please enter only digit.' })], 
								});
    }
}
