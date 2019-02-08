import { Component, OnInit, ComponentFactoryResolver } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { RxFormBuilder, RxwebValidators, FormBuilderConfiguration } from "@rxweb/reactive-form-validators";
import { RxToast, RxPopup } from "@rx/view";
import '@rx/linq';
import { DynamicFormBuilderModel, PropertyModel, Model } from "./dynamic-form-builder.model";
import { ValidationComponent } from "./validation/validation.component";
import { DynamicFormBuilderDomain } from "./domain/dynamic-form-builder.domain";
import { conditionallyCreateMapObjectLiteral } from "@angular/compiler/src/render3/view/util";

@Component({
    templateUrl: './dynamic-form-builder.component.html',
})

export class DynamicFormBuilderComponent extends DynamicFormBuilderDomain implements OnInit {
    editorOptions = { theme: 'vs-light', language: 'json' };
    dynamicFormBuilderFormGroup: FormGroup;
    dynamicFormBuilderModel: DynamicFormBuilderModel;
    showComponent: boolean = false;
    modelList: Model[] = new Array<Model>();
    exampleContent: any = {}
    builderGroup: FormGroup;
    JsonObj: any = {};
    constructor(
        private formBuilder: RxFormBuilder, private toast: RxToast, private popup: RxPopup,
        private componentFactoryResolver: ComponentFactoryResolver, private formBuilderObj: FormBuilder,
    ) {
        super();
        this.popup.setComponent(componentFactoryResolver);
    }
    ngOnInit(): void {
        this.dynamicFormBuilderModel = new DynamicFormBuilderModel();
        this.dynamicFormBuilderFormGroup = this.formBuilder.formGroup(this.dynamicFormBuilderModel);
        //this.dynamicFormBuilderFormGroup.controls['json'].patchValue('{\n\t"firstName":"Ishani",\n\t"lastName":"Shah",\n\t"address":{\n\t\t"addressType":"Office",\n\t\t"description":"Ahmedabad","address":{"abc":"frsds","dsd":{"asdsadas":"asdadsa"}}\n\t},\n\t"hobbies":[{\n\t\t\t\t"hobbyName":"Cricket",\n\t\t\t\t"type":"Outdoor"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t"hobbyName":"Chess",\n\t\t\t\t"type":"Indoor"\n\t\t\t\t}\n\t]\n}');
        this.dynamicFormBuilderFormGroup.controls['json'].patchValue('{\n\t"firstName":"@Ishani",\n\t"lastName":"Shah"\n}');
        this.changeJson()
        this.showComponent = true;
    }
    changeJson(): void {
        let parsedjson = JSON.parse(this.dynamicFormBuilderFormGroup.controls['json'].value);
        this.dynamicFormBuilderFormGroup.setControl("keyList", this.formBuilderObj.array(new Array<PropertyModel>()));
        let keyList = this.dynamicFormBuilderFormGroup.controls['keyList'] as FormArray;
        this.modelList = this.getPropertyName(keyList, parsedjson, this.modelList)
        this.setOtherProperty()
    }
    setOtherProperty() {
        let properties = this.dynamicFormBuilderFormGroup.controls['keyList'].value;
        for (let i = 0; i < properties.length; i++) {
            let listOfItem = properties.filter(a => a.propertyName != properties[i].propertyName);
            this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][i]['controls']['otherProperties'].patchValue(listOfItem)
        }
    }
    getPropertyName(keyList, jsonObject, modelList, parentKey = "", isArray = false, index = undefined) {

        for (var key in jsonObject) {
            let model: Model = new Model();
            let propertyModel: PropertyModel = new PropertyModel();
            if (jsonObject.hasOwnProperty(key)) {
                if (typeof jsonObject[key] == "string") {
                    propertyModel.isRemoved = false;
                    if (parentKey != "") {
                        var parentKeyArray = parentKey.split(".");
                        propertyModel.propertyName = parentKey + "." + key;
                        propertyModel.propertyValue = jsonObject[key]
                        model.annotationType = "@prop()"
                        model.modelName = parentKeyArray[parentKeyArray.length - 1];
                        model.propertyName = key
                        model.refrenceType = null;
                        model.isRemoved = false
                        var isExist = modelList.filter(a => a.propertyName == key && a.modelName == model.modelName);
                        if (isExist.count() == 0 && !isArray)
                            modelList.push(model)

                        // if(isArray){

                        // }
                    }
                    else {
                        propertyModel.propertyName = key;
                        propertyModel.propertyValue = jsonObject[key]
                        model.annotationType = "@prop()"
                        model.modelName = "FormModel"
                        model.propertyName = key
                        model.refrenceType = null;
                        model.isRemoved = false
                        var isExist = modelList.filter(a => a.propertyName == key && a.modelName == model.modelName);
                        if (isExist.count() == 0 && !isArray)
                            modelList.push(model)
                    }
                    keyList.push(this.formBuilder.formGroup(propertyModel));
                }
                else if (typeof jsonObject[key] == "object") {
                    parentKey += "." + key
                    if (parentKey.charAt(0) === ".")
                        parentKey = parentKey.substr(1, parentKey.length)
                    if (jsonObject[key].length > 0) {
                        // model.annotationType = "@propArray()"
                        // model.modelName =   "FormModel"
                        // model.propertyName = key
                        // model.refrenceType = "FormModel";
                        // model.isRemoved = false 
                        // var isExist = modelList.filter(a=>a.propertyName == key && a.modelName == model.modelName);
                        // if(isExist.count() == 0 && !isArray)
                        //     modelList.push(model)
                        for (var i = 0; i < jsonObject[key].length; i++)
                            modelList = this.getPropertyName(keyList, jsonObject[key][i], modelList, key + "[" + i + "]", true, i)
                    }
                    else {
                        model.annotationType = "@propObject()"
                        model.modelName = (parentKey.indexOf(".") >= 0) ? key : "FormModel"
                        model.propertyName = key
                        model.refrenceType = key;
                        model.isRemoved = false
                        var isExist = modelList.filter(a => a.propertyName == key && a.modelName == model.modelName);
                        if (isExist.count() == 0 && !isArray)
                            modelList.push(model)
                        modelList = this.getPropertyName(keyList, jsonObject[key], modelList, parentKey)
                    }
                }
            }
        }
        return modelList;
    }
    markedAsRemove(index) {
        this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][index]['controls'].isRemoved.patchValue(!this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][index].value.isRemoved);
    }
    applyValidation(index) {
        this.popup.show(ValidationComponent, { dynamicFormBuilderFormGroup: this.dynamicFormBuilderFormGroup, index: index }).then(params => this.setContent(params));
    }
    setContent(params) {
        let JsonObj = {}
        // var objectArray = this.modelList.groupBy(a => a.modelName, a => a)
        // let modelString = "";
        // for (let object in objectArray) {
        //     if (objectArray.hasOwnProperty(object)) {
        //         let currentObject = objectArray[object];
        //         modelString += `\nexport class ${super.pascalCase(currentObject[0]['modelName'])} {`
        //         for (let i = 0; i < currentObject.length; i++) {
        //             modelString += `\n\t${currentObject[i].annotationType}\n\t${currentObject[i].propertyName}`
        //             if (currentObject[i].refrenceType == null)
        //                 modelString += `:any\n`;
        //             else
        //                 modelString += `:${super.pascalCase(currentObject[i].refrenceType)}\n`;
        //         }
        //         modelString += `}`
        //     }
        // }
        // this.exampleContent["decoratorModelString"] = modelString;
        this.dynamicFormBuilderFormGroup = params.dynamicFormBuilderFormGroup;
        debugger;  
        let modelString = "export class FormModel {"; 
        let formGroupValue = this.dynamicFormBuilderFormGroup.value;
        let propertiesLength = formGroupValue.keyList.length;
        for (let i = 0; i < propertiesLength; i++) {
            let validatorsLength = formGroupValue.keyList[i].validators ? formGroupValue.keyList[i].validators.length : 0;
            if (validatorsLength > 0 && !formGroupValue.keyList[i].isRemoved) {
                let propertyName = formGroupValue.keyList[i].propertyName;
                this.JsonObj[propertyName] = {};
                for (let j = 0; j < validatorsLength; j++) {
                    let validatorName = formGroupValue.keyList[i].validators[j].validatorName;
                    let condtionalItems =  formGroupValue.keyList[i].validators[j]['parameterItems'].where(a=>a.keyLabel == "conditionalExpression" && a.conditionalExpressionModels.length > 0)
                    if(condtionalItems != undefined && condtionalItems.length > 0){
                        let conditionalData = condtionalItems[0].conditionalExpressionModels;
                        for (let o = 0; o < conditionalData.length; o++) {
                            if(conditionalData[o].fieldName != "" && conditionalData[o].operator != "" && conditionalData[o].fieldValue != ""){
                                this.JsonObj[conditionalData[o].fieldName] = {};
                                modelString+="\n\t\t\t@prop()\n\t\t\t" + conditionalData[o].fieldName + ":any";
                            }
                        }
                    }
                    let dependentProperty =  formGroupValue.keyList[i].validators[j]['parameterItems'].where(a=>a.keyLabel == "fieldName")
                    if(dependentProperty != undefined && dependentProperty.length > 0 && dependentProperty[0].keyValue != ""){
                        this.JsonObj[dependentProperty[0].keyValue] = {};
                        modelString+="\n\t\t\t@prop()\n\t\t\t" + dependentProperty[0].keyValue + ":any";
                    }
                    let isHide = formGroupValue.keyList[i].validators[j].isHide;
                    if (!isHide) {
                        if (validatorName != "password")
                            this.JsonObj[propertyName][validatorName] = true
                        else
                            this.JsonObj[propertyName][validatorName] = {}
                        let parameterItems = formGroupValue.keyList[i].validators[j].parameterItems;
                        let parameterItemsLength = parameterItems ? parameterItems.length : 0;
                        let isValueExist = parameterItems.where(a => a.keyValue === "").length
                        modelString+="\n\t\t\t@"+validatorName+"("
                        if (parameterItemsLength > 0 && isValueExist !== parameterItemsLength) {
                            this.JsonObj[propertyName][validatorName] = {}
                            modelString+="{"
                        }
                        for (let k = 0; k < parameterItemsLength; k++) {
                            let keyLabel = parameterItems[k].keyLabel;
                            let keyValue = parameterItems[k].keyValue;
                            if (keyValue !== "")
                            {
                                if(k == 0)
                                    modelString+=keyLabel + ":" +'"' + keyValue + '"';
                                else
                                    modelString+="," + keyLabel + ":" +'"' + keyValue + '"';
                                this.JsonObj[propertyName][validatorName][keyLabel] = keyValue;
                            }
                        }
                        if (parameterItemsLength > 0 && isValueExist !== parameterItemsLength) {
                            modelString+="}"
                        }
                        modelString+=")\n"
                        modelString+="\t\t\t" + propertyName + ":any" ;
                    }
                }
            }
        }
        modelString += "\n}"
        let formBuilderConfiguration = new FormBuilderConfiguration();
        this.exampleContent["jsonObj"] = JSON.stringify(this.JsonObj);
        this.exampleContent["decoratorModelString"] = modelString;
        formBuilderConfiguration.dynamicValidation = this.JsonObj;
        let parsedJson = JSON.parse(this.dynamicFormBuilderFormGroup.controls['json'].value);
        
        this.builderGroup = this.formBuilder.group(parsedJson, formBuilderConfiguration);

    }
}
