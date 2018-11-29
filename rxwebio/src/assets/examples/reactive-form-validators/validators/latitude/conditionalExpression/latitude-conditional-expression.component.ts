import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latitude-conditionalExpression-validator',
    templateUrl: './latitude-conditional-expression.component.html'
})
export class LatitudeConditionalExpressionValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            continent:['',], 
            thirdCountryLatitude:['', RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"' })], 
            secondCountryLatitude:['', RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia"  })], 
        });
    }
}
