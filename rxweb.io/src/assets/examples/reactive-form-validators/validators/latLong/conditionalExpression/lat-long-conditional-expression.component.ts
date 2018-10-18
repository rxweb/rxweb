import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-latLong-conditionalExpression-validator',
    templateUrl: './lat-long-conditional-expression.component.html'
})
export class LatLongConditionalExpressionValidatorComponent implements OnInit {
    countryFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
										continent:['',], 
													thirdCountry:['', RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"' })], 
													secondCountry:['', RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia"  })], 
								});
    }
}
