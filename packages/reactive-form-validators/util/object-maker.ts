import { ReactiveFormConfig } from "./reactive-form-config";

export class ObjectMaker{
    static toJson(key: string, config:any, values: any) {
        let message = config ? config.message : null;
        let messageText = (message) ? message : (ReactiveFormConfig && ReactiveFormConfig.json && ReactiveFormConfig.json.validationMessage && ReactiveFormConfig.json.validationMessage[key])? ReactiveFormConfig.json.validationMessage[key] : '';
        values.forEach((t ,index)=> {
            messageText = messageText.replace(`{{${index}}}`, t);
        });
        let jObject = {};
        jObject[key] = {
            message: messageText, refValues: values
        };
        return jObject;
    }
    static null() {
        return null;
    }
}
