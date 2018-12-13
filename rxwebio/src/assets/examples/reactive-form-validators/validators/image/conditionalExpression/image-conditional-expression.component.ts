import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-image-conditionalExpression-validator',
    templateUrl: './image-conditional-expression.component.html'
})
export class ImageConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            aadharCard:['', RxwebValidators.image({maxHeight:50  ,maxWidth:100  ,conditionalExpression:'x => x.ImageType == "IdentityCard"' })], 
            panCard:['', RxwebValidators.image({maxHeight:100  ,maxWidth:200  ,conditionalExpression:'(x,y) => x.ImageType == "IdentityCard"' })], 
        });
    }
}
