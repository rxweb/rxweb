import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-conditionalExpression-validator',
    templateUrl: './alpha-numeric-conditional-expression.component.html'
})
export class AlphaNumericConditionalExpressionValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
										areaName:['', RxwebValidators.alphaNumeric()], 
													cityCode:['', RxwebValidators.alphaNumeric({conditionalExpression:'x => x.areaName =="Boston"' })], 
													countryCode:['', RxwebValidators.alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Boston"  })], 
								});
    }
}
