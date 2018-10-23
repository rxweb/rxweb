import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-complete-validator',
    templateUrl: './different-complete.component.html'
})
export class DifferentCompleteValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.accountInfoFormGroup = this.formBuilder.group({
										firstName:['',], 
													password:['', RxwebValidators.different({fieldName:"firstName"  ,message:'{{0}} is same as firstName' })], 
													lastName:['', RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:(x,y) => x.firstName == "Bharat"  })], 
													userName:['', RxwebValidators.different({fieldName:"firstName"  ,conditionalExpression:'x => x.firstName == "Bharat"' })], 
								});
    }
}
