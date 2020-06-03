import { REGEX_RULES } from "../const/regex-rules";
import { APP_CONST } from "../const/app-const";

export function pascalCase(text: string) {
    text = `${text.charAt(0).toUpperCase()}${text.slice(1, text.length)}`.replace(REGEX_RULES.specialCharacters, APP_CONST.blank);
    let split = text.split('-');
    if (split.length > 1) {
        text = '';
        split.forEach(t => { text += pascalCase(t); })
    }
    return text;
}
