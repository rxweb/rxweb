import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-conditionalExpression-validator',
    templateUrl: './url-conditional-expression.component.html'
})
export class UrlConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            adminWebsiteUrl:['', RxwebValidators.url()], 
            customerWebsiteUrl:['', RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"'  })], 
        });
    }
}
