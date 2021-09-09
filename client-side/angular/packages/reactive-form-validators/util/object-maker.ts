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
                t = ApplicationUtil.getDateString(t);
            messageText = messageText.replace(`{{${index}}}`, t);
        });
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
}
