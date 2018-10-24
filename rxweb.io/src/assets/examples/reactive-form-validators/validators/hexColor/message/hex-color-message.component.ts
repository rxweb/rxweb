import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-message-validator',
    templateUrl: './hex-color-message.component.html'
})
export class HexColorMessageValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.hexcolorInfoFormGroup = this.formBuilder.group({
            bodyHexcolorCode:['', RxwebValidators.hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"' })], 
        });
    }
}
