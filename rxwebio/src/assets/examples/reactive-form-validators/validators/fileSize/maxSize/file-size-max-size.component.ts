import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-maxSize-validator',
    templateUrl: './file-size-max-size.component.html'
})
export class FileSizeMaxSizeValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            videoFile:['', RxwebValidators.fileSize({maxSize:100 })], 
            audioFile:['', RxwebValidators.fileSize({minSize:3  ,maxSize:100 })], 
            imageFile:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            documentFile:['', RxwebValidators.fileSize({maxSize:10  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
        });
    }
}
