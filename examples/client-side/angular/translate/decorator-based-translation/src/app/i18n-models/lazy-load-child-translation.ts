export interface LazyLoadChildTranslation
{
    text : string;

    languageCode : string;
    get: (key:string) => string;
}