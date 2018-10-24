import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-hexColor-dynamic-validator',
    templateUrl: './hex-color-dynamic.component.html'
})
export class HexColorDynamicValidatorComponent implements OnInit {
    hexcolorInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			color : {
				hexColor :true  
			},			
			headerHexcolorCode : {
				hexColor : {conditionalExpression:'x => x.color == "#AFAFAF"',} 
			},			
			bodyHexcolorCode : {
				hexColor : {message:'Please enter the right format of hexcode for body like "#AFAFAF"',} 
			},
		};
		var hexcolorInfo = { color:'', footerHexCode:'', headerHexcolorCode:'', bodyHexcolorCode:'',  }
		this.hexcolorInfoFormGroup = this.formBuilder.group(hexcolorInfo,formBuilderConfiguration);
    }
}
