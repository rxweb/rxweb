import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-conditionalExpression-validator',
    templateUrl: './data-uri-conditional-expression.component.html'
})
export class DataUriConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										scheme:['',], 
													javascriptDataUri:['', RxwebValidators.dataUri({conditionalExpression:'x => x.scheme =="DataUri"' })], 
													cssDataUri:['', RxwebValidators.dataUri({conditionalExpression:(x,y) => x.scheme == "DataUri"  })], 
								});
    }
}
