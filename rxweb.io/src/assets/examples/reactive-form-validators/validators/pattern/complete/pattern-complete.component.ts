import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-complete-validator',
    templateUrl: './pattern-complete.component.html'
})
export class PatternCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										userName:['', RxwebValidators.pattern({pattern:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} })], 
													zipCode:['', RxwebValidators.pattern({pattern:{'zipCode':RegExp('/^\d{5}(?:[-\s]\d{4})?$/') }  ,message:'Zipcode must be 5 digits' })], 
													contactNumber:['', RxwebValidators.pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "John"  })], 
													age:['', RxwebValidators.pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:'x => x.userName=="John"' })], 
								});
    }
}
