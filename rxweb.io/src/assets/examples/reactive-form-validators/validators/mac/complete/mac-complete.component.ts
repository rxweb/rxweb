import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-complete-validator',
    templateUrl: './mac-complete.component.html'
})
export class MacCompleteValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
            device:['',], 
            macAddress:['', RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop"  })], 
            localMacAddress:['', RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"' })], 
            systemMacAddress:['', RxwebValidators.mac({message:'{{0}} is not a MAC address' })], 
        });
    }
}
