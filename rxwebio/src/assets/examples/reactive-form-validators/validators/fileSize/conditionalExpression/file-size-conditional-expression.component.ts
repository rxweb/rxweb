import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-conditionalExpression-validator',
    templateUrl: './file-size-conditional-expression.component.html'
})
export class FileSizeConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            imageFile:['', RxwebValidators.fileSize({maxSize:50  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            documentFile:['', RxwebValidators.fileSize({maxSize:10  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
        });
    }
}
