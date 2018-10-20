import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-conditionalExpression-validator',
    templateUrl: './port-conditional-expression.component.html'
})
export class PortConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										browser:['',], 
													shoppingWebsitePort:['', RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"' })], 
													entertainmentWebsitePort:['', RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome"  })], 
								});
    }
}
