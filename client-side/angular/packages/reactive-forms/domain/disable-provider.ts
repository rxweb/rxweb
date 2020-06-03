import { defaultContainer } from "../core/defaultContainer";
import { InstanceContainer } from "../core/validator.interface";
import { OBJECT_PROPERTY } from "../const/validator.const"
import { ApplicationUtil } from "../util/app-util";
import { RXCODE, MODEL_INSTANCE } from "../const/app.const";
import { instanceProvider } from "../util/instance-provider.function"
import { AbstractControl } from "../abstract/abstract-control";
import { IFormGroup } from "..";

export class DisableProvider {

    constructor(private decoratorType: string, private entityObject: { [key: string]: any }) {

    }



    getFormGroupName(currentFormGroup: IFormGroup<any>) {
        let keyName = '';
        if (currentFormGroup.parent)
            for (var controlName of Object.keys(currentFormGroup.parent.controls))
                if (currentFormGroup.parent.controls[controlName] == currentFormGroup) {
                    keyName = controlName;
                    break;
                }
        return keyName;
    }

    zeroArgumentProcess(control: AbstractControl, columnName: string) {
        let disabledColumns: any[] = [];
        this.getDisabledColumns(<IFormGroup<any>>control.parent, `${columnName}${RXCODE}0`, false).forEach(t => disabledColumns.push(t));
        let path = this.topControlPath(control, columnName);
        let splitPath = path.split(".");
        if (splitPath.length > 1) {
            let rootFormGroup = ApplicationUtil.getRootFormGroup(control);
            this.getDisabledColumns(rootFormGroup, `${path}${RXCODE}0`, true).forEach(t => disabledColumns.push(t));
            let controlPath: string = '';
            for (var i = 0; i < splitPath.length - 2; i++) {
                let controlName = splitPath[i];
                controlPath = `${path.replace(`${controlName}.`, '')}${RXCODE}-0`
                if (rootFormGroup.controls[controlName]) {
                    this.getDisabledColumns(<IFormGroup<any>>rootFormGroup.controls[controlName], controlPath, true, controlName).forEach(t => disabledColumns.push(t));
                    rootFormGroup = <IFormGroup<any>>rootFormGroup.controls[controlName];
                }
            }
        }
        return disabledColumns;
    }

    private getDisabledColumns(formGroup: any, columnName: string, isRoot: Boolean, pathName: string = "") {
        if (formGroup && formGroup[MODEL_INSTANCE]) {
            let instanceContainer = instanceProvider(formGroup[MODEL_INSTANCE].constructor, this.entityObject);
            return this.getChangeDetectionColumns(instanceContainer, columnName, isRoot, pathName)
        } return [];
    }

    private getChangeDetectionColumns(instanceContainer: any, columnName: string, isRoot: Boolean, pathName: string = "") {
        let conditionalDisableControls: { controlPath: any; conditionalExpression: any; isRoot: Boolean; }[] = [];
        let columns = instanceContainer.nonValidationDecorators[this.decoratorType].changeDetection[columnName]
        if (columns) {
            columns.forEach((t: any) => {
                conditionalDisableControls.push({ controlPath: pathName ? `${pathName}.${t}` : t, conditionalExpression: instanceContainer.nonValidationDecorators[this.decoratorType].conditionalExpressions[t], isRoot: isRoot })
            })
        }
        return conditionalDisableControls;
    }

    private topControlPath(control: AbstractControl, columnName: string):any {
        if (control.parent) {
            let name = this.getFormGroupName(control.parent);
            if (name) {
                columnName = `${name}.${columnName}`
                return this.topControlPath(control.parent, columnName)
            }
        }
        return columnName;
    }

    childControlDisabledExpression(formGroup: any, columnName: string, path: string = ""): any[] {
        let disabledColumns: any[]  = [];
        if (formGroup[MODEL_INSTANCE]) {
            let instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
            if (instanceContainer && instanceContainer.properties) {
                this.getChangeDetectionColumns(instanceContainer, columnName, true, path).forEach(t => disabledColumns.push(t));
                var props = instanceContainer.properties.filter(t => t.propertyType == OBJECT_PROPERTY)
                props.forEach(t => {
                    if (formGroup.controls[t.name]) {
                        let columns = this.getDisabledColumns(<any>formGroup.controls[t.name], columnName, true, path ? `${path}.${t.name}` : `${t.name}`)
                        columns.forEach(x => disabledColumns.push(x));
                        this.childControlDisabledExpression((<any>formGroup.controls[t.name]), columnName, path ? `${path}.${t.name}` : `${t.name}`).forEach(y => disabledColumns.push(y))
                    }
                })
            }
        }
        return disabledColumns;
    }

    oneArgumentProcess(control: AbstractControl, columnName: string): any[] {
        let path = this.topControlPath(control, columnName);
        let rootFormGroup = ApplicationUtil.getRootFormGroup(control);
        let childColumns = this.childControlDisabledExpression(rootFormGroup, path);
        return childColumns;
    }
}