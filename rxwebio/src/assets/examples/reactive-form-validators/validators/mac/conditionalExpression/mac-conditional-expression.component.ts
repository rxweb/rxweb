import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-conditionalExpression-validator',
    templateUrl: './mac-conditional-expression.component.html'
})
export class MacConditionalExpressionValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
            device:['',], 
            localMacAddress:['', RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"' })], 
            macAddress:['', RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop"  })], 
        });
    }
}
