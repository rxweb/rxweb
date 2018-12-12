import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-extension-complete-validator',
    templateUrl: './extension-complete.component.html'
})
export class ExtensionCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				fileTypes = [ "Picture", "Document",];
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            fileType:['',], 
            profilePicture:['', RxwebValidators.extension({extensions:['jpg','bmp'] })], 
            imageFile:['', RxwebValidators.extension({extensions:['jpg','bmp']  ,conditionalExpression:'x => x.fileType == "Picture"' })], 
            documentFile:['', RxwebValidators.extension({extensions:['doc','docx']  ,conditionalExpression:'(x,y) => x.fileType == "Document"' })], 
            contactFile:['', RxwebValidators.extension({extensions:['.vcf']  ,message:'You can upload only .vcf files.' })], 
        });
    }
}
