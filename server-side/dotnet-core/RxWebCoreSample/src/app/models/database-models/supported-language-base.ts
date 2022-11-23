import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SupportedLanguageBase {

//#region languageId Prop
        @prop()
        languageId : any;
//#endregion languageId Prop


//#region languageName Prop
        @required()
        @maxLength({value:500})
        languageName : string;
//#endregion languageName Prop


//#region defaultFolder Prop
        @required()
        @maxLength({value:1000})
        defaultFolder : string;
//#endregion defaultFolder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region languageCode Prop
        @required()
        @maxLength({value:2})
        languageCode : string;
//#endregion languageCode Prop



}