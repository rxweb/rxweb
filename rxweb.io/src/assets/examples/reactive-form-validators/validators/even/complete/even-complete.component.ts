import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-complete-validator',
    templateUrl: './even-complete.component.html'
})
export class EvenCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										type:['',], 
													number:['', RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even"  })], 
													evenNumber:['', RxwebValidators.even({conditionalExpression:'x => x.type == "Even"' })], 
													multiplesOfEvenNumber:['', RxwebValidators.even({message:'{{0}} is not an even number' })], 
								});
    }
}
