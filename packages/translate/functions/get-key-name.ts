import { translateConfigContainer } from "../core/translate-config-container"
export function getKeyName(name: string, languageCode?: string, filePath?: string) {
    if (translateConfigContainer.config && translateConfigContainer.config.cacheLanguageWiseObject && (!filePath || (filePath && name == "global")))
        return `${name}_${languageCode || translateConfigContainer.config.languageCode}`;
    return name;
}