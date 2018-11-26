import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-complete-validator',
    templateUrl: './hex-color-complete.component.html'
})
export class HexColorCompleteValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.hexcolorInfoFormGroup = this.formBuilder.group({
            color:['', RxwebValidators.hexColor()], 
            footerHexCode:['', RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF" })], 
            headerHexcolorCode:['', RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"' })], 
            bodyHexcolorCode:['', RxwebValidators.hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"' })], 
        });
    }
}
