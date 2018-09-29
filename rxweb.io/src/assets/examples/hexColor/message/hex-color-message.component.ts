import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexcolor-message',
    templateUrl: './hex-color-message.component.html'
})
export class HexColorMessageComponent implements OnInit {

    hexcolorInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let hexcolorInfo = new HexcolorInfo();
        this.hexcolorInfoFormGroup = this.formBuilder.formGroup(hexcolorInfo);
    }
}
