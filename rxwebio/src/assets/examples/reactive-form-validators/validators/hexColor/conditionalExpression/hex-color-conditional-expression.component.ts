import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-conditionalExpression-validator',
    templateUrl: './hex-color-conditional-expression.component.html'
})
export class HexColorConditionalExpressionValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.hexcolorInfoFormGroup = this.formBuilder.group({
            color:['', RxwebValidators.hexColor()], 
            headerHexcolorCode:['', RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"' })], 
            footerHexCode:['', RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF" })], 
        });
    }
}
