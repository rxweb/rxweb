export interface GlobalNestedTranslation
{
    keyOne : string;

    languageCode : string;
    get: (key:string) => string;
}