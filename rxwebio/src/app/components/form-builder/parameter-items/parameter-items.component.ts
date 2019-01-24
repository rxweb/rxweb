import { Component, OnInit, Input } from "@angular/core";
import { RxPopup } from "@rx/view/views";
import { FormGroup } from "@angular/forms";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { Properties, Validators } from "../form-builder.model";

@Component({
    templateUrl: './parameter-items.component.html',
})
export class ParameterItemsComponent implements OnInit {
    showComponent: boolean = false;
    @Input() parameters:any;
    @Input() validatorName:string;
    @Input() index:number;
    @Input() propertyData:any;
    parameterFormGroup:FormGroup;
    validators:Validators = new Validators();
    otherProperties:string[]=[];
    ipVersions = ["V4", "V6", "AnyOne"]
    numericValueTypes = ["PositiveNumber", "NegativeNumber", "Both"]
    constructor(
        private popup:RxPopup, private formBuilder: RxFormBuilder
    ) {
    }
    ngOnInit(): void {
        this.otherProperties = this.propertyData.otherProperties;
        this.validators = new Validators();
        this.validators.validatorName = this.validatorName;
        this.validators.parameterItems = this.parameters;
        this.parameterFormGroup = this.formBuilder.formGroup(this.validators);
        this.showComponent = true;
    }
    hideParameterItems(){
        this.popup.hide(ParameterItemsComponent);
    }
    submitParameterItems(){
        this.popup.hide(ParameterItemsComponent,{parameterFormGroup:this.parameterFormGroup.value,index:this.index});
    }
}
