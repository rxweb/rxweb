import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-conditionalExpression-validator',
    templateUrl: './url-conditional-expression.component.html'
})
export class UrlConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										adminWebsiteUrl:['', RxwebValidators.url()], 
													customerWebsiteUrl:['', RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"'  })], 
								});
    }
}
