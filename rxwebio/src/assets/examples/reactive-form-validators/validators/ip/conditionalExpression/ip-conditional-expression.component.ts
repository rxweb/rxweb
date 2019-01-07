import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ip-conditionalExpression-validator',
    templateUrl: './ip-conditional-expression.component.html'
})
export class IpConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				ipTypes = [ "V4", "V6", "AnyOne",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            ipType:['',], 
            ipV4Conditional:['', RxwebValidators.ip({conditionalExpression:'x => x.ipType == "V4"'  ,version:1 })], 
            ipV6Conditional:['', RxwebValidators.ip({conditionalExpression:'(x,y) => x.ipType == "V6"'  ,version:2 })], 
        });
    }
}
