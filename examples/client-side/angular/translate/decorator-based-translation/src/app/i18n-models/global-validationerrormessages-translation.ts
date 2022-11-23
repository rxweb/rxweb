export interface GlobalValidationErrorMessagesTranslation
{
    required : string;

    maxlength : string;

    languageCode : string;
    get: (key:string) => string;
}