import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LanguageContentKeyBase {

//#region languageContentKeyId Prop
        @prop()
        languageContentKeyId : number;
//#endregion languageContentKeyId Prop


//#region keyName Prop
        @required()
        @maxLength({value:50})
        keyName : string;
//#endregion keyName Prop


//#region isComponent Prop
        @required()
        isComponent : boolean;
//#endregion isComponent Prop





}