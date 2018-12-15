import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { RxFormBuilder,FormBuilderConfiguration,RxwebValidators } from '@rxweb/reactive-form-validators';
import { Country } from "src/assets/examples/reactive-form-validators/basic-examples/model-based-form-validation/model-based-form-validation.model";


@Component({
    selector: 'app-model-based-form-validation',
    templateUrl: './model-based-form-validation.component.html'
})
export class ModelBasedFormValidationComponent implements OnInit {

    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
      let country = new Country();
      this.countryFormGroup = this.formBuilder.formGroup(country);
    }
}
