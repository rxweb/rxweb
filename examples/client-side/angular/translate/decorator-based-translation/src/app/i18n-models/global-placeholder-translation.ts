export interface GlobalPlaceholderTranslation
{
    freeText : string;

    languageCode : string;
    get: (key:string) => string;
}