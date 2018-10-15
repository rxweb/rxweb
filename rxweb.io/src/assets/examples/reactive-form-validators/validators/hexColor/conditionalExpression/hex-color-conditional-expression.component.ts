import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-conditionalExpression-validator',
    templateUrl: './hex-color-conditional-expression.component.html'
})
export class HexColorConditionalExpressionValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.hexcolorInfoFormGroup = this.formBuilder.group({
										color:['', RxwebValidators.hexColor()], 
													headerHexcolorCode:['', RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"' })], 
													footerHexCode:['', RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF" })], 
								});
    }
}
