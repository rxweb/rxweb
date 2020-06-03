import { REGEX_RULES } from "../const/regex-rules"
import { APP_CONST } from "../const/app-const"
export class StringReplacer{
    static newLine(text: string): string {
        return text.replace(REGEX_RULES.enter, APP_CONST.blank);
    }

    static space(text: string): string {
        return text.replace(REGEX_RULES.space, APP_CONST.blank);
    }

    static not(text: string): string {
        return text.replace(REGEX_RULES.space, '!');
    }
}
