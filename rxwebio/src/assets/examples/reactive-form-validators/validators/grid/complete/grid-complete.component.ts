import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-grid-complete-validator',
    templateUrl: './grid-complete.component.html'
})
export class GridCompleteValidatorComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.digitalInfoFormGroup = this.formBuilder.group({
            soundRecordingGrid:['', RxwebValidators.grid()], 
            audioVisualRecordingGrid:['', RxwebValidators.grid({conditionalExpression:(x,y) => x.soundRecordingGrid == "A12425GABC1234002M"  })], 
            photographGrid:['', RxwebValidators.grid({conditionalExpression:'x => x.soundRecordingGrid =="A12425GABC1234002M"' })], 
            graphicImageGrid:['', RxwebValidators.grid({message:'This is Not valid GRid' })], 
        });
    }
}
