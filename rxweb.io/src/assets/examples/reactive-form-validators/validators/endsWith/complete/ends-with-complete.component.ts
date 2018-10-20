import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-endsWith-complete-validator',
    templateUrl: './ends-with-complete.component.html'
})
export class EndsWithCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										name:['', RxwebValidators.endsWith({value:'m'  ,message:'{{0}} does not ends with `m`' })], 
													profession:['', RxwebValidators.endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Adam"  })], 
													taskId:['', RxwebValidators.endsWith({value:'#'  ,conditionalExpression:'x => x.name =="Adam"' })], 
								});
    }
}
