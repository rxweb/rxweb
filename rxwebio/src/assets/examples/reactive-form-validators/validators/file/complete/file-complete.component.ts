import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-complete-validator',
    templateUrl: './file-complete.component.html'
})
export class FileCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            totalImageFiles:['', RxwebValidators.file({maxFiles:5 })], 
            totalDocumentFiles:['', RxwebValidators.file({minFiles:5 })], 
            minimumFiles:['', RxwebValidators.file({minFiles:5  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            maximumFile:['', RxwebValidators.file({maxFiles:5  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
            minMaxFiles:['', RxwebValidators.file({minFiles:5  ,maxFiles:10  ,message:'You can upload minimum 5 and maximum 10 files.' })], 
        });
    }
}
