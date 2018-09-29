import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { Location } from './location.model';

@Component({
    selector: 'app-maxlength-add',
    templateUrl: './max-length-add.component.html'
})
export class MaxLengthAddComponent implements OnInit {

    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let location = new Location();
        this.locationFormGroup = this.formBuilder.formGroup(location);
    }
}
