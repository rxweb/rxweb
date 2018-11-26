import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-conditionalExpression-validator',
    templateUrl: './port-conditional-expression.component.html'
})
export class PortConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            browser:['',], 
            shoppingWebsitePort:['', RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"' })], 
            entertainmentWebsitePort:['', RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome"  })], 
        });
    }
}
