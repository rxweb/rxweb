import { Component, OnInit, Input } from "@angular/core";
import { RxPopup } from "@rx/view/views";
import { FormGroup, FormArray } from "@angular/forms";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { FormBuilderData } from "../../form-builder/form-builder.data";
import { Validators, ParameterItems, ConditionalExpressionModel } from "../dynamic-form-builder.model";
import { Conditional } from "@angular/compiler";

@Component({
    templateUrl: './validation.component.html',
})
export class ValidationComponent implements OnInit {
    showComponent: boolean = false;
    @Input() dynamicFormBuilderFormGroup: FormGroup;
    resetDynamicFormBuilderFormGroup: FormGroup;
    @Input() index: number;
    ipVersions = ["V4", "V6", "AnyOne"]
    numericValueTypes = ["PositiveNumber", "NegativeNumber", "Both"];
    operators = ["==", "!=", "<=", "<", ">", ">="]
    validatorList: any[] = []
    constructor(
        private popup: RxPopup, private formBuilder: RxFormBuilder
    ) {
    }
    ngOnInit(): void {
        this.resetDynamicFormBuilderFormGroup = this.dynamicFormBuilderFormGroup;
        let validators = this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][this.index]['controls']['validators'] as FormArray;
        let validatorValue = validators.value;
        let validatorItems = [];
        let validatorListItem = FormBuilderData.GetValidators();
        Object.keys(validatorListItem).map(function (key, index) {
            let isExist = validatorValue.findIndex(a => a.validatorName == key);
            if (isExist < 0) {
                let validator: Validators = new Validators();
                validator.validatorName = key;
                validator.isHide = true;
                validator.parameterItems = new Array<ParameterItems>();
                let parameterItems: Array<ParameterItems> = Object.values(validatorListItem[key]);
                for (let i = 0; i < parameterItems.length; i++) {
                    let parameterItem: ParameterItems = new ParameterItems();
                    parameterItem.keyLabel = parameterItems[i]['parameterName'];
                    parameterItem.keyValue = "";
                    parameterItem.parameterType = parameterItems[i]['parameterType'];
                    parameterItem.isRequired = parameterItems[i]['isRequired'];
                    validator.parameterItems.push(parameterItem);
                }
                validatorItems.push(validator)
            }
        });
        for (let i = 0; i < validatorItems.length; i++) {
            validators.push(this.formBuilder.formGroup(validatorItems[i]));
        }
        this.showComponent = true;
    }
    showHidePanel(i, value) {
        let validators = this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][this.index]['controls']['validators'] as FormArray;
        validators.controls[i]['controls'].isHide.patchValue(value);
    }
    closeValidation() {
        this.popup.hide(ValidationComponent, { "dynamicFormBuilderFormGroup": this.resetDynamicFormBuilderFormGroup });
    }
    addConditionalExpression(index, validatorIndex, parameterIndex) {
        let conditionalExpression: ConditionalExpressionModel = new ConditionalExpressionModel();
        conditionalExpression.fieldName = "";
        conditionalExpression.operator = "";
        conditionalExpression.fieldValue = "";
        let conditional = this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][index]['controls']['validators']['controls'][validatorIndex]['controls']["parameterItems"]['controls'][parameterIndex]['controls']['conditionalExpressionModels'] as FormArray;
        conditional.push(this.formBuilder.formGroup(conditionalExpression));
    }
    removeConditionalExpression(index, validatorIndex, parameterIndex, conditionalIndex) {
        let conditional = this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][index]['controls']['validators']['controls'][validatorIndex]['controls']["parameterItems"]['controls'][parameterIndex]['controls']['conditionalExpressionModels'] as FormArray;
        conditional.removeAt(conditionalIndex);
    }
    submitValidation() {
        let validator = this.dynamicFormBuilderFormGroup.controls['keyList']['controls'][this.index]['controls']['validators'] as FormArray
        validator.controls.forEach((element, index) => {
            let condtionalItems = element.value['parameterItems'].where(a => a.keyLabel == "conditionalExpression" && a.conditionalExpressionModels.length > 0)
            let findIndex = element.value['parameterItems'].findIndex(a => a.keyLabel == "conditionalExpression" && a.conditionalExpressionModels.length > 0)
            let keyValue = ""
            if (condtionalItems.length > 0) {
                condtionalItems[0].conditionalExpressionModels.forEach((conditional, subIndex) => {
                    if(conditional.fieldName != "" && conditional.operator!="" && conditional.fieldValue !=""){
                        if (subIndex == 0)
                            keyValue += " x." + conditional.fieldName + " " + conditional.operator + " '" + conditional.fieldValue + "'"
                        else
                            keyValue += " && " + " x." + conditional.fieldName + " " + conditional.operator + " '" + conditional.fieldValue + "'"
                    }
                })
                if (findIndex != -1 && keyValue.length > 0)
                    element['controls']['parameterItems']['controls'][findIndex]["controls"]["keyValue"].patchValue("(x,y) => " + keyValue);
            }
        });
        this.popup.hide(ValidationComponent, { "dynamicFormBuilderFormGroup": this.dynamicFormBuilderFormGroup });
    }
}
