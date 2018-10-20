import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-complete-validator',
    templateUrl: './ascii-complete.component.html'
})
export class AsciiCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										language:['',], 
													numberAsciiCode:['', RxwebValidators.ascii({conditionalExpression:(x,y) => x.language == "Java"  })], 
													alphabetAsciiCode:['', RxwebValidators.ascii({conditionalExpression:'x => x.language =="Java"' })], 
													specialCharAsciiCode:['', RxwebValidators.ascii({message:'{{0}} is not an Ascii Code' })], 
								});
    }
}
