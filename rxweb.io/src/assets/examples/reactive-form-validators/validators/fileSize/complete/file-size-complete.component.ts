import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-complete-validator',
    templateUrl: './file-size-complete.component.html'
})
export class FileSizeCompleteValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
										device:['',], 
													documentStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:(x,y) => x.device == "SmartPhone"  })], 
													photographStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:'x => x.device =="SmartPhone"' })], 
													videoStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,message:'{{0}} is not a valid size' })], 
								});
    }
}
