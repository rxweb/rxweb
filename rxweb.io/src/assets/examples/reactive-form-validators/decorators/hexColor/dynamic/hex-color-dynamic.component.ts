import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexColor-dynamic',
    templateUrl: './hex-color-dynamic.component.html'
})
export class HexColorDynamicComponent implements OnInit {

    hexcolorInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let hexcolorInfo = new HexcolorInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			color : {
				hexColor : true  
			},
						
			footerHexCode : {
				hexColor :  {conditionalExpression:(x,y) =>x.color == "#AFAFAF",} 
			},
						
			headerHexcolorCode : {
				hexColor :  {conditionalExpression:'x => x.color == "#AFAFAF"',} 
			},
						
			bodyHexcolorCode : {
				hexColor :  {message:'Please enter the right format of hexcode for body like "#AFAFAF"',} 
			},
			        };
		this.hexcolorInfoFormGroup = this.formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
    }
}
