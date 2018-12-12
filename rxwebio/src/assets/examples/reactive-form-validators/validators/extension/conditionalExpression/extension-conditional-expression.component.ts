import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-extension-conditionalExpression-validator',
    templateUrl: './extension-conditional-expression.component.html'
})
export class ExtensionConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            imageFile:['', RxwebValidators.extension({extensions:['jpg','bmp']  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            documentFile:['', RxwebValidators.extension({extensions:['doc','docx']  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
        });
    }
}
