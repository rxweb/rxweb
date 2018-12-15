import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-image-complete-validator',
    templateUrl: './image-complete.component.html'
})
export class ImageCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				ImageTypes = [ "Picture", "IdentityCard",];
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            imageType:['',], 
            profilePhoto:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100 })], 
            signature:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100 })], 
            identityCard:['', RxwebValidators.image({minHeight:10  ,maxHeight:100  ,maxWidth:100 })], 
            drivinglicense:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100 })], 
            aadharCard:['', RxwebValidators.image({maxHeight:50  ,maxWidth:100  ,conditionalExpression:'x => x.ImageType == "IdentityCard"' })], 
            panCard:['', RxwebValidators.image({maxHeight:100  ,maxWidth:200  ,conditionalExpression:'(x,y) => x.ImageType == "IdentityCard"' })], 
            residenceProof:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100  ,message:'File exceed maximum Height.' })], 
        });
    }
}
