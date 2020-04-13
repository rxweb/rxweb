import { translateConfigContainer } from '../core/translate-config-container'
import { extract } from "../functions/extract";
import { getValue } from "../functions/get-value";
import { BaseResolver } from "../resolver/base-resolver";

export class RxTranslation {
    get language() {
        return translateConfigContainer.config.languageCode;
    }

    change(languageCode: string) {
        var baseResolver = new BaseResolver(translateConfigContainer.config);
        baseResolver.languageChanged(languageCode);
    }


    translate(text: string, data: { [key: string]: any }) {
        let extractor = extract(['{', '}']);
        let keys = extractor(text);
        keys.forEach(key => {
            text = text.replace(`{${key}}`, getValue(key, data));
        })
        return text;
    }
}