import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
	,NumericValueType
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-dynamic-validator',
    templateUrl: './numeric-dynamic.component.html'
})
export class NumericDynamicValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			integerNumber : {
				numeric :  {acceptValue:NumericValueType.PositiveNumber,allowDecimal:false,conditionalExpression:(x,y) =>{ return  x.dataType == "Number" },} 
			},
						
			realNumber : {
				numeric :  {acceptValue:NumericValueType.Both,allowDecimal:false,conditionalExpression:x => x.dataType == "Number",} 
			},
						
			negativeNumber : {
				numeric :  {acceptValue:NumericValueType.NegativeNumber,allowDecimal:true,message:'{{0}} is not a negative number',} 
			},
			        };
		 var userInfo = {
			integerNumber:'', realNumber:'', negativeNumber:'', 
		}
		this.userInfoFormGroup = this.formBuilder.formGroup(userInfo,formBuilderConfiguration);
    }
}
