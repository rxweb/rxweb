import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-port-complete-validator',
    templateUrl: './port-complete.component.html'
})
export class PortCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										browser:['',], 
													entertainmentWebsitePort:['', RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome"  })], 
													shoppingWebsitePort:['', RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"' })], 
													educationalWebsitePort:['', RxwebValidators.port({message:'{{0}} is not a proper port number' })], 
								});
    }
}
