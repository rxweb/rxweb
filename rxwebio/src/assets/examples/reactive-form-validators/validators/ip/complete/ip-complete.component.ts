import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ip-complete-validator',
    templateUrl: './ip-complete.component.html'
})
export class IpCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				ipTypes = [ "V4", "V6", "AnyOne",];
	
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            ipType:['',], 
            ipV4:['', RxwebValidators.ip({version:1 })], 
            ipV6:['', RxwebValidators.ip({version:2 })], 
            anyIPType:['', RxwebValidators.ip({version:3 })], 
            ipV4Cidr:['', RxwebValidators.ip({version:1  ,isCidr:true })], 
            ipV6Cidr:['', RxwebValidators.ip({version:2  ,isCidr:true })], 
            ipV6Conditional:['', RxwebValidators.ip({conditionalExpression:'(x,y) => x.ipType == "V6"'  ,version:2 })], 
            ipV4Conditional:['', RxwebValidators.ip({conditionalExpression:'x => x.ipType == "V4"'  ,version:1 })], 
            ipV4Message:['', RxwebValidators.ip({version:1  ,message:'Please Enter IP V4 type Only' })], 
        });
    }
}
