import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-endsWith-value-validator',
    templateUrl: './ends-with-value.component.html'
})
export class EndsWithValueValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										name:['', RxwebValidators.endsWith({value:'m'  ,message:'{{0}} does not ends with `m`' })], 
													taskId:['', RxwebValidators.endsWith({value:'#'  ,conditionalExpression:'x => x.name =="Adam"' })], 
													profession:['', RxwebValidators.endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Adam"  })], 
								});
    }
}
