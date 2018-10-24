import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-dynamic',
    templateUrl: './prime-number-dynamic.component.html'
})
export class PrimeNumberDynamicComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let numberInfo = new NumberInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
	
	
			thirdNumber : {
				primeNumber : {conditionalExpression:'x => x.numberType =="Prime"',} 
			},	
			firstNumber : {
				primeNumber : {message:'{{0}} is not a prime number',} 
			},		};
        this.numberInfoFormGroup = this.formBuilder.formGroup(numberInfo,formBuilderConfiguration);
    }
}
