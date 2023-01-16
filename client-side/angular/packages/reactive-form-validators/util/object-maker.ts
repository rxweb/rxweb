import { ApplicationUtil } from "./app-util";
import { ReactiveFormConfig } from "./reactive-form-config";

export class ObjectMaker{
    static language: string = "";
    static toJson(key: string, config: any, values: any) {
        ObjectMaker.setMessage();
        let message = config ? config.message : null;
        let messageKey = undefined;
        if(!message && config && config.messageKey)
            messageKey = config.messageKey;
        let messageText = (message) ? message : (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[messageKey || key])? ReactiveFormConfig.json.validationMessage[messageKey || key] : '';
        values.forEach((t, index) => {
            if (t instanceof Date) 
                t = this.getDateString(t);
            messageText = messageText.replace(`{{${index}}}`, t);
        });
        if(config && config.messageNexus)
            Object.keys(config.messageNexus).forEach(propName=>{
                messageText = messageText.replace(`{{${propName}}}`, config.messageNexus[propName]);
            })
        let jObject = {};
        jObject[key] = {
            message: messageText, refValues: values
        };
        if (config && config.isAddMessageKey)
            jObject["messageKey"] = messageKey;
        return jObject;
    }
    static null() {
        return null;
    }

    static getPasswordMessage() {
        let messageKey = "password";
        return (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[messageKey]) ? ReactiveFormConfig.json.validationMessage[messageKey] : ''
    }

    static setMessage() {
        if (ReactiveFormConfig.i18n && ReactiveFormConfig.i18n.validationMessage && ObjectMaker.language !== ReactiveFormConfig.i18n.language) {
            if (!ReactiveFormConfig.json)
                ReactiveFormConfig.json = {};
            ReactiveFormConfig.json.validationMessage = ReactiveFormConfig.i18n.validationMessage();
            ObjectMaker.language = ReactiveFormConfig.i18n.language;
        }
    }

    static getDateString(value: Date) {
        let seperator = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.seperator ? ReactiveFormConfig.json.baseConfig.seperator : "/";
        let dateFormat = ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.baseConfig && ReactiveFormConfig.json.baseConfig.dateFormat ? ReactiveFormConfig.json.baseConfig.dateFormat : "mdy";
        if (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.internationalization && ReactiveFormConfig.json.internationalization.dateFormat && ReactiveFormConfig.json.internationalization.seperator) {
            seperator = ReactiveFormConfig.json.internationalization.seperator;
            dateFormat = ReactiveFormConfig.json.internationalization.dateFormat;
        }
        let result: string = '';
        let year = value.getFullYear().toString();
        let month = String(value.getMonth() + 1);
        let day = String(value.getDay());
        switch (dateFormat) {
            case 'ymd':
                result = "".concat(year, seperator, month, seperator, day)
                break;
            case 'dmy':
                result = "".concat(day, seperator, month, seperator, year)
                break;
            case 'mdy':
                result = "".concat(month, seperator, day, seperator, year)
                break;
        }
        return result;
    }
}
