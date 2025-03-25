import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentLanguageContentBase {

//#region componentLanguageContentId Prop
        @prop()
        componentLanguageContentId : number;
//#endregion componentLanguageContentId Prop


//#region componentKeyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentKeyId : number;
//#endregion componentKeyId Prop


//#region languageContentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        languageContentId : number;
//#endregion languageContentId Prop


//#region en Prop
        @prop()
        en : string;
//#endregion en Prop


//#region fr Prop
        @prop()
        fr : string;
//#endregion fr Prop





}