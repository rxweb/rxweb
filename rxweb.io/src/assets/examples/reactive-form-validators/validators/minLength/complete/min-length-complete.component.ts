import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-complete-validator',
    templateUrl: './min-length-complete.component.html'
})
export class MinLengthCompleteValidatorComponent implements OnInit {
    contactFormGroup: FormGroup
					
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.group({
										countryName:['',], 
													mobileNo:['', RxwebValidators.minLength({value:10 })], 
													landLineNo:['', RxwebValidators.minLength({value:8  ,message:'Minimum 8 characters are allowed' })], 
													countryCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:(x,y)=> x.countryName == "India" })], 
													stateCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:'x => x.countryName == "India"' })], 
								});
    }
}
