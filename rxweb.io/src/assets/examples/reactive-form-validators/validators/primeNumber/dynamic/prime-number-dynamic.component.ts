import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-dynamic-validator',
    templateUrl: './prime-number-dynamic.component.html'
})
export class PrimeNumberDynamicValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			secondNumber : {
				primeNumber :  {conditionalExpression:(x,y) => x.numberType == "Prime" ,} 
			},
						
			thirdNumber : {
				primeNumber :  {conditionalExpression:'x => x.numberType =="Prime"',} 
			},
						
			firstNumber : {
				primeNumber :  {message:'{{0}} is not a prime number',} 
			},
			        };
		 var numberInfo = {
			numberType:'', secondNumber:'', thirdNumber:'', firstNumber:'', 
		}
		this.numberInfoFormGroup = this.formBuilder.group(numberInfo,formBuilderConfiguration);
    }
}
