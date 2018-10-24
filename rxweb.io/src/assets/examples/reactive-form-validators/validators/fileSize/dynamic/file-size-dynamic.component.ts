import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-dynamic-validator',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			photographStorageSize : {
				fileSize : {maxSize:50,conditionalExpression:'x => x.device =="SmartPhone"',} 
			},			
			videoStorageSize : {
				fileSize : {maxSize:50,message:'{{0}} is not a valid size',} 
			},
		};
		var storageCapacity = { device:'', documentStorageSize:'', photographStorageSize:'', videoStorageSize:'',  }
		this.storageCapacityFormGroup = this.formBuilder.group(storageCapacity,formBuilderConfiguration);
    }
}
