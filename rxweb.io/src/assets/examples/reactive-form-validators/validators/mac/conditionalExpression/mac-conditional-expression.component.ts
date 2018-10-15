import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-conditionalExpression-validator',
    templateUrl: './mac-conditional-expression.component.html'
})
export class MacConditionalExpressionValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.macAddressInfoFormGroup = this.formBuilder.group({
										device:['',], 
													localMacAddress:['', RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"' })], 
													macAddress:['', RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop"  })], 
								});
    }
}
