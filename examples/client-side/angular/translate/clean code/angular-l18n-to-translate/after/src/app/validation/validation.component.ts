import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { translate } from '@rxweb/translate';


@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
    numberForm: FormGroup;
    model = { decimal: null };

    minValue = -Math.round(Math.random() * 100000) / 100;
    maxValue = Math.round(Math.random() * 100000) / 100;

    parsedValue: number | null = null;

    constructor(private formBuilder: FormBuilder) {

    }
    decimal: FormControl;
    ngOnInit() {
        this.decimal = new FormControl('', { validators: [Validators.required, Validators.maxLength(this.maxValue), Validators.minLength(this.minValue)] })
    }

    @translate() global: any;

}
