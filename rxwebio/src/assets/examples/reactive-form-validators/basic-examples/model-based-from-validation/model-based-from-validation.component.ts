import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { RxFormBuilder,FormBuilderConfiguration,RxwebValidators } from '@rxweb/reactive-form-validators';
import { Country } from "src/assets/examples/reactive-form-validators/basic-examples/model-based-from-validation/model-based-from-validation.model";


@Component({
    selector: 'app-model-based-from-validation',
    templateUrl: './model-based-from-validation.component.html'
})
export class ModelBasedFromValidationComponent implements OnInit {

    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
      let country = new Country();
      this.countryFormGroup = this.formBuilder.formGroup(country);
    }
}
