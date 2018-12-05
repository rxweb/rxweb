import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-conditionalExpression-validator',
    templateUrl: './longitude-conditional-expression.component.html'
})
export class LongitudeConditionalExpressionValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            continent:['',], 
            thirdCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"' })], 
            secondCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia"  })], 
        });
    }
}
