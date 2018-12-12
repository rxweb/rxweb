import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-conditionalExpression-validator',
    templateUrl: './file-conditional-expression.component.html'
})
export class FileConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            minimumFiles:['', RxwebValidators.file({minFiles:5  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            maximumFile:['', RxwebValidators.file({maxFiles:5  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
        });
    }
}
