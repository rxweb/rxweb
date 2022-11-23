import { GlobalNestedTranslation } from './global-nested-translation'
import { GlobalValidationErrorMessagesTranslation } from './global-validationerrormessages-translation'
import { GlobalPlaceholderTranslation } from './global-placeholder-translation'
export interface GlobalTranslation
{
    plainText : string;

    scopedText : string;

    conditionalText : string;

    selectedRecord : string;

    keyOne : string;

    nested : GlobalNestedTranslation;
    get(key) : string;

    reuseText : string;


    validationErrorMessages : GlobalValidationErrorMessagesTranslation;
    placeholder : GlobalPlaceholderTranslation;
    languageCode : string;
}
