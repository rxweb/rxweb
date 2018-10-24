import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-numeric-dynamic-validator',
    templateUrl: './numeric-dynamic.component.html'
})
export class NumericDynamicValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			realNumber : {
				numeric : {acceptValue:NumericValueType.Both,allowDecimal:false,conditionalExpression:'x => x.dataType == "Number"',} 
			},			
			negativeNumber : {
				numeric : {acceptValue:NumericValueType.NegativeNumber,allowDecimal:true,message:'{{0}} is not a negative number',} 
			},
		};
		var userInfo = { dataType:'', integerNumber:'', realNumber:'', negativeNumber:'',  }
		this.userInfoFormGroup = this.formBuilder.group(userInfo,formBuilderConfiguration);
    }
}
