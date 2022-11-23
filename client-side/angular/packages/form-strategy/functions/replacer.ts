import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";

export function replacer(extractKeys: any, text: string, data: { [key: string]: any }): string {
    if (text && text.indexOf("{{") != -1) {
        let extractor = extract(extractKeys);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{{${key}}}`, getValue(key, data));
        })
    }
    return text;
}