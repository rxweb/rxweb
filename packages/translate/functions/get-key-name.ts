import { translateConfigContainer } from "../core/translate-config-container"
export function getKeyName(name: string,languageCode?:string) {
    if (translateConfigContainer.config && translateConfigContainer.config.cacheLanguageWiseObject)
        return `${name}_${languageCode || translateConfigContainer.config.languageCode}`;
    return name;
}