import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LanguageContentBase {

//#region languageContentId Prop
        @prop()
        languageContentId : number;
//#endregion languageContentId Prop


//#region languageContentKeyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        languageContentKeyId : number;
//#endregion languageContentKeyId Prop


//#region contentType Prop
        @required()
        @maxLength({value:3})
        contentType : string;
//#endregion contentType Prop


//#region en Prop
        @required()
        en : string;
//#endregion en Prop


//#region fr Prop
        @prop()
        fr : string;
//#endregion fr Prop





}