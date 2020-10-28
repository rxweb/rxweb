import { RegexValidator } from '../util/regex-validator'
import { FormDataConfig } from '../models/interface/form-data-config';
const OBJECT: string = "object";
const BOOLEAN: string = "boolean";
export class FormDataProvider{

    convertToFormData(jObject: { [key: string]: any }, options?: FormDataConfig):FormData {
        return this.convertFormData(jObject,undefined,undefined,options);
    }

    convertFormData(jObject: { [key: string]: any }, currentFormData?: FormData, parentKey?: string, options?: FormDataConfig):FormData {
        let formData = currentFormData || new FormData();
        let propName:string = '';
        for (var columnName in jObject) {
            propName = !parentKey ? columnName : `${parentKey}[${columnName}]`;
            if (Array.isArray(jObject[columnName])) {
                jObject[columnName].forEach((row, index) => {
                    propName = `${columnName}[${index}]`;
                    if (typeof row === OBJECT)
                        this.convertFormData(row, formData, propName, options);
                    else
                        this.nonObjectValueBind(row, formData, propName,options);
                })
            } else if (jObject[columnName] !== null && !(jObject[columnName] instanceof Date) && typeof jObject[columnName] === OBJECT && !(jObject[columnName] instanceof File || jObject[columnName] instanceof FileList)) {
                this.convertFormData(jObject[columnName],formData,propName,options)
            } else {
                this.nonObjectValueBind(jObject[columnName], formData, propName, options);
            }
        }
        return formData;
    }

    nonObjectValueBind(value: any, formData: FormData, propName: string, options?: FormDataConfig) {
        if (typeof value === BOOLEAN) {
            let formValue: any = value ? true : false;
            formData.append(propName, formValue);
        } else if (value instanceof FileList) {
            for (var i = 0; i < value.length; i++) {
                formData.append(options && options.excludeImageIndex && value.length === 1 ? propName : `${propName}[${i}]`, value.item(i));
            }
        } else {
            if (RegexValidator.isNotBlank(value))
                formData.append(propName, value);
        }
    }

}