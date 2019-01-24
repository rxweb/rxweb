import { Component, OnInit, ComponentFactoryResolver } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { FormBuilderModel, Properties, Validators, ParameterItems } from "./form-builder.model";
import { FormBuilderData } from "./form-builder.data";
import { RxToast, RxPopup } from "@rx/view";
import { ParameterItemsComponent } from "./parameter-items/parameter-items.component";
import '@rx/linq';

@Component({
  templateUrl: './form-builder.component.html',
  entryComponents: [ParameterItemsComponent]
})
export class FormBuilderComponent implements OnInit {
  isCorrectJson: boolean = false;
  property: string = "";
  example: any = {}
 
  showComponent: boolean = false;
  formBuilderFormGroup: FormGroup;
  validatorType: string[] = ["Validators", "Template Driven", "Decorators"]
  showValidatorType: boolean = false;
  properties: any[];
  validatorList: any[]=[];
  parseJson: any = {};
  formBuilderModel: FormBuilderModel;
  validatorListItem = FormBuilderData.GetValidators();
  oldProperties = [];
  formBuilderTab: string = 'json';
  constructor(
    private formBuilder: RxFormBuilder, private toast: RxToast,private popup:RxPopup,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.popup.setComponent(componentFactoryResolver);
  }
  ngOnInit(): void {
    this.formBuilderModel = new FormBuilderModel();
    this.formBuilderFormGroup = this.formBuilder.formGroup(this.formBuilderModel);
    let validatorList =[];
    Object.keys(this.validatorListItem).map(function(key,index){
      validatorList[index] = {}
      validatorList[index]['validatorName'] = key;
    });
    this.validatorList = validatorList;

    this.formBuilderFormGroup.controls['Json'].patchValue('{"firstName":"Ishani","lastName":"Shah"}');
    this.changeJson();

    this.showComponent = true;
  }
  changeJson() {
    if (this.formBuilderFormGroup.controls['Json'].value != undefined && this.formBuilderFormGroup.controls['Json'].value != "") {
      try {
        this.isCorrectJson = true
        this.parseJson = JSON.parse(this.formBuilderFormGroup.controls['Json'].value);
      }
      catch (ex) {
        this.toast.show("Please Enter Correct Json", { status: 'error' });
        this.isCorrectJson = false;
      }
      if (this.isCorrectJson) {
        let properties = this.formBuilderFormGroup.controls.properties as FormArray;
        this.showValidatorType = true;

        this.properties = Object.keys(this.parseJson);
        if (this.oldProperties.length > 0) {
          for (var i = this.oldProperties.length - 1; i >= 0; i--) {
            var isExist = this.properties.indexOf(this.oldProperties[i]) >= 0 ? true : false;
            if (!isExist) {
              this.oldProperties.splice(i, 1);
              properties.removeAt(i);
            }
          }
        }
        this.properties.forEach((element, index) => {
          let property = new Properties();
          property.propertyName = element;
          property.validatorName = [];
          property.otherProperties = this.properties.filter(a => a != property.propertyName);
          
          if (this.oldProperties.indexOf(property.propertyName) < 0) {
            this.oldProperties.push(property.propertyName)
            properties.push(this.formBuilder.formGroup(property))
          }
        })
        debugger;
      }
    }
  }

  addValidator(validatorName,propertyData,index){
    let parameterItem = new Array<ParameterItems>();
    this.validatorListItem[validatorName.id].forEach((element, index) => {
      let parameterItems = new ParameterItems();
      parameterItems.keyLabel = Object.keys(element)[0];
      parameterItems.keyValue = "";
      if (typeof Object.values(element)[0] == "object") {
        parameterItems.parameterType = Object.keys(Object.values(element)[0])[0];
        parameterItems.subParamerterItems = [];
        let subParameter = this.validatorListItem[validatorName.id][index][parameterItems.keyLabel][parameterItems.parameterType];
        subParameter.forEach((obj, index) => {
          let subParameterItem = new ParameterItems();
          subParameterItem.keyLabel = Object.keys(obj)[0];
          subParameterItem.keyValue = "";
          subParameterItem.parameterType = Object.values(obj)[0];
          parameterItems.subParamerterItems.push(subParameterItem)
        })
      }
      else
        parameterItems.parameterType = Object.values(element)[0];
      parameterItem.push(parameterItems)
    })
    this.popup.show(ParameterItemsComponent,{parameters:parameterItem,validatorName:validatorName.id,index:index,propertyData:propertyData}).then(a=>this.initData(a));
  }
  initData(params){
    
    let validator :Validators =new Validators();
    validator.validatorName = params.parameterFormGroup.validatorName;
    validator.parameterItems = params.parameterFormGroup.parameterItems;
    var obj = this.formBuilder.formGroup(validator);
    let validators = this.formBuilderFormGroup.controls.properties['controls'][params.index]['controls']['validators'] as FormArray;
    validators.push(obj);
  }
  removedValidator(validatorName,propertyName,index){
    let validators = this.formBuilderFormGroup.controls.properties['controls'][index]['controls']['validators'].value;
    let indexObj =  validators.findIndex(a=>a.validatorName == validatorName.id);
    validators.removeAt(indexObj)
  }
  
}
