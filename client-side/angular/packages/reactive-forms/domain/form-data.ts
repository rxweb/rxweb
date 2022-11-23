﻿import { RegexValidator } from '../util/regex-validator'
const OBJECT: string = "object";
const BOOLEAN: string = "boolean";
export class FormDataProvider{

    convertToFormData(jObject: {[key:string]:any}):FormData {
        return this.convertFormData(jObject);
    }

    convertFormData(jObject: { [key: string]: any }, currentFormData?: FormData, parentKey?: string):FormData {
        let formData = currentFormData || new FormData();
        let propName:string = '';
        for (var columnName in jObject) {
            propName = !parentKey ? columnName : `${parentKey}[${columnName}]`;
            if (Array.isArray(jObject[columnName])) {
                jObject[columnName].forEach((row: { [key: string]: any; }, index: any) => {
                    propName = `${columnName}[${index}]`;
                    if (typeof row === OBJECT)
                        this.convertFormData(row, formData, propName);
                    else
                        this.nonObjectValueBind(row, formData, propName);
                })
            } else if (jObject[columnName] !== null && typeof jObject[columnName] === OBJECT && !(jObject[columnName] instanceof File || jObject[columnName] instanceof FileList)) {
                this.convertFormData(jObject[columnName],formData,propName)
            } else {
                this.nonObjectValueBind(jObject[columnName], formData, propName);
            }
        }
        return formData;
    }

    nonObjectValueBind(value:any,formData:FormData,propName:string) {
        if (typeof value === BOOLEAN) {
            formData.append(propName, +value ? '1' : '0');
        } else if (value instanceof FileList) {
            for (var i = 0; i < value.length; i++) {
                let itemValue: any = value.item(i);
                formData.append(`${propName}[${i}]`, itemValue);
            }
        } else {
            if (RegexValidator.isNotBlank(value))
                formData.append(propName, value);
        }
    }

}