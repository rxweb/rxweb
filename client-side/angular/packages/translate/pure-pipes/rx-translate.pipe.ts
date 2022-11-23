import { Pipe, PipeTransform } from "@angular/core";
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";

@Pipe({ name: 'rxTranslate' })
export class RxTranslatePipe implements PipeTransform {
    transform(text: string, params: {[key:string]:any}): string {
        if (text && params && Object.keys(params).length > 0) {
            if (text.indexOf('{{{this') !== -1) {
                let stringExtractor = extract(['{{{', '}}}']);
                let keys = stringExtractor(text)
                keys.forEach(t => {
                    var func = new Function("x", "return " + t);
                    let calculatedText = func.call(params);
                    text = text.replace(`{{{${t}}}}`, calculatedText);
                })
            }
            if (text && text.indexOf("{{") != -1) {
                let stringExtractor = extract(['{{', '}}']);
                let keys = stringExtractor(text);
                keys.forEach(key => {
                    let value = getValue(key, params);
                    text = text.replace(`{{${key}}}`, value);
                })
            }
        }
        return text;
    }
}