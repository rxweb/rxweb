import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-complete-validator',
    templateUrl: './file-size-complete.component.html'
})
export class FileSizeCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            videoFile:['', RxwebValidators.fileSize({maxSize:100 })], 
            audioFile:['', RxwebValidators.fileSize({minSize:3  ,maxSize:100 })], 
            imageFile:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            documentFile:['', RxwebValidators.fileSize({maxSize:10  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
            contactFile:['', RxwebValidators.fileSize({maxSize:10  ,message:'File exceed maximum size.' })], 
            profilePicture:['', RxwebValidators.fileSize({maxSize:50 })], 
        });
    }
}
