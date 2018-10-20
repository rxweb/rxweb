import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-longitude-conditionalExpression-validator',
    templateUrl: './longitude-conditional-expression.component.html'
})
export class LongitudeConditionalExpressionValidatorComponent implements OnInit {
    countryFormGroup: FormGroup
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.countryFormGroup = this.formBuilder.group({
										continent:['',], 
													thirdCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"' })], 
													secondCountryLongitude:['', RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia"  })], 
								});
    }
}
