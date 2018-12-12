import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-image-add-validator',
    templateUrl: './image-add.component.html'
})
export class ImageAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            profilePhoto:['', RxwebValidators.image({maxHeight:100  ,maxWidth:100 })], 
        });
    }
}
