import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-complete-validator',
    templateUrl: './alpha-complete.component.html'
})
export class AlphaCompleteValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup
					
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
										countryName:['', RxwebValidators.alpha()], 
													countryCode:['', RxwebValidators.alpha({conditionalExpression:(x,y) => x.countryName == "Australia" })], 
													cityName:['', RxwebValidators.alpha({conditionalExpression:'x => x.countryName =="Australia"' })], 
													stateName:['', RxwebValidators.alpha({allowWhiteSpace:true })], 
													stateCode:['', RxwebValidators.alpha({message:'You can enter only alphabets.' })], 
								});
    }
}
