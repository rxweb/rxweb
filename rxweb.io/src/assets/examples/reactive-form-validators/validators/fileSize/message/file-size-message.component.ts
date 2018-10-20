import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-message-validator',
    templateUrl: './file-size-message.component.html'
})
export class FileSizeMessageValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
										videoStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,message:'{{0}} is not a valid size' })], 
								});
    }
}
