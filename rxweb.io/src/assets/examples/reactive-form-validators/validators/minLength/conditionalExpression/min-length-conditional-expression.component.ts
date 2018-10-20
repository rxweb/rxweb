import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-conditionalExpression-validator',
    templateUrl: './min-length-conditional-expression.component.html'
})
export class MinLengthConditionalExpressionValidatorComponent implements OnInit {
    contactFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.group({
										countryName:['',], 
													stateCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:'x => x.countryName == "India"' })], 
													countryCode:['', RxwebValidators.minLength({value:3  ,conditionalExpression:(x,y)=> x.countryName == "India" })], 
								});
    }
}
