import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-conditionalExpression-validator',
    templateUrl: './file-size-conditional-expression.component.html'
})
export class FileSizeConditionalExpressionValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
            device:['',], 
            photographStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:'x => x.device =="SmartPhone"' })], 
            documentStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:(x,y) => x.device == "SmartPhone"  })], 
        });
    }
}
