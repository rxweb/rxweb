import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-image-message-validator',
    templateUrl: './image-message.component.html'
})
export class ImageMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            residenceProof:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100  ,message:'File exceed maximum Height.' })], 
        });
    }
}
