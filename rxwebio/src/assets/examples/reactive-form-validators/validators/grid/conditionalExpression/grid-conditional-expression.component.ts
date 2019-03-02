import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-grid-conditionalExpression-validator',
    templateUrl: './grid-conditional-expression.component.html'
})
export class GridConditionalExpressionValidatorComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.digitalInfoFormGroup = this.formBuilder.group({
            soundRecordingGrid:['', RxwebValidators.grid()], 
            photographGrid:['', RxwebValidators.grid({conditionalExpression:'x => x.soundRecordingGrid =="A12425GABC1234002M"' })], 
            audioVisualRecordingGrid:['', RxwebValidators.grid({conditionalExpression:(x,y) => x.soundRecordingGrid == "A12425GABC1234002M"  })], 
        });
    }
}
