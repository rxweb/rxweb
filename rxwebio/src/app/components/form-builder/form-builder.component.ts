import { Component, OnInit, ComponentFactoryResolver } from "@angular/core";
import { FormGroup, FormArray, FormControl, FormBuilder } from "@angular/forms";
import { RxFormBuilder, RxwebValidators, FormBuilderConfiguration } from "@rxweb/reactive-form-validators";
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
  editorOptions = {theme: 'vs-light', language: 'json'};
  formBuilderTab:string = "example"
  validators:any[] = [];
  isCorrectJson: boolean = false;
  property: string = "";
  example: any = {}
  exampleComponent: any = {};
  showComponent: boolean = false;
  formBuilderFormGroup: FormGroup;
  validatorType: string[] = ["Validators", "Template Driven", "Decorators"]
  showValidatorType: boolean = false;
  properties: any[];
  validatorList: any[] = [];
  parseJson: any = {};
  formBuilderModel: FormBuilderModel;
  validatorListItem = FormBuilderData.GetValidators();
  oldProperties = [];
  builderGroup : FormGroup;
  constructor(
    private formBuilder: RxFormBuilder, private toast: RxToast, private popup: RxPopup,
    private componentFactoryResolver: ComponentFactoryResolver,private formBuilderObj: FormBuilder,
  ) {
    this.popup.setComponent(componentFactoryResolver);
  }
  ngOnInit(): void {
    
    this.formBuilderModel = new FormBuilderModel();
    this.formBuilderFormGroup = this.formBuilder.formGroup(this.formBuilderModel);
    let validatorList = [];
    Object.keys(this.validatorListItem).map(function (key, index) {
      validatorList[index] = {}
      validatorList[index]['validatorName'] = key;
    });
    this.validatorList = validatorList;

    this.formBuilderFormGroup.controls['Json'].patchValue('{"firstName":"Ishani","lastName":"Shah"}');
    this.changeJson();

    this.showComponent = true;
   
  }
  setValidatorType(value){
    this.formBuilderFormGroup.controls.validatorType.patchValue(value)
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
        let values: string[] = Object.values(this.parseJson);
        if (this.oldProperties.length > 0) {
          for (let i = this.oldProperties.length - 1; i >= 0; i--) {
            let isExist = this.properties.indexOf(this.oldProperties[i]) >= 0 ? true : false;
            if (!isExist) {
              this.oldProperties.splice(i, 1);
              properties.removeAt(i);
            }
          }
        }
        this.properties.forEach((element, index) => {
          let dynamicForm ={}
          let dynamicFormItem = {};
          let property = new Properties();
          property.propertyName = element;
          property.propertyValue = values[index];
          dynamicForm[element] = new FormControl(values[index]);
          dynamicFormItem[element] = values[index];
          property.validatorName = [];
          property.otherProperties = this.properties.filter(a => a != property.propertyName);

          if (this.oldProperties.indexOf(property.propertyName) < 0) {
            this.oldProperties.push(property.propertyName)
            properties.push(this.formBuilder.formGroup(property))
          }
        })
      }
    }
  }

  addValidator(validatorName, propertyData, index) {
    this.validators.push(validatorName.id);
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
    this.popup.show(ParameterItemsComponent, { parameters: parameterItem, validatorName: validatorName.id, index: index, propertyData: propertyData }).then(a => this.initData(a));
  }
  initData(params) {
    let validator: Validators = new Validators();
    validator.validatorName = params.parameterFormGroup.validatorName;
    validator.parameterItems = params.parameterFormGroup.parameterItems;
    let obj = this.formBuilder.formGroup(validator);
    let validators = this.formBuilderFormGroup.get('properties')['controls'][params.index].get('validators') as FormArray
    validators.push(this.formBuilder.formGroup(validator));
    this.setvalidatorModelString();
  }
  
  removedValidator(validatorName, propertyName, index) {
    let indexOf = this.validators.indexOf(validatorName.id);
    let validators = this.formBuilderFormGroup.controls.properties['controls'][index]['controls']['validators'] as FormArray;
    validators.removeAt(indexOf)
    this.validators.removeAt(indexOf)
    this.setvalidatorModelString();
  }
  setvalidatorModelString() {
    
    let JsonObj = {};

    let modelName = this.formBuilderFormGroup.value.modelName == undefined ? "formGroup" : this.formBuilderFormGroup.value.modelName + "FormGroup";
    let decoratorModelName = this.formBuilderFormGroup.value.modelName == undefined ? "FormBuilderModel" : this.formBuilderFormGroup.value.modelName;
    let selectorName = this.formBuilderFormGroup.value.selectorName == undefined ? "app-form" : "app-" +this.formBuilderFormGroup.value.selectorName;
    let templateUrl = this.formBuilderFormGroup.value.templateUrl == undefined ? "./form-builder.component.html" : this.formBuilderFormGroup.value.templateUrl;
    let componentName = this.formBuilderFormGroup.value.compoenentName == undefined ? "FormBuilderComponent" : this.formBuilderFormGroup.value.compoenentName;

    let formGroupValue = this.formBuilderFormGroup.value;
    let decoratorModelString = "import {" + this.validators.join(",")+ "} from '@rxweb/reactive-form-validators'\nexport class " + decoratorModelName + " {" ;
    let validatorModelString = "import { Component, OnInit } from '@angular/core';\n"
    validatorModelString += "import { FormGroup, FormBuilder } from '@angular/forms';\n";
    validatorModelString += "import { RxwebValidators } from '@rxweb/reactive-form-validators';\n";
    validatorModelString += "@Component({\n";
    validatorModelString += "\tselector:'"+selectorName+"'\n";
    validatorModelString += "\templateUrl:'"+templateUrl+"'\n";
    validatorModelString += "})\n\n";
    validatorModelString += "export class " + componentName  + " implements OnInit {\n";
    validatorModelString += "\t" + modelName + " : FormGroup\n";
    validatorModelString += "\tconstructor(private formBuilder: FormBuilder){}\n";
    validatorModelString += "\tngOnInit() {\n";
    validatorModelString += "\t\tthis."+ modelName + " = this.formBuilder.group({";
    let propertiesLength = formGroupValue.properties.length;
    for (let i = 0; i < propertiesLength; i++) {
      let validatorsLength = formGroupValue.properties[i].validators ? formGroupValue.properties[i].validators.length : 0;
      if (validatorsLength > 0) {
        let propertyName = formGroupValue.properties[i].propertyName;
        let propertyValue = formGroupValue.properties[i].propertyValue;
        validatorModelString += "\n\t\t\t\t\t\t" + propertyName + " : [\"" + propertyValue + "\",";
        JsonObj[propertyName] = {};
        for (let j = 0; j < validatorsLength; j++) {
          let validatorName = formGroupValue.properties[i].validators[j].validatorName;
          if (validatorName != "password")
            JsonObj[propertyName][validatorName] = true
          else
            JsonObj[propertyName][validatorName] = {}
          let parameterItems = formGroupValue.properties[i].validators[j].parameterItems;
          validatorModelString += "RxwebValidators." + validatorName + "("
          decoratorModelString+= "\n\t@" + validatorName+"("
          let parameterItemsLength = parameterItems ? parameterItems.length : 0;
          let isValueExist = parameterItems.where(a => a.keyValue === "").length
          if (parameterItemsLength > 0 && isValueExist !== parameterItemsLength) {
            validatorModelString += "{"
            decoratorModelString += "{"
            JsonObj[propertyName][validatorName] = {}
          }
          for (let k = 0; k < parameterItemsLength; k++) {
            let keyLabel = parameterItems[k].keyLabel;
            let parameterType = parameterItems[k].parameterType;
            let keyValue = "";
            if (keyLabel == "validation") { 
              JsonObj[propertyName][validatorName][keyLabel] = {};
              let keyData = "";
              let subParameterItemsLength = parameterItems[k].subParamerterItems ? parameterItems[k].subParamerterItems.length : 0;
              let isValueSubParmsExist = parameterItems[k].subParamerterItems.where(a => a.keyValue === "").length
              if (subParameterItemsLength > 0 && isValueSubParmsExist !== subParameterItemsLength)
                keyData += "{"
              for (let x = 0; x < subParameterItemsLength; x++) {
                let keyLabel = parameterItems[k].subParamerterItems[x].keyLabel;
                let keyValue = parameterItems[k].subParamerterItems[x].keyValue;
                let parameterType = parameterItems[k].subParamerterItems[x].parameterType;
                if (keyValue !== "")
                  if (parameterType == "boolean" || parameterType == "number")
                    keyData += keyLabel + ":" + keyValue + ","
                  else
                    keyData += keyLabel + ":" + "\"" + keyValue + "\","
              }
              keyData = keyData.replace(/,\s*$/, "");
              if (subParameterItemsLength > 0 && isValueSubParmsExist !== subParameterItemsLength)
                keyData += "}"
              keyValue = keyData;
              if (keyValue !== "")
              {
                validatorModelString += keyLabel + ":" + keyValue;
                decoratorModelString += keyLabel + ":" + keyValue;
              }
            }
            else {
              keyValue = parameterItems[k].keyValue;
              if (keyValue !== "") {
                if (parameterType == "boolean" || parameterType == "number")
                {
                  validatorModelString += keyLabel + ":" + keyValue + ","
                  decoratorModelString += keyLabel + ":" + keyValue + ","
                }
                else
                {
                  validatorModelString += keyLabel + ":" + "\"" + keyValue + "\","
                  decoratorModelString += keyLabel + ":" + "\"" + keyValue + "\","
                }
              }
            }
            if (keyValue !== "")
              JsonObj[propertyName][validatorName][keyLabel] = keyValue;
          }
          validatorModelString = validatorModelString.replace(/,\s*$/, "");
          decoratorModelString = decoratorModelString.replace(/,\s*$/, "");
          if (parameterItemsLength > 0 && isValueExist != parameterItemsLength){
            validatorModelString += "}"
            decoratorModelString+="}"
          }
          validatorModelString += "),";
          decoratorModelString += ");\n";
        }
        decoratorModelString = decoratorModelString.replace(/\n\s*$/, "");;
        validatorModelString = validatorModelString.replace(/,\s*$/, "");
        validatorModelString += "]";
        decoratorModelString += "\n\t" + propertyName + ":any;" ;
      }
      debugger
      let formBuilderConfiguration = new FormBuilderConfiguration();
      formBuilderConfiguration.dynamicValidation = JsonObj;
      this.builderGroup = this.formBuilder.group(this.parseJson,formBuilderConfiguration);
    }
    validatorModelString += "\n\t\t})";
    validatorModelString += "\n\t}\n}";
    decoratorModelString += "\n";
    decoratorModelString += "}";
    this.exampleComponent['validatorModelString'] = validatorModelString;
    this.exampleComponent['decoratorModelString'] = decoratorModelString;
    this.formBuilderTab = "decorator"
    this.exampleComponent['Json'] = JSON.stringify(JsonObj);
  }
  }
