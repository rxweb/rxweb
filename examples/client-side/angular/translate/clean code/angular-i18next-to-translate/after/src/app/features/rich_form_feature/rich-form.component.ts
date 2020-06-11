import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RichFormModel } from './rich-form.model';
import { translate } from '@rxweb/translate';

@Component({
    selector: 'rich-form',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rich-form.component.html'
})
export class RichFormComponent implements OnInit {

    form: FormGroup;
    model: RichFormModel = new RichFormModel();

    @translate({ translationName: 'feature.rich_form' }) richForm: { [key: string]: any };

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            'count': [this.model.count, [Validators.min(1), Validators.max(3)]],
            'email': [this.model.email, [Validators.email]],
            'technicalContact': this.fb.group({
                'firstName': [this.model.technicalContact.firstName, [Validators.required]],
                'lastName': [this.model.technicalContact.lastName, [Validators.required]],
                'middleName': [this.model.technicalContact.middleName, [Validators.required]],
            })
        });
    }


    ngOnInit() {

    }

    onSubmit(e: Event) {
    }

    get technicalContact(): FormGroup {
        return this.form.controls.technicalContact as FormGroup;
    }
}
