import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-message-validator',
    templateUrl: './hex-color-message.component.html'
})
export class HexColorMessageValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.hexcolorInfoFormGroup = this.formBuilder.group({
										bodyHexcolorCode:['', RxwebValidators.hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"' })], 
								});
    }
}
