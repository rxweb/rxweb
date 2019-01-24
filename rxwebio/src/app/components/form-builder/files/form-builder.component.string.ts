export const FORM_BUILDER_COMPONENT :string = `import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder,FormBuilderConfiguration } from '@rxweb/reactive-form-validators';
import { FormBuilderModel } from './form-builder.model';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html'
})
export class FormBuilderComponent implements OnInit {
    formBuilderFormGroup: FormGroup
    constructor(
        private formBuilder: RxFormBuilder) { }

    ngOnInit() {
        let formBuilderModel = new FormBuilderModel();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = ##Json##;
        this.formBuilderFormGroup = this.formBuilder.formGroup(formBuilderModel,formBuilderConfiguration);
    }
}`
