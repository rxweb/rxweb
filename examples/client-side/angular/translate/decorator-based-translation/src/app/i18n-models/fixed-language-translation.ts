export interface FixedLanguageTranslation
{
    text : string;

    languageCode : string;
    get: (key:string) => string;
}