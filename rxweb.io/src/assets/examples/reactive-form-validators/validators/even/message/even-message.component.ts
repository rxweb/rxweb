import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-message-validator',
    templateUrl: './even-message.component.html'
})
export class EvenMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										multiplesOfEvenNumber:['', RxwebValidators.even({message:'{{0}} is not an even number' })], 
								});
    }
}
