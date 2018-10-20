import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-complete-validator',
    templateUrl: './min-date-complete.component.html'
})
export class MinDateCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										userName:['',], 
													birthDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "John"  })], 
													admissionDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "John"' })], 
													registrationDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Minimum Date Limit' })], 
								});
    }
}
