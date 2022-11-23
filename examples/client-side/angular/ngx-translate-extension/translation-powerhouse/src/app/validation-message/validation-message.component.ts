import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@rxweb/ngx-translate-extension';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent implements OnInit {
    formGroup: FormGroup;

    constructor(public translate: TranslateService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            fullName: ['', Validators.required],
            designation: ['Software', Validators.maxLength(5)],
            userName: ['translate', this.identityRevealedValidator]
        })
    }


    identityRevealedValidator(control: FormGroup): ValidationErrors | null  {
        return control.value != "admin" ? {
            'identityRevealed': {refValues:[control.value,"admin"]}} : null;
    };
}
