import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-complete-validator',
    templateUrl: './longitude-complete.component.html'
})
export class LongitudeCompleteValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
            continent:['',], 
            secondCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia"  })], 
            thirdCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"' })], 
            firstCountryLongitude:['', RxwebValidators.longitude({message:'{{0}} is not a longitude' })], 
        });
    }
}
