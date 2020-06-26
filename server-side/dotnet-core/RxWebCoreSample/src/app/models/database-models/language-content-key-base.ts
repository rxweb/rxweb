import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LanguageContentKeyBase {

//#region languageContentKeyId Prop
        @prop()
        languageContentKeyId : number;
//#endregion languageContentKeyId Prop


//#region keyName Prop
        @maxLength({value:50})
        keyName : string;
//#endregion keyName Prop


//#region isComponent Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        isComponent : number;
//#endregion isComponent Prop



}